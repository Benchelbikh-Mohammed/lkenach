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
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AddProduct2StoreDto } from './dto/add-product-store.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Post(':id/product')
    addProduc(
        @Param('id') id: string,
        @Body() product: AddProduct2StoreDto & CreateProductDto,
    ) {
        return this.storeService.addProductToStore(id, product);
    }

    @Get()
    findAll() {
        return this.storeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.storeService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
        this.storeService.update(id, updateStoreDto);
        return this.storeService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.storeService.remove(+id);
    }
}
