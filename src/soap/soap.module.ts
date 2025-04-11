import { Module } from '@nestjs/common';
import { SoapController } from 'src/soap/controllers/soap.controller';
import { SoapService } from 'src/soap/services/soap.service';

@Module({
  controllers: [SoapController],
  providers: [SoapService]
})
export class SoapModule {}
