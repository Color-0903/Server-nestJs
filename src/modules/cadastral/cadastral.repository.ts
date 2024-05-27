import dataSource from 'src/database/data-source';
import { Cadastral } from 'src/database/entities/cadastral.entity';

export const CadastralRepository = dataSource.getRepository(Cadastral).extend({});
