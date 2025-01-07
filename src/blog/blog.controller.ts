import { Controller, Get, Post, Body, Patch, Param, Delete,Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '../core/guards/auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: any, @Body() createBlogDto: CreateBlogDto) {
    const userId = req.session.userId;
    return this.blogService.create(userId, createBlogDto);
  }

  @Get()
  findAll(@Req() req: any) {
    const query = req.query.query || '';
    return this.blogService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
