import { Request, Response } from 'express';
import { spawn } from 'child_process';

export const runPythonTest = (req: Request, res: Response) => {
  const pythonProcess = spawn('python', ['src/api-python/test.py']);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Saída do script Python: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Erro do script Python: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.status(200).json({ message: 'Script Python executado com sucesso' });
    } else {
      res.status(500).json({ message: 'Erro na execução do script Python' });
    }
  });
};
