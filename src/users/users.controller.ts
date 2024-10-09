import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { User } from './users.entity';
  import { UsersService } from './users.service';
  import { IUser } from './users.interface';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
      return await this.usersService.findOne(id);
    }
  
    @Post()
    async create(@Body('user') user: IUser): Promise<User> {
      return await this.usersService.create(user);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body('user') user: IUser,
    ): Promise<User> {
      return await this.usersService.update(id, user);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<number> {
      return await this.usersService.remove(id);
    }
  }
  