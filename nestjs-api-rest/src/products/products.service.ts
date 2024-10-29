import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from '../errors';



@Injectable()
export class ProductsService {

  constructor(private prismaservice: PrismaService){

  }

  create(createProductDto: CreateProductDto) {
    return this.prismaservice.product.create({
      data: {
        ...createProductDto, quantity: 0,
      },
    });
  }

  findAll() {
    return this.prismaservice.product.findMany();
  }

  

  async findOne(id: number) {
    try {
      return await this.prismaservice.product.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if(error.code === 'P2025') {
        throw new NotFoundError(`Product whit ID ${id} not found`);
      }
      throw error;
    }
    
  }


  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaservice.product.update({
      where: { id },
      data: updateProductDto
    });
  }

  remove(id: number) {
    return this.prismaservice.product.delete({
      where: { id },
    });
  }
}
