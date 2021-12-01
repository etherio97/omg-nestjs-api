import { IsInt, IsOptional, IsString } from "class-validator";
import { Category } from "src/manage/categories/entity/category.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductStatus } from "./product.enum";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsInt()
  price: number;

  @Column({ default: ProductStatus.DRAFT })
  @IsString()
  @IsOptional()
  status: ProductStatus;

  @Column()
  @IsString()
  user_id: string;

  @Column()
  @IsString()
  @IsOptional()
  description: string;

  @Column()
  @IsString()
  @IsOptional()
  image_url: string;

  @Column()
  @IsInt()
  @IsOptional()
  @OneToOne((type) => Category)
  category_id: number;
}
