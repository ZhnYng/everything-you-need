'use server';

import { Storage } from '@google-cloud/storage';

export const uploadDocument = async (form: FormData) => {
  try {  
    const file = form.get('file') as File
    const storage = new Storage()

    const buffer = await file.arrayBuffer()
    const fileKey = 'uploads-' + Date.now().toString() + file.name.replace(' ', '-')
    await storage.bucket('every-document').file(fileKey).save(Buffer.from(buffer))
    
    console.log(fileKey)
  } catch (error) {
    console.error(error);
  }
}