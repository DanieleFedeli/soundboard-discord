import mongoose from "mongoose";
import accessEnv from "../utility/accessEnv";

export default function initConnection(): void {
  const uri = accessEnv<string>("MONGODB_URI");
  const user = accessEnv<string>("MONGODB_USER");
  const pass = accessEnv<string>("MONGODB_PASS");

  mongoose.connect(uri, {
    user,
    pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    family: 4,
    logger: console.log,
    loggerLevel: "info",
  });

  const connection = mongoose.connection;

  connection.on("error", console.error.bind(console, "Connection error:"));
  connection.once("open", console.log);
}
