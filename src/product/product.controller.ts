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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Query } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {

    SERVER_URL: string = "http://15.237.15.44:3000/";
    constructor(private readonly productService: ProductService) { }

    @Public()
    @Post()
    @UseInterceptors(FileInterceptor('thumbnail',
        {
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    )
    )
    create(@Body() createProductDto: CreateProductDto, @UploadedFile() thumbnail) {
        return this.productService.create(createProductDto, `${thumbnail.filename}`);
    }

    @Public()
    @Get()
    findAll() {
        return this.productService.findAll();
    }
    @Public()
    @Post('image')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    )
    )
    uploadAvatar(@Param('id') id, @UploadedFile() file) {
        // this.userService.setAvatar(Number(userId), `${this.SERVER_URL}${file.path}`);
        console.log(file.filename)
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
