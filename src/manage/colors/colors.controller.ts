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
import { Color } from "./entity/color.entity";

const COLOR = "color";

@Controller("colors")
export class ColorsController {
  constructor(private connection: Connection) {}

  @Get()
  index(
    @Query("limit") limit: number = 10,
    @Query("offset") offset: number = 0
  ) {
    return this.connection
      .getRepository(Color)
      .createQueryBuilder(COLOR)
      .addOrderBy("id", "DESC")
      .limit(limit)
      .offset(offset)
      .execute();
  }

  @Post()
  create(@Body(ValidationPipe) colorDto: Color) {
    const color = Object.assign(new Color(), colorDto);
    return this.connection.getRepository(Color).save(color);
  }

  @Get("/:id")
  get(@Param("id", ParseIntPipe) id: string) {
    return this.connection.getRepository(Color).findOneOrFail(id);
  }

  @Post("/:id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) colorDto: Partial<Color>
  ) {
    return this.connection
      .getRepository(Color)
      .update(id, colorDto)
      .then(({ affected }) => ({ affected }));
  }

  @Delete("/:id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.connection
      .getRepository(Color)
      .delete(id)
      .then(({ affected }) => ({ affected }));
  }
}
