import { Injectable } from '@nestjs/common';
import { S3, STS } from 'aws-sdk';
import { createWriteStream } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

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

  async listBuckets(): Promise<S3.Bucket[] | undefined> {
    try {
      const result = await this.s3.listBuckets().promise();
      return result.Buckets;
    } catch (err) {
      console.error('Error listing buckets:', err);
      throw err;
    }
  }

  async getCallerIdentity(): Promise<STS.GetCallerIdentityResponse> {
    try {
      return await this.sts.getCallerIdentity({}).promise();
    } catch (err) {
      console.error('Error fetching caller identity:', err);
      throw err;
    }
  }

  async downloadFile(
    bucketName: string,
    objectKey: string,
    destinationPath: string,
  ): Promise<void> {
    const params = { Bucket: bucketName, Key: objectKey };

    return new Promise((resolve, reject) => {
      const file = createWriteStream(destinationPath);

      this.s3
        .getObject(params)
        .createReadStream()
        .on('error', (err) => {
          console.error('Error downloading file:', err);
          reject(err);
        })
        .pipe(file)
        .on('close', () => {
          console.log(`File downloaded successfully to ${destinationPath}`);
          resolve();
        });
    });
  }
}
