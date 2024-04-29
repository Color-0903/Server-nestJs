import { PartialType, IntersectionType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends IntersectionType(PartialType(CreateRoleDto) ) {}
