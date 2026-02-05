import { Client, Account, ID } from "appwrite";
import conf from "../../conf/conf";

export class AuthService{
client = new Client();
account;
constructor(){
    console.log(import.meta.env.VITE_APPWRITE_URL)
    this.client.setEndpoint(import.meta.env.VITE_APPWRITE_URL).setProject(conf.appWriteProjectID)
    this.account = new Account(this.client);
}

async createAccount({email,password,name}){
    try {
        console.log
        const userAccount = await this.account.create(ID.unique(),email,password,name)
        if(userAccount){
            //call login
            return this.login({email,password})
        }
        else{
            return userAccount;
        }
    } catch (error) {
        return error;
    }

}

async login({email,password}){
try {
    return await this.account.createEmailPasswordSession(email,password)
} catch (error) {
    return error;
}
}

async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
        return error
    }
}

async logout(){
    try {
       return await this.account.deleteSessions()
    } catch (error) {
        return error;
    }
}
}

const  authService = new AuthService();
export default authService
