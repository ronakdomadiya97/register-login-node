import mongoose from "mongoose";



export class DButil{
    public static connectToDB(dburl :string,dbname:string):Promise<string>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(dburl,{
                dbName : dbname
            },(error)=>{
                if(error){
                    reject("failed")
                }
                else{
                    resolve('Success')
                }
            })
        })
    }
}