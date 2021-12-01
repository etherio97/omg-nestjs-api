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
import { Category } from "./entity/category.entity";

const CATEGORY = "category";

@Controller("categories")
export class CategoriesController {
  constructor(private connection: Connection) {}

  @Get()
  index(
    @Query("limit") limit: number = 10,
    @Query("offset") offset: number = 0
  ) {
    return this.connection
      .getRepository(Category)
      .createQueryBuilder(CATEGORY)
      .addOrderBy("id", "DESC")
      .limit(limit)
      .offset(offset)
      .execute();
  }

  @Post()
  create(@Body(ValidationPipe) categoryDto: Category) {
    const category = Object.assign(new Category(), categoryDto);
    return this.connection.getRepository(Category).save(category);
  }

  @Get("/:id")
  get(@Param("id", ParseIntPipe) id: string) {
    return this.connection.getRepository(Category).findOneOrFail(id);
  }

  @Post("/:id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) categoryDto: Partial<Category>
  ) {
    return this.connection
      .getRepository(Category)
      .update(id, categoryDto)
      .then(({ affected }) => ({ affected }));
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.connection
      .getRepository(Category)
      .delete(id)
      .then(({ affected }) => ({ affected }));
  }
}
