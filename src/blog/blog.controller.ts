import { Controller, Get, Post, Body, Patch, Param, Delete,Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '../core/guards/auth.guard';
import { StaffGuard } from 'src/core/guards/staff.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  
  @Get()
  findAll(@Req() req: any) {
    const search = req.query.search || '';
    return this.blogService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Post()
  create(@Req() req: any, @Body() createBlogDto: CreateBlogDto) {
    const userId = req.session.userId;
    return this.blogService.create(userId, createBlogDto);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
