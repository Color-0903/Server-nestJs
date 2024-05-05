import dataSource from "src/database/data-source";
import { Color } from "src/database/entities/color.entity";

export const ColorRepository = dataSource.getRepository(Color).extend({
})