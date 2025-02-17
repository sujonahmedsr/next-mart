import { useState } from "react";
import { Input } from "../../input";
import Image from "next/image";

const NMImageUploader = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        setImageFiles((prev) => [...prev, file])

        if(file){
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview((prev) => [...prev, reader.result as string])
            }

            reader.readAsDataURL(file)
        }
        event.target.value = "";
    }
    return (
        <div>
            <Input type="file" multiple onChange={handleImageChange} accept="image/*" id="image-upload" className="hidden" />
            <label
                htmlFor="image-upload"
                className="w-full h-36 mt-8 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
            >
                Upload Images
            </label>

            <div>
                {
                    imagePreview?.map((image, ind) => <Image key={ind} src={image} alt="image" width={500} height={500} />)
                }
            </div>
        </div>
    );
};

export default NMImageUploader;