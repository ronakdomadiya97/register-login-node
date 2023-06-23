import mongoose from "mongoose";
import { Iclient } from "../models/Iclient";



const clientSchema= new mongoose.Schema<Iclient>({
    id:{type : String , required : true},
    name:{type : String , required : true},
    email:{type : String , required : true},
    password:{type : String , required : true},
},{timestamps : true})


const ClientTable = mongoose.model<Iclient>('client',clientSchema)


export default ClientTable