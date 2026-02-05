import { Client,ID ,Databases,Storage,Query,TablesDB} from "appwrite";
import conf from "../../conf/conf";
 export class Service{
 client = new Client()
 databases;
 bucket;
 constructor(){
    this.client
        .setProject(conf.appWriteProjectID)
        .setEndpoint(conf.appWriteUrl)
        
        this.databases = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
 }

 async createPost({title, slug, content, featuredImage, status, userId}){
    try {
      return await this.databases.createRow(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,{
            title, content, featuredImage, status, userId
        }
      )
    } catch (error) {
        return error
    }
 }

 async deletePost(){
    try {
       await this.databases.deleteRow(conf.appWriteDatabaseID,conf.appWriteCollectionID,slug)
    } catch (error) {
      console.log(error)        
      return false
    }
 }

 async updatePost(){
    try {
        return await this.databases.updateRow(conf.appWriteDatabaseID,conf.appWriteCollectionID,slug,{
              title, content, featuredImage, status})

    } catch (error) {
        console.log(error)        
      return false
    }
 }

 async getPost(){
    try {
        return await this.databases.getRow(conf.appWriteDatabaseID,conf.appWriteCollectionID,slug)
    } catch (error) {
        console.log(error)        
      return false
    }
 }

 async getPosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listRows(conf.appWriteDatabaseID,conf.appWriteCollectionID,queries)
    } catch (error) {
        console.log(error)        
      return false
    }
 }

 async uploadFile(file)
 {
    try {
      return await this.bucket.createFile(conf.appWriteBucketID,ID.unique(),file)
    } catch (error) {
        console.log(error)        
      return false
    }
 }

async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }


  getFilePreview(fileID){
    return this.bucket.getFilePreview(conf.appWriteBucketID,fileID)
 }


 }
const service = new Service();
 export default service;