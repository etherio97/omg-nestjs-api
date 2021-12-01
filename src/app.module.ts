import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { env } from "process";
import { CategoriesController } from "./manage/categories/categories.controller";
import { ColorsController } from "./manage/colors/colors.controller";
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
      entities: ["src/**/entities/*.entities.ts"],
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
