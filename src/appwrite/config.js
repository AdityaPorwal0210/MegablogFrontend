import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../../conf/conf";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);  // ✅ Fixed: was appwriteProjectID
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,      // ✅ Fixed: was appwriteDatabaseID
                conf.appwriteCollectionId,    // ✅ Fixed: was appwriteCollectionID
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,      // ✅ Fixed: was appwriteDatabaseID
                conf.appwriteCollectionId,    // ✅ Fixed: was appwriteCollectionID
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,      // ✅ Fixed: was appwriteDatabaseID
                conf.appwriteCollectionId,    // ✅ Fixed: was appwriteCollectionID
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,      // ✅ Fixed: was appwriteDatabaseID
                conf.appwriteCollectionId,    // ✅ Fixed: was appwriteCollectionID
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,      // ✅ Fixed: was appwriteDatabaseID
                conf.appwriteCollectionId,    // ✅ Fixed: was appwriteCollectionID
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // File upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,        // ✅ Fixed: was appwriteBucketID
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,        // ✅ Fixed: was appwriteBucketID
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,            // ✅ Fixed: was appwriteBucketID
            fileId
        );
    }
}

const service = new Service();
export default service;
