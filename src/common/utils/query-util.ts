import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiHideProperty, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { SelectQueryBuilder } from 'typeorm';

export class PaginationResponse<T> {
  content: T[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  size: number;
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(PaginationResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationResponse) },
          {
            properties: {
              content: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    })
  );

export class PaginationParam {
  size?: number;
  page?: number;
  sort?: string;
  defaultSort?: string = 'descend-createdOnDate';
}

declare module 'typeorm/query-builder/SelectQueryBuilder' {
  interface SelectQueryBuilder<Entity> {
    toPaginationResponse(
      this: SelectQueryBuilder<Entity>,
      params: PaginationParam,
    ): Promise<PaginationResponse<Entity>>;
  }
}

SelectQueryBuilder.prototype.toPaginationResponse = async function <Entity>(
  this: SelectQueryBuilder<Entity>,
  params: PaginationParam,
) {
  const alias = this.alias;
  if (params.sort) {
    const sortKeyValue = params.sort.split('-');
    const direction = sortKeyValue[0];
    const key = sortKeyValue[1];
    switch (direction) {
      case 'ascend':
        this.orderBy(`${alias}.${key}`, 'ASC');
        break;
      case 'descend':
        this.orderBy(`${alias}.${key}`, 'DESC');
        break;
      default:
        break;
    }
  } else {
    this.orderBy(`${alias}.createdOnDate`, 'DESC');
  }

  const total = await this.getCount();
  const take = params.size;
  const skip = (params.page - 1) * take;

  if (!isNaN(take) && !isNaN(skip)) {
    this.take(take).skip(skip);
  }

  const content = await this.getMany();
  const result: PaginationResponse<Entity> = {
    content,
    total,
    page: Number(params.page),
    size: Number(params.size),
  };
  return result;
};
