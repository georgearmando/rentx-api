import { S3 } from 'aws-sdk';
import mime from 'mime';
import { resolve } from 'path';
import fs from 'fs';
import upload from '@config/upload';
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    // Retorna o caminho do file
    const originalName = resolve(upload.tmpFolder, file);

    // Retorna o conteúdo do file
    const fileContent = await fs.promises.readFile(originalName);

    // Retorna o tipo do file
    const ContentType = mime.getType(originalName);

    // Adiciona o objecto/dados ao bucket
    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }).promise();

    // Remove o file do tempFolder
    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
    }).promise();
  }
}

export { S3StorageProvider }
