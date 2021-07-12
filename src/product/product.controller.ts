import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Query } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Public()
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        if (isNaN(id))
            throw new HttpException(
                `[${id} is not a valid codebar]`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        const product = await this.productService.findBycodeBar(id);
        if (!product) {
            throw new HttpException(`product [codebar=${id}] not found`, 201);
        }

        return product;
    }

    @Get('/reference/:id')
    async findById(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
