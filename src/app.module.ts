import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CertificadosModule } from './certificados/certificados.module';
import { SoapModule } from './soap/soap.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.79.224.3',
      port: 3306,
      username: 'root',
      password: '9aX4BjcY',
      database: 'tcc-downloads',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsuariosModule,
    CertificadosModule,
    SoapModule,
  ],
})
export class AppModule {}
