import { MongoClient } from "mongodb";

const DATABASE_URI = process.env.DATABASE_URI

async function getMongoConnection(): Promise<MongoClient> {
    const client = new MongoClient(DATABASE_URI!);
    const connection = await client.connect();
    return connection
}

export default getMongoConnection