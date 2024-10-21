
import mongoose from "mongoose";
import express from "express";

import dotenv from "dotenv";
dotenv.config();
const app = express();

const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://trivedirishabh27:nt9HSf1TQk72nFsS@cluster0.emjtn.mongodb.net/Cluster0", {

        });
        console.log("`MongoDB connected: ${conn.connection.host}`");

    } catch (error) {
        console.log("`Error: ${error.message}`");
    }
};
connectDB();
// const port = process.env.PORT || 5001;

// app.listen(port, () => {
//     console.log("servet ")
// })


export default connectDB;
