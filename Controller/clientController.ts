import { Request, Response } from "express";
import { APP_STATUS } from "../constants/constants";
import bcryptjs from "bcryptjs"
import Jwt  from "jsonwebtoken";
import {validationResult} from "express-validator"
import { Iclient } from "../models/Iclient";
import ClientTable from "../database/clientSchema";


export const clientuser = async(request : Request, response : Response)=>{
    const error= validationResult(request)
    if(!error.isEmpty()){
        return response.status(200).json({
            status : APP_STATUS.FAILED,
            data :null,
            error : error.array()
        })
    }
    try{
        let {id,name,email,password}= request.body

        let cheakclient = await ClientTable.findOne({email:email})
        if(cheakclient){
            return response.status(100).json({
                status: APP_STATUS.FAILED,
                data: null,
                error :"user already exits"
            })
        }
 
        const Salt = await bcryptjs.genSalt(10)
        const hashpassword =await bcryptjs.hash(password,Salt)


        let theclientobj : Iclient = {
            id:id,
            name:name,
            email:email,
            password: hashpassword
        }
        theclientobj= await new ClientTable(theclientobj).save()
        if(theclientobj){
            return response.status(200).json(theclientobj)
        }
    }
    catch(error : any){
        return response.status(500).json({
            status : APP_STATUS.FAILED,
            data : null,
            error : error.message
        })
    }
}

export const loginclient = async(request:Request,response : Response)=>{
    const error = validationResult(request)
    if(!error.isEmpty()){
        return response.status(200).json({
            status: APP_STATUS.FAILED,
            data :null,
            error : error.array()
        })
    }
    try{
        let {email,password} = request.body

        let theclientobj : Iclient | null | undefined = await ClientTable.findOne({email:email})
        if(!theclientobj){
            return response.status(200).json({
                status :APP_STATUS.FAILED,
                data : null,
                error : "invald email"
            })
        }
        
        let ismatch : boolean = await bcryptjs.compare(password,theclientobj.password)
        if(!ismatch){
            return response.status(200).json({
                status : APP_STATUS.FAILED,
                data : null,
                error : "invalid password"
            })
        }
        
        let secretKey: string| undefined = process.env.Jwt_secret_key
        let payload :any = {
            user :{
                id:theclientobj.id,
                email:theclientobj.email
            }
        }
        if(payload && secretKey){
            Jwt.sign(payload,secretKey,{
                expiresIn : 8989808
            },(error,encoded)=>{
                if(error) throw error
                if(encoded){
                    return response.status(200).json({
                        status :APP_STATUS.FAILED,
                        msg : "Login success...",
                        data : theclientobj,
                        token: encoded
                    })
                }
            })
        }
    }
    catch(error : any){
        return response.status(500).json({
            status : APP_STATUS.FAILED,
            data : null,
            error : error.message
        })
    }
}
