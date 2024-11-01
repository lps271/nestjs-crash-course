import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateStockInputDto {

    @IsPositive()
    @IsInt()
    @IsNotEmpty()
    product_id: number;

    @IsPositive()
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsDateString()
    @IsNotEmpty()
    @IsDateString()
    date: string;
}