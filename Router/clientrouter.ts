import { Router ,Request , Response } from "express";
import { body } from "express-validator";
import * as clientController from "../Controller/clientController"

const clientrouter : Router= Router()


clientrouter.post('/register',[
    body('id').not().isEmpty().withMessage('id is required'),
    body('name').not().isEmpty().withMessage('name is required'),
    body('email').not().isEmpty().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required'),
],async(request : Request , response:Response)=>{
    await clientController.clientuser(request,response)
})

clientrouter.post('/login',[
    body('email').not().isEmpty().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required'),
],async(request : Request , response:Response)=>{
    await clientController.loginclient(request,response)
})

export default clientrouter