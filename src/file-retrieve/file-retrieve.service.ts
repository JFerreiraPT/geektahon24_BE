import { Injectable } from '@nestjs/common';
import { S3, STS } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class FileRetrieveService {
  private s3: S3;
  private sts: STS;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    });

    this.sts = new STS({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    });
  }

  async getFileContent(bucketName: string, objectKey: string): Promise<string> {
    const params = { Bucket: bucketName, Key: objectKey };
    console.log('retrieve file', bucketName, objectKey);
    try {
      const data = await this.s3.getObject(params).promise();

      if (data.Body) {
        const fileContent = data.Body.toString('utf-8');
        return fileContent;
      } else {
        throw new Error('File is empty or unable to retrieve content.');
      }
    } catch (err) {
      console.error('Error retrieving file content:', err.message || err);
      throw err;
    }
  }
}
