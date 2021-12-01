import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { env } from "process";
import { CategoriesController } from "./manage/categories/categories.controller";
import { Category } from "./manage/categories/entity/category.entity";
import { ColorsController } from "./manage/colors/colors.controller";
import { Color } from "./manage/colors/entity/color.entity";
import { Product } from "./manage/products/entity/product.entity";
import { ProductsController } from "./manage/products/products.controller";

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: env.DATABASE_URL,
      extra: {
        ssl: false,
      },
      logging: true,
      entities: [Product, Category, Color],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [ProductsController, CategoriesController, ColorsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
