import { DonationModel } from "@/models/Donation";
import mongoose from "mongoose";

export async function createDonation(formData:FormData):Promise<string> {
    // 1. Save to our db
    const {amount, name, message, crypto} = Object.fromEntries(formData);
    await mongoose.connect(process.env.MONGODB_URI as string);
    const donationDoc = await DonationModel.create({
        amount, name, message, crypto,
    });
    // 2. Create invoice and return url
    return '';
}
