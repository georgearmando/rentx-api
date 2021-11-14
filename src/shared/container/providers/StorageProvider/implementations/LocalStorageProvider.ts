import upload from '@config/upload';
import fs from 'fs';
import { resolve } from 'path';
import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  // Este método pega o file que está em tempFolder e o guarda em um das pastas
  // dentro do tempFolder
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  // Este método remove um arquivo existente numa determinada pasta
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      // Verifica se o filename já existe em um determinado caminho (pasta)
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    // Se existir ele apaga o filename
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider }
