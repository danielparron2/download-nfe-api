import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CertificadosModule } from './certificados/certificados.module';
import { SoapModule } from './soap/soap.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      //host: 'localhost',    //localhost
      host: '10.79.224.3',    //privado
      //host: '130.211.228.255',  //público
      port: 3306,
      username: 'root',
      password: '9aX4BjcY',
      //password: 'Sant**3692',  //localhost
      database: 'tcc-downloads',
      //database: 'TCC_DOWNLOAD',   //localost
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsuariosModule,
    CertificadosModule,
    SoapModule,
    AuthModule,
  ],
})
export class AppModule {}
