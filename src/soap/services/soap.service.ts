import { Injectable } from '@nestjs/common';
import * as https from 'https';
import * as soap from 'soap';
import { HttpClient } from 'soap/lib/http';

@Injectable()
export class SoapService {
  private readonly wsdlUrl = 'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx?WSDL';

  async consumeWs(
    cnpj: string,
    certBase64: string,
    certPassword: string,
    dtInicio: string,
    dtTermino: string,
  ): Promise<any> {
    const soapXml = `
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

    const cert = Buffer.from(certBase64, 'base64');

    // Configurar o agente HTTPS com o certificado
    const httpsAgent = new https.Agent({
      pfx: cert,
      passphrase: certPassword,
    });

    // Criar um cliente SOAP customizado com suporte ao httpsAgent
    const customHttpClient = new soap.HttpClient();
    customHttpClient.request = function (rurl, data, callback, exheaders, exoptions = {}) {
      // Certificar-se de que exoptions não seja undefined
      exoptions.agent = httpsAgent; // Define o agente personalizado
      return soap.HttpClient.prototype.request.call(this, rurl, data, callback, exheaders, exoptions);
    };

    const client = await soap.createClientAsync(this.wsdlUrl, { httpClient: customHttpClient });

    try {
      const result = await client.ConsultaNFeRecebidaPeriodoAsync({
        ConsultaNFeRecebidaPeriodo: {
          VersaoSchema: '1',
          MensagemXML: soapXml,
        },
      });
      return result;
    } catch (error) {
      throw new Error(`SOAP request failed: ${error.message}`);
    }
  }
}
