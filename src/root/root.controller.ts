import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Returns the server's "birthtime"
function getBirthTime() {
  try {
    const dirPath = path.join(__dirname);
    const filePath = path.join(__dirname, __filename);

    if (fs.existsSync(filePath)) {
      return fs.statSync(filePath).birthtime;
    }

    return fs.statSync(dirPath).birthtime;
  } catch {
    return null;
  }
}

export const index = (_: Request, res: Response) => res.sendStatus(200);

export const healthcheck = (req: Request, res: Response) =>
  res.send({
    ts: `${Date.now()}`,
    ip: req.ip,
    ips: req.ips,
    created_at: getBirthTime(),
  });
