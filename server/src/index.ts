import "dotenv/config"
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from "mongoose"
import { createTransport, createTestAccount, getTestMessageUrl } from 'nodemailer'
import { createSubscription } from './createSubscription'

const app: Express = express()
app.use([
  cors({ origin: "*" }),
  morgan("dev"),
  express.json()
])

app.get('/', (_, res: Response) => {
  res.send("Hello World")
})

app.post("/subscribe", async (req: Request, res: Response) => {
  const name = req.body.name
  const email = req.body.email
  
  let testAccount = await createTestAccount()
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
  let info = await transporter.sendMail({
    from: "creative@example.com", // sender address
    to: email, // list of receivers
    subject: "Subscribe", // Subject line,
    text: "Thanks for subscribing!"
  })
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", getTestMessageUrl(info));
  await createSubscription(name, email).finally(() => { mongoose.disconnect() })
  res.send({
    statusText: "ok",
    email: getTestMessageUrl(info)
  })
})

app.listen(8000, () => {
  console.log("Server listening to 8000")
})
