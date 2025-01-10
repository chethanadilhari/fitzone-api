import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../core/services/prisma.service';

@Injectable()
export class BlogService {

  constructor(private prismaService: PrismaService) {}

  create(authorId:number, createBlogDto: CreateBlogDto) {
    const result = this.prismaService.blog.create({
      data: {
      ...createBlogDto,
      author_id: authorId
      }
    });
    return result;
  }

  async findAll(query: string) {
    let result;
    if (query) {
      result = await this.prismaService.blog.findMany({
      where: {
        OR: [
        {
          title: {
          contains: query
          }
        },
        {
          content: {
          contains: query
          }
        }
        ]
      },
      include: {
        author: true
      }
      });
    } else {
      result = await this.prismaService.blog.findMany(
      {
        include: {
          author: true
        }
      }
      );
    }
    return result;
  }

  async findOne(id: number) {
    const result = await this.prismaService.blog.findUnique({
      where: {
        id: id
      },
      include: {
        author: {
          select: {
            f_name: true,
            l_name: true
          }
        }
      }
    });

    return result;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const result = await this.prismaService.blog.update({
      where: {
        id: id
      },
      data: updateBlogDto
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prismaService.blog.delete({
      where: {
        id: id
      }
    });
    return result;
  }
}
