import dataSource from "src/database/data-source";
import { Category } from "src/database/entities/category.entity";

export const CategoryRepository = dataSource.getRepository(Category).extend({
})