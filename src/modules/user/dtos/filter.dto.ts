import { PartialType } from '@nestjs/swagger';
import { SearchFilter } from 'src/common/dtos/search-filter.dto';

export class FilterAdminDto extends SearchFilter {}
export class FilterUserDto extends SearchFilter {}
