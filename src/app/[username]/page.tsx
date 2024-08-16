'use server';
import DonationForm from "@/components/DonationForm";
import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import { faCoffee, faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

type Props = {
    "params": {
        username: string;
    },
}

export default async function SingleProfilePage({params}:Props) {
    const username = params.username;
    await mongoose.connect(process.env.MONGODB_URI as string);
    const profileInfoDoc:ProfileInfo|null = await ProfileInfoModel.findOne({username});

    if (!profileInfoDoc) {
        return (
            <div>404 - profile not found</div>
        )
    }
    return(
        <div>
            <div className="w-full h-48">
                <Image
                    src={profileInfoDoc.coverUrl}
                    alt={'cover image'}
                    width={2048}
                    height={2048}
                    className="object-cover object-center h-48"
                />
            </div>
            <div className="max-w-2xl mx-auto px-2 relative -mt-20">
                <div className="flex items-end gap-4">
                    <div className="size-48 overflow-hidden rounded-full border-4 border-white">
                        <Image
                            src={profileInfoDoc.avatarUrl}
                            alt={'cover image'}
                            width={256}
                            height={256}
                            className="size-48 object-cover object-center rounded-full"
                        />
                    </div>
                    <div className="mb-11 -ml-1">
                        <h1 className="text-4xl font-semibold">
                            {profileInfoDoc.displayName}
                        </h1>
                        <h2 className="flex gap-1 items-center">
                            <FontAwesomeIcon icon={faCoffee} />
                            <span>/</span>
                            <span>{profileInfoDoc.username}</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold">About           {profileInfoDoc.displayName}:</h3>
                        {profileInfoDoc.bio}
                        <hr className="my-4" />
                        <h3 className="font-semibold">Recent supporters</h3>
                        <p>no recent donations</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <DonationForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
