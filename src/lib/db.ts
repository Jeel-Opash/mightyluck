
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Database connection");
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || "";
    const db = await mongoose.connect(uri);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
    console.log(db.connections[0].readyState);
  } catch (error) {
    console.log("Database Connection Failed", error);
    process.exit(1);
  }
}
;