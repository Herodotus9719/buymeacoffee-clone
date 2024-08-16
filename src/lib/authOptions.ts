import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./db";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
    ],
    adapter: MongoDBAdapter(client),
} as AuthOptions;
