import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserRole } from '../modules/user/user.interface';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: UserRole[]) => {
   return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
         const token = req.headers.authorization;

         if (!token) {
            throw new AppError(
               StatusCodes.UNAUTHORIZED,
               'You are not authorized!'
            );
         }

         const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
         ) as JwtPayload;

         const { role, userId, email, iat } = decoded;

         const user = await User.findOne({ email, role, isActive: true });

         if (!user) {
            throw new AppError(
               StatusCodes.NOT_FOUND,
               'This user is not found !'
            );
         }

         if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
               StatusCodes.UNAUTHORIZED,
               'You are not authorized!'
            );
         }

         req.user = decoded as JwtPayload & { role: string };
         next();
      }
   );
};

export default auth;
