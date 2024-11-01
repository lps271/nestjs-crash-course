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

    /*
    Abaixo nós garantimos a atomicidade das operacões (uma das propriedades ACID)
    O objetivo é garantir que, apenas se as duas operacões ocorrerem com sucesso a alteracão no banco de dados será feita
    Caso contrario, nenhuma é feita e o banco volta a seu estado inicial (antes da transacão)
    */
    const result = await this.prismaService.$transaction([
      this.prismaService.stockInput.create({
        data: {
          productId: createStockInputDto.product_id,
          quantity: createStockInputDto.quantity,
          date: new Date(createStockInputDto.date)
        },
      }),
      this.prismaService.product.update({
        where: { id: createStockInputDto.product_id },
        data: {
          quantity: {
            increment: createStockInputDto.quantity,
          }
        }
      })
    ])

    return result[0];
  }

  findAll() {
    return this.prismaService.stockInput.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.stockInput.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if(error.code === 'P2025') {
        throw new NotFoundError(`Stock Input whit ID ${id} not found`);
      }
      throw error;
    };
  }

}
