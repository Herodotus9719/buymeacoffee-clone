'use client';
import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import { toast } from 'react-hot-toast';

type Props = {
    profileInfo:ProfileInfo|null;
};

export default function ProfileInfoForm({profileInfo}:Props) {

    const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
    const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);


    async function handleFormAction(formData: FormData) {
        await saveProfile(formData);
        toast.success('Profile saved!');
    }

    return (
        <form action={handleFormAction}>
            <div className="relative bg-gray-100 rounded-lg h-48 mb-4">
                <Image
                    src={coverUrl || ''}
                    alt={'cover image'}
                    width={1024}
                    height={1024}
                    className="w-full object-cover object-center rounded-lg h-48"
                />
                <div className="absolute -bottom-5 left-4 z-10 bg-gray-200 h-28 rounded-full">
                    <div className="rounded-full overflow-hidden">
                        <Image
                            src={avatarUrl || ''}
                            alt="avatar"
                            width={120}
                            height={120}
                            className="w-full object-cover rounded-full object-center h-28 border-2 border-white"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <UploadButton
                            onUploadComplete={setAvatarUrl}
                        />
                    </div>
                    <input type="hidden" name="avatarUrl" value={avatarUrl} />
                </div>
                <div className="absolute right-4 bottom-4">
                    <UploadButton onUploadComplete={setCoverUrl} />
                    <input type="hidden" name="coverUrl" value={coverUrl} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="">
                    <label htmlFor="usernameIn" className="input-label">username</label>
                    <input
                        defaultValue={profileInfo?.username} name="username"
                        id="usernameIn"
                        type="text"
                        placeholder="username"
                        className="" />
                </div>
                <div className="">
                    <label htmlFor="displayNameIn" className="input-label">display name</label>
                    <input
                        defaultValue={profileInfo?.displayName} name="displayName"
                        id="displayNameIn"
                        type="text"
                        placeholder="display name"
                        className="" />
                </div>
            </div>
            <div className="">
                <label htmlFor="bioInput" className="input-label">bio</label>
                <textarea
                    defaultValue={profileInfo?.bio}
                    name="bio"
                    id="bioInput"
                    placeholder="bio">
                </textarea>
            </div>
            <div className="">
                <button
                    className="mt-4 bg-yellow-300 px-4 py-2 rounded-full">
                    Save profile
                </button>
            </div>
        </form>
    )
}
