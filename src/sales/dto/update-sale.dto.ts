import { PartialType } from '@nestjs/mapped-types';
import { CreatesaleDto } from './create-sale.dto';

export class UpdatesaleDto extends PartialType(CreatesaleDto) {}
