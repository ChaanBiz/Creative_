import { Schema, model } from 'mongoose'

const subscibeSchema = new Schema({
  name: String,
  email: String
})

export const Subscribe = model("Subscribe", subscibeSchema)
