/* eslint-disable prettier/prettier */
//src/module/legis.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodigoCivil } from 'src/controller/codigos/codigo-civil';
import { CodigoDefesaConsumidor } from 'src/controller/codigos/codigo-defesa-consumidor';
import { CodigoPenal } from 'src/controller/codigos/codigo-penal';
import { CodigoProcessoCivil } from 'src/controller/codigos/codigo-processo-civil';
import { CodigoProcessoPenal } from 'src/controller/codigos/codigo-processo-penal';
import { ConsolidacaoLeisTrabalho } from 'src/controller/codigos/consolidacao-leis-trabalho';
import { EstatutoCriancaAdolescente } from 'src/controller/estatutos/estatuto-crianca-adolescente';
import { EstatutoIdoso } from 'src/controller/estatutos/estatuto-idoso';
import { EstatutoOAB } from 'src/controller/estatutos/estatuto-oab';
import { EstatutoPessoaDeficiencia } from 'src/controller/estatutos/estatuto-pessoa-deficiencia';
import { PythonCodigo } from 'src/controller/python.codigo';
import { PythonController } from 'src/controller/python.controller';
import { LegisService } from 'src/service/legis.service';
import { LegisController } from '../controller/legis.controller';
import { Legis, LegisSchema } from '../model/legis.model';
import { Constituicao } from 'src/controller/constituicao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Legis.name, schema: LegisSchema }]),
  ],
  controllers: [LegisController, PythonController, PythonCodigo, CodigoCivil, CodigoDefesaConsumidor, CodigoPenal, CodigoProcessoCivil, CodigoProcessoPenal, ConsolidacaoLeisTrabalho, EstatutoCriancaAdolescente, EstatutoIdoso, EstatutoOAB, EstatutoPessoaDeficiencia, Constituicao],
  providers: [LegisService],
})
export class LegisModule {}
