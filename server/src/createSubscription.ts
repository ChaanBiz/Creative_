import { Subscribe } from "./schema";
import mongoose from "mongoose";

export const createSubscription = async (name: string, email: string): Promise<void> => {
  const connection: any = await mongoose.connect(process.env.MONGODB_URI as string)
  await Subscribe.create({
    name,
    email
  })
}
