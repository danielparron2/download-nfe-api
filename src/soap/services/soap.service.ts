import { Injectable } from '@nestjs/common';
import * as https from 'https';
import axios from 'axios';

@Injectable()
export class SoapService {
  private readonly endpoint = 'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx';
  private readonly soapAction = 'http://www.barueri.sp.gov.br/nfe/ConsultaNFeRecebidaPeriodo';

  async consumeWs(
    cnpj: string,
    certBase64: string,
    certPassword: string,
    dtInicio: string,
    dtTermino: string,
  ): Promise<string> {
    // Converter certificado Base64 para Buffer
    const certBuffer = Buffer.from(certBase64, 'base64');

    // Criar agente HTTPS com certificado
    const httpsAgent = new https.Agent({
      pfx: certBuffer,
      passphrase: certPassword,
      rejectUnauthorized: false, 
      keepAlive: false,
    });

    // Montar envelope SOAP completo
    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:nfe="http://www.barueri.sp.gov.br/nfe">
        <soapenv:Header/>
        <soapenv:Body>
          <nfe:ConsultaNFeRecebidaPeriodo>
            <nfe:VersaoSchema>1</nfe:VersaoSchema>
            <nfe:MensagemXML>
              <![CDATA[
                <NFeRecebidaPeriodo xmlns="http://www.barueri.sp.gov.br/nfe">
                  <CPFCNPJTomador>${cnpj}</CPFCNPJTomador>
                  <DataInicial>${dtInicio}</DataInicial>
                  <DataFinal>${dtTermino}</DataFinal>
                  <Pagina>1</Pagina>
                </NFeRecebidaPeriodo>
              ]]>
            </nfe:MensagemXML>
          </nfe:ConsultaNFeRecebidaPeriodo>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
      const response = await axios.post(this.endpoint, soapEnvelope, {
        httpsAgent,
        headers: {
          'Content-Type': 'text/xml;charset=utf-8',
          'SOAPAction': this.soapAction,
        },
      });

      console.log('Resposta SOAP:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na requisição SOAP:', error.message);
      throw new Error(`Erro ao consumir o serviço SOAP: ${error.message}`);
    }
  }
}
