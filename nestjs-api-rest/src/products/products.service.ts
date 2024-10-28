import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';



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

  

  findOne(id: number) {
    return this.prismaservice.product.findUnique({
      where: { id },
    });
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
