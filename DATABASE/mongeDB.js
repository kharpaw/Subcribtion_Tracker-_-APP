import mongoose from 'mongoose'
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error('Please define the mongoDB_enviromment variable inside. env.<developnment/production>.local')
}

const connectToDATABASE = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log(`Connected  to database in ${NODE_ENV}mode`)
    } catch (error) {
        console.error("Error catching to database:", error)
        process.exit(1);
    }
}
export default connectToDATABASE;