import { Controller, Get } from '@nestjs/common';
import { MongoClient, MongoClientOptions } from 'mongodb';

@Controller()
export class PythonController {
  @Get('/run-python-script')
  async executePythonScript() {
    // Salvar dados no MongoDB
    const mongoURI =
      'mongodb+srv://dbNatJuri:dbNatJuriPassword@ddrmy.bg5wlap.mongodb.net/?retryWrites=true&w=majority';

    try {
      const client = new MongoClient(mongoURI, {
        useNewUrlParser: true,
      } as MongoClientOptions);
      await client.connect();
      const db = client.db('nat-juri');
      const collection = db.collection('legis-data');
      const documento_exemplo = {
        titulo: 'Teste de inserção com script do python rodando',
        descricao: 'Script funfou lek.',
        ano: 2023,
      };
      const result = await collection.insertOne(documento_exemplo);
      client.close();
      if (result.insertedId) {
        console.log('Documento inserido no MongoDB com sucesso');
        return {
          message:
            'Script Python executado com sucesso e dados salvos com sucesso',
        };
      } else {
        console.error('Erro ao inserir no MongoDB:', result);
        return { message: 'Erro ao inserir no MongoDB' };
      }
    } catch (err) {
      console.error('Erro na conexão com o MongoDB:', err);
      return { message: 'Erro na conexão com o MongoDB' };
    }
  }
}
