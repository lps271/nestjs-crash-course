import { Injectable } from '@nestjs/common';
import { CreateStockInputDto } from './dto/create-stock-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/errors';

@Injectable()
export class StockInputsService {

  constructor(private prismaService: PrismaService){}

  async create(createStockInputDto: CreateStockInputDto) {
    const product = await this.prismaService.product.findUnique({
      where: {id: createStockInputDto.product_id}
    })
    console.log(product)

    if(!product) {
      throw new NotFoundError('Product not found');
    }

    return await this.prismaService.stockInput.create({
      data: {
        productId: createStockInputDto.product_id,
        quantity: createStockInputDto.quantity,
        date: new Date(createStockInputDto.date)
      }
    })
  }

  findAll() {
    return `This action returns all stockInputs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockInput`;
  }

}
