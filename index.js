import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import http from "http";
import app from "./app.js";
import eventEmitter from "./utils/eventEmmiter.js";
import { sendMail } from "./utils/mailer.js";

const server = http.createServer(app);
const PORT = process.env.port || 4000;
// console.log(process.env.user);
// console.log(process.env.NODE_ENV);

// sendMail("onotaizee@gmail.com", "HAHAHA", "Body blah blah blah")

app.set("port", PORT);

// Database connects first before server goes up and running;
eventEmitter.on("connected_to_database", () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
