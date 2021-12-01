import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { Connection } from "typeorm";
import { Product } from "./entity/product.entity";

const PRODUCT = "product";

@Controller("products")
export class ProductsController {
  constructor(private connection: Connection) {}

  @Get()
  index(
    @Query("limit") limit: number = 10,
    @Query("offset") offset: number = 0
  ) {
    const stmt = `SELECT products.*,categories.name as category_name,categories.name_mm as category_name_mm 
    FROM products 
    INNER JOIN categories 
    ON products.category_id = categories.id
    ORDER BY products.id ASC 
    LIMIT ${parseInt(limit.toString())}
    OFFSET ${parseInt(offset.toString())}`;

    return this.connection.query(stmt);
  }

  @Post()
  async create(@Body(ValidationPipe) productDto: Product) {
    const product = Object.assign(new Product(), productDto);

    return this.connection.getRepository(Product).save(product);
  }

  @Get("/:id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.connection.getRepository(Product).findOneOrFail(id);
  }

  @Post("/:id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) productDto: Partial<Product>
  ) {
    return this.connection
      .getRepository(Product)
      .update(id, productDto)
      .then(({ affected }) => ({ affected }));
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.connection
      .getRepository(Product)
      .delete(id)
      .then(({ affected }) => ({ affected }));
  }
}
