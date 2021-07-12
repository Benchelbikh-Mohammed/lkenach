import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { salesService } from './sales.service';
import { CreatesaleDto } from './dto/create-sale.dto';
import { UpdatesaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class salesController {
    constructor(private readonly salesService: salesService) {}

    @Post()
    create(@Body() createsaleDto: CreatesaleDto) {
        return this.salesService.create(createsaleDto);
    }

    @Get()
    findAll() {
        return this.salesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatesaleDto: UpdatesaleDto) {
        return this.salesService.update(+id, updatesaleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.salesService.remove(id);
    }
}
