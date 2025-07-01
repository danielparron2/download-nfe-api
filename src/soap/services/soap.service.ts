import { Injectable } from '@nestjs/common';
import * as https from 'https';
import axios from 'axios';

@Injectable()
export class SoapService {
  private readonly endpoint = 'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx';
  // Se quiser testar removendo SOAPAction, pode comentar esta linha e o header.
  private readonly soapAction = 'http://www.barueri.sp.gov.br/nfe/ConsultaNFeRecebidaPeriodo';

  async consumeWs(
    cnpj: string,
    certBase64: string,
    certPassword: string,
    dtInicio: string,
    dtTermino: string,
  ): Promise<string> {
    const certBuffer = Buffer.from(certBase64, 'base64');

    const httpsAgent = new https.Agent({
      pfx: certBuffer,
      passphrase: certPassword,
      rejectUnauthorized: false,
      keepAlive: false,
    });

    // Monta o XML minificado dentro do CDATA (sem quebras de linha extras)
    const mensagemXML = `<NFeRecebidaPeriodo xmlns="http://www.barueri.sp.gov.br/nfe">` +
      `<CPFCNPJTomador>${cnpj}</CPFCNPJTomador>` +
      `<DataInicial>${dtInicio}</DataInicial>` +
      `<DataFinal>${dtTermino}</DataFinal>` +
      `<Pagina>1</Pagina>` +
      `</NFeRecebidaPeriodo>`;

    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>` +
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:nfe="http://www.barueri.sp.gov.br/nfe">` +
      `<soapenv:Header/>` +
      `<soapenv:Body>` +
      `<nfe:ConsultaNFeRecebidaPeriodo>` +
      `<nfe:VersaoSchema>1</nfe:VersaoSchema>` +
      `<nfe:MensagemXML><![CDATA[${mensagemXML}]]></nfe:MensagemXML>` +
      `</nfe:ConsultaNFeRecebidaPeriodo>` +
      `</soapenv:Body>` +
      `</soapenv:Envelope>`;

    console.log('Envelope SOAP enviado:\n', soapEnvelope);

    try {
      const response = await axios.post(this.endpoint, soapEnvelope, {
        httpsAgent,
        headers: {
          'Content-Type': 'text/xml;charset="utf-8"',
          'Accept': 'text/xml',
          // Teste comentar essa linha se 400 persistir
          'SOAPAction': this.soapAction,
        },
      });

      console.log('Resposta SOAP:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro na requisição SOAP:', error.message || error);
      throw new Error(`Erro ao consumir o serviço SOAP: ${error.message || error}`);
    }
  }
}