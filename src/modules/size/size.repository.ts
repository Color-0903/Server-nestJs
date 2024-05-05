import dataSource from "src/database/data-source";
import { Size } from "src/database/entities/size.entity";

export const SizeRepository = dataSource.getRepository(Size).extend({
})