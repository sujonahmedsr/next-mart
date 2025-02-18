/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Logo from "@/app/assets/Logo";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createShop } from "@/services/Shop";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { shopValidation } from "./ShopValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateShopForm = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const form = useForm({
        resolver: zodResolver(shopValidation)
    });
    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const servicesOffered = data?.servicesOffered
            .split(",")
            .map((service: string) => service.trim())
            .filter((service: string) => service !== "");

        const modifiedData = {
            ...data,
            servicesOffered: servicesOffered,
            establishedYear: Number(data?.establishedYear),
        };

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(modifiedData));
            formData.append("logo", imageFiles[0] as File);

            const res = await createShop(formData);

            if (res.success) {
                toast.success(res.message);
            }
        } catch (err: any) {
            console.error(err);
            toast.success("Something went wrong Please Try Again...");
        }
    }

    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
            <div className="flex items-center space-x-4 mb-5">
                <Logo />
                <div>
                    <h1 className="text-xl font-semibold">Create Your Shop</h1>
                    <p className="font-extralight text-sm text-gray-600">
                        Join us today and start your journey!
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="shopName"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>Shop Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Shop Name" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="businessLicenseNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business License Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Business License Number" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Address" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="01*********" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="http://***.com" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="establishedYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Established Year</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Like - 1992" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taxIdentificationNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tax Identification Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Tax Identification Number" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="socialMediaLinks.facebook"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facebook</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Facebook" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="socialMediaLinks.twitter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Twitter</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Twitter" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="socialMediaLinks.instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Instagram" value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
                        <div className="col-span-4 md:col-span-3">
                            <FormField
                                control={form.control}
                                name="servicesOffered"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Services Offered</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Services Offered"
                                                className="h-36"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        {imagePreview.length > 0 ? (
                            <ImagePreviewer
                                setImageFiles={setImageFiles}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                            />
                        ) : (
                            <div>
                                <NMImageUploader
                                    setImageFiles={setImageFiles}
                                    setImagePreview={setImagePreview}
                                />
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="mt-5 w-full">
                        {isSubmitting ? "Creating...." : "Create"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateShopForm;