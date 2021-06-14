/**
 * Este ficheiro remove um arquivo existente numa determinada pasta
 */

import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    // Verifica se o filename já existe emm um determinado caminho (pasta)
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // Se existir ele apaga o filename
  await fs.promises.unlink(filename);
}
