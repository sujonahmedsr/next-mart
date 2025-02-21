import { z } from "zod";

export const shopValidation = z.object({
    shopName: z.string().min(1, "Shop name is required."),
    businessLicenseNumber: z.string().min(1, "Business license number is required."),
    address: z.string().min(1, "Address is required."),
    contactNumber: z.string().min(1, "Contact number is required."),
    website: z.string().url("Invalid URL format.").optional().or(z.literal("")),  // Allows an empty string or a valid URL
    image: z.string().url("Invalid image URL.").optional().or(z.literal("")),  // Allows an empty string or a valid URL
    servicesOffered: z.string(z.string()).min(1, "At least one service must be offered."),
    ratings: z
        .number()
        .min(0, "Ratings cannot be less than 0.")
        .max(5, "Ratings cannot exceed 5.")
        .default(0),
    establishedYear: z.string(),
    socialMediaLinks: z.record(z.string()).nullable().optional(),
    taxIdentificationNumber: z.string().min(1, "Tax identification number is required.")
});
