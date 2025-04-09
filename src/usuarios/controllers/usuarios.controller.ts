import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuariosService.create(usuario);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() usuario: Usuario) {
    return this.usuariosService.update(id, usuario);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usuariosService.delete(id);
  }
}
