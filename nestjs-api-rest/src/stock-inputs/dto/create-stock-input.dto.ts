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
    date: string;
}