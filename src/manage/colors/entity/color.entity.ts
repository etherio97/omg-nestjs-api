import { IsOptional, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "colors" })
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  @IsOptional()
  name_mm: string;

  @Column()
  @IsString()
  @IsOptional()
  code: string;
}
