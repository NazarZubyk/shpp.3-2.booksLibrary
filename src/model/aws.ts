import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
    S3ClientConfig
  } from '@aws-sdk/client-s3';
  import { NodeJsClient } from '@smithy/types';
  
  export class ImagesService {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    
    
    constructor() {

      const region = process.env.AWS_S3_REGION || "region";
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
      this.bucketName = process.env.BUCKET_NAME as string;
      
      if (!accessKeyId || !secretAccessKey) {
        throw new Error('AWS credentials are not set in the environment variables.');
      }
  
      const s3ClientConfig: S3ClientConfig = {
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      };
  
      this.s3Client = new S3Client(s3ClientConfig) as NodeJsClient<S3Client>;
    }
    
    async create (file :Express.Multer.File, name : string){
        if(!file){
           throw new  Error("file not exist");
        }
        try{
            await this.s3Client.send(
                new PutObjectCommand({
                  Bucket: this.bucketName,
                  Key: name,
                  Body: file.buffer,
                }),
              );
        }
        catch(e){
            throw new Error('cann\'t save image in aws, cann\'t send the image')
        }
    }
    
    async getImage (key: string): Promise<string|undefined>{
      
      
     try {
       const dataFromAws = await this.s3Client.send(
         new GetObjectCommand({
           Bucket: this.bucketName,
           Key: key,
         }),
       );
       
       
         const data = await dataFromAws.Body?.transformToString('base64');
       
         return data;
       
     } catch (error) {
      console.error('Error get object from S3:', error);
     }
  
    }

    async remove(key: string): Promise<boolean> {
      try {
        const ansAWS = await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
          }),
        );
    
        // Check the HTTP status code to confirm successful deletion
        if (ansAWS.$metadata.httpStatusCode === 204) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error deleting object from S3:', error);
        return false;
      }
    }
    
  }
  