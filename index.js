import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const PORT = process.env.port || 4000;
// console.log(process.env.user);
// console.log(process.env.NODE_ENV);

app.set("port", PORT);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
