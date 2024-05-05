import dataSource from "src/database/data-source";
import { Product } from "src/database/entities/products.entity";

export const ProductRepository = dataSource.getRepository(Product).extend({
})