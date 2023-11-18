/* eslint-disable prettier/prettier */
// src/controller/python.codigo.ts
import { Controller, Get, Res } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Response } from 'express';
import * as iconv from 'iconv-lite';
import { MongoClient, MongoClientOptions } from 'mongodb';

@Controller()
export class CodigoPenal {
  @Get('/run-codigo-penal')
  async executeCodigoPenal(@Res() response: Response) {
    const url = 'http://www.planalto.gov.br/CCIVIL_03/Decreto-Lei/Del2848.htm'; // Codigo Penal
    const mongoURI = 'mongodb+srv://dbNatJuri:dbNatJuriPassword@ddrmy.bg5wlap.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'nat-juri'; // Nome do banco de dados
    const collectionName = 'legis-data'; // Nome da coleção

    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    };

    try {
      const res = await axios.get(url, { headers, responseType: 'arraybuffer' });

      if (res.status !== 200) {
        console.error(
          'Falha ao recuperar a página. Código de status:',
          res.status,
        );
        return response.status(500).send('Falha ao recuperar a página.');
      }

      // Converta o conteúdo para UTF-8 usando iconv-lite
      const pageContentBuffer = Buffer.from(res.data, 'binary');
      const pageContent = iconv.decode(pageContentBuffer, 'ISO-8859-1');

      // Use cheerio para manipulação do DOM
      const $ = cheerio.load(pageContent);

      // Aplicar as tratativas de limpeza aqui
      $('strike').remove();
      $('[style*="text-decoration:line-through"]').remove();
      $('span[style*="text-decoration:line-through"]').remove();
      $('li:empty').remove();
      $('del').remove();
      $('a').attr('href', '#');
      $('table').remove();

      // Obtenha o conteúdo tratado
      const cleanedContent = $.html();

      // Salva os dados no MongoDB
      const client = new MongoClient(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as MongoClientOptions);

      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        const documento = {
          titulo: 'codigo-penal', // Título personalizado
          descricao: cleanedContent, // Conteúdo HTML da página
          ano: formattedDate,
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