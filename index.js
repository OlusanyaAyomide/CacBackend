import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import http from "http";
import https from "https"
import app from "./app.js";
import eventEmitter from "./utils/eventEmmiter.js";
import { sendMail } from "./utils/mailer.js";
import fs from "fs"


const options = {
  key: fs.readFileSync('key.pem','utf-8'),
  cert: fs.readFileSync('cert.pem','utf-8'),
  ca:fs.readFileSync("csr.pem",'utf-8')
}

const server = https.createServer(options,app);
const httpServer = http.createServer(app)
const PORT = process.env.port || 4000;
// console.log(process.env.user);
// console.log(process.env.NODE_ENV);

// sendMail("onotaizee@gmail.com", "HAHAHA", "Body blah blah blah")

app.set("port", PORT);

// Database connects first before server goes up and running;
eventEmitter.on("connected_to_database", () => {
  httpServer.listen(4000, '0.0.0.0',()=>{"Http server running"})
  server.listen(8443, () => {
    console.log(`https server running on port`);
  });
})
