import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(password, usuario.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { id: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: usuario.id,
        email: usuario.email,
        name: usuario.name || 'Usuário',
      },
    };
  }
}
