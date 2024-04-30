import { Body, Controller, Delete, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Permission } from '../permission';
import { AssetService } from './asset.service';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UploadDto } from './dtos/upload.dto';
import { Allow } from '../auth/guards/allow.decorator';
const fetch = require('node-fetch');

@ApiTags('assets')
@ApiBearerAuth()
@Controller('assets')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Get('get-by-path/:path*')
  async getByPath(@Req() req: any, @Res() res: any) {
    const path = req.url?.replace('/assets/get-by-path', process.env.AWS_DOMAIN);
    const imageResponse = await fetch(path);
    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);
    res.set('Content-Type', imageResponse.headers.get('content-type') || 'application/octet-stream');
    res.send(imageBuffer);
  }

  // @Get(':folderId/discover')
  // @Allow(Permission.Authenticated)
  // discover(@Param('folderId') folderId: string) {
  //   return this.assetService.discover(folderId);
  // }

  @Post('upload')
  // @Allow(Permission.Authenticated)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    type: UploadDto,
  })
  @ApiConsumes('multipart/form-data')
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() payload: UploadDto) {
    return this.assetService.create(file);
  }

  // @Post('create-folder')
  // @Allow(Permission.Authenticated)
  // createFolder(@Body() payload: CreateFolderDto) {
  //   return this.assetService.createFolder(payload);
  // }

  // @Delete(':id')
  // @Allow(Permission.Authenticated)
  // delete(@Param('id') id: string) {
  //   return this.assetService.delete(id);
  // }
}
