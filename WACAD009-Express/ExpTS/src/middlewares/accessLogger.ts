import { NextFunction, Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

export type LogFormat = 'simples' | 'completo';

export function accessLogger(format: LogFormat) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const logDirectory = process.env.LOG_DIR as string;
      const accessTime = new Date().toISOString();

      await fs.mkdir(logDirectory, { recursive: true });

      const simpleLog = `${accessTime} | ${req.method} | ${req.originalUrl}`;
      const completeLog = `${simpleLog} | HTTP/${req.httpVersion} | User-Agent: ${req.get('user-agent') ?? 'não informado'}`;
      const logLine = format === 'completo' ? completeLog : simpleLog;
      const logFile = path.join(logDirectory, 'access.log');

      await fs.appendFile(logFile, `${logLine}\n`, 'utf8');
    } catch (error) {
      console.error('Erro ao salvar log de acesso:', error);
    }

    next();
  };
}
