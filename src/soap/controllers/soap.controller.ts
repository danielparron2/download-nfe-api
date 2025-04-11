import { Controller, Get, Query } from '@nestjs/common';
import { SoapService } from '../services/soap.service';

@Controller('wsdownload')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  @Get()
  async getData(
    @Query('cnpj') cnpj: string,
    @Query('certBase64') certBase64: string,
    @Query('certPassword') certPassword: string,
    @Query('dtInicio') dtInicio: string,
    @Query('dtTermino') dtTermino: string,
  ) {
    return this.soapService.consumeWs(cnpj, certBase64, certPassword, dtInicio, dtTermino);
  }
}
