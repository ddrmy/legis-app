import { Controller, Get, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { MongoClient, MongoClientOptions } from 'mongodb';

@Controller()
export class PythonController {
  @Get('/run-python-script')
  async executePythonScript(@Res() response: Response) {
    const url = 'http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm';
    const mongoURI =
      'mongodb+srv://dbNatJuri:dbNatJuriPassword@ddrmy.bg5wlap.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'nat-juri'; // Nome do banco de dados
    const collectionName = 'legis-data'; // Nome da coleção

    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    };

    try {
      const res = await axios.get(url, { headers });

      if (res.status !== 200) {
        console.error(
          'Falha ao recuperar a página. Código de status:',
          res.status,
        );
        return response.status(500).send('Falha ao recuperar a página.');
      }

      // Conteúdo da página
      const pageContent = res.data;

      // Salva os dados no MongoDB
      const client = new MongoClient(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as MongoClientOptions);

      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const documento = {
          titulo: 'Teste de request', // Título personalizado
          descricao: pageContent, // Conteúdo HTML da página
          ano: 2023,
        };

        try {
          const result = await collection.insertOne(documento);
          if (result.insertedId) {
            console.log('Documento inserido no MongoDB com sucesso');
            return response
              .status(200)
              .send('Script Python executado e dados salvos com sucesso');
          } else {
            console.error('Erro ao inserir no MongoDB:', result);
            return response.status(500).send('Erro ao inserir no MongoDB');
          }
        } catch (err) {
          console.error('Erro ao inserir no MongoDB:', err);
          return response.status(500).send('Erro ao inserir no MongoDB');
        }
      } catch (err) {
        console.error('Erro na conexão com o MongoDB:', err);
        return response.status(500).send('Erro na conexão com o MongoDB');
      } finally {
        client.close();
      }
    } catch (error) {
      console.error('Erro na solicitação HTTP:', error);
      return response.status(500).send('Erro na solicitação HTTP');
    }
  }
}
