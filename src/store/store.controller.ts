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

import { Public } from './../auth/decorators/public.decorator';
@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}
    @Public()
    @Post()
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Get()
    findAll() {
        return this.storeService.findAll();
    }

    @Post(':id/product')
    addProduc(
        @Param('id') id: string,
        @Body() product: AddProduct2StoreDto & CreateProductDto,
    ) {
        return this.storeService.addProductToStore(id, product);
    }

    @Get(':id/product/:codeBar')
    async findByReference(
        @Param('id') id: string,
        @Param('codeBar') code_bar: number,
    ) {
        const store = await this.storeService.findOne(id);

        const found = store.products.some((e) => e.code_bar == code_bar);

        if (!found)
            throw new HttpException(
                `product [codebar=${code_bar}] not found`,
                201,
            );

        return store.products.filter((p) => p.code_bar == code_bar)[0];
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log('he');
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
