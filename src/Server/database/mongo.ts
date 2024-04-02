import { MongoClient as Mongo, Db } from 'mongodb';

export const MongoClient = {
    client: undefined as unknown as Mongo,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        // windows
        const url = process.env.MONGODB_URL || "mongodb://localhost:27017";
        // ubuntu mongo atlas
        // const url = `mongodb+srv://dinizfelipe85:T4Z9lrNUtjKzkh2Z@cluster0.nv3pjbh.mongodb.net/clients?retryWrites=true&w=majority&appName=Cluster0`
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;

        // const client = new Mongo(url, { auth: {username, password} }); 
        const client = new Mongo(url); 
        // database client 
        const db = client.db("clients");

        this.client = client;
        this.db = db;

        console.log("connected to mongo_db!")
    }
};