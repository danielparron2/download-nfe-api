import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { id },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const saltRounds = 10;
    usuario.senha = await bcrypt.hash(usuario.senha, saltRounds); // Criptografa a senha
    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, usuario: Usuario): Promise<any> {
    if (usuario.senha) {
      const saltRounds = 10;
      usuario.senha = await bcrypt.hash(usuario.senha, saltRounds); // Criptografa a nova senha
    }
    return this.usuarioRepository.update(id, usuario);
  }

  delete(id: number): Promise<any> {
    return this.usuarioRepository.delete(id);
  }
}
