import path from 'path';
import fs from 'fs/promises';

import AppError from './AppError';

export default class ErrorLogger {
  public async saveError(error: Error): Promise<void> {
    const [fileName, errorTime] = new Date().toISOString().split('T');

    let errorLog: string;
    if (error instanceof AppError) {
      errorLog = `[${errorTime}] APPERROR\nSTATUS CODE: ${error.statusCode}\nMESSAGE: ${error.message}\n\n`;
    } else {
      errorLog = `[${errorTime}] ERROR\nMESSAGE: ${error.message}\n\n`;
    }

    const filePath = path.resolve(__dirname, 'logs', `${fileName}.txt`);

    const file = await fs.open(filePath, 'a');

    await file.write(errorLog);

    await file.close();
  }
}
