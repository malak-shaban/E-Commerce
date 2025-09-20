import React from "react";
import Image from "next/image";
import { BrandDetailsType } from "@/types/brandDetails.type";


export default async function SingleBrand({ params }: { params: { id: string } }) {
    const { id } = params;
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    const { data }: { data: BrandDetailsType } = await res.json();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 font-serif">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <Image
                        src={data.image}
                        alt={data.name}
                        width={200}
                        height={200}
                        className="rounded-xl shadow-md object-contain"
                    />
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">{data.name}</h1>
                <p className="text-center text-gray-500 mb-6">Slug: {data.slug}</p>

                <div className="space-y-2 text-sm text-gray-700">
                    <p>
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(data.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <span className="font-semibold">Updated At:</span>{" "}
                        {new Date(data.updatedAt).toLocaleString()}
                    </p>
                    <p>
                        <span className="font-semibold">Version:</span> {data.__v}
                    </p>
                </div>
            </div>
        </div>
    );
}

