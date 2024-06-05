import { Client, Databases } from 'appwrite';
export const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_PROJECT_ID);
   
export { ID } from 'appwrite';
export const database = new Databases(client);

