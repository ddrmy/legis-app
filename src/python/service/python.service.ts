// src/python/service/python.service.ts
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class PythonService {
  async runPythonScript(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      exec('python api-python/test.py', (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}
