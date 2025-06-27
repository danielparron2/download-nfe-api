import { Injectable } from '@nestjs/common';
import * as https from 'https';
import * as soap from 'soap';

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

    // Converter o certificado Base64 em Buffer
    const certBuffer = Buffer.from(certBase64, 'base64');

    // Configurar o agente HTTPS com o certificado e senha
    const httpsAgent = new https.Agent({
      pfx: certBuffer,
      passphrase: certPassword,
      rejectUnauthorized: false, // Permitir conexões sem CA válida (se necessário)
    });

    // Criar XML idêntico ao enviado no C#
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

    // Log do XML gerado
    console.log('XML enviado:', soapXml);

    // Criar um cliente SOAP customizado para usar o agente HTTPS
    const customHttpClient = new soap.HttpClient();
    customHttpClient.request = function (rurl, data, callback, exheaders, exoptions = {}) {
      exoptions.agent = httpsAgent; // Configurar o agente HTTPS
      return soap.HttpClient.prototype.request.call(this, rurl, data, callback, exheaders, exoptions);
    };

    const client = await soap.createClientAsync(this.wsdlUrl, { httpClient: customHttpClient });

    try {
      // Enviar a requisição para a API
      const result = await client.ConsultaNFeRecebidaPeriodoAsync({
        ConsultaNFeRecebidaPeriodo: {
          VersaoSchema: '1',
          MensagemXML: soapXml,
        },
      });

      // Retornar o resultado
      console.log('Resposta SOAP:', result);
      return result;
    } catch (error) {
      console.error('Erro na requisição SOAP:', error.message);
      throw new Error(`Requisição SOAP falhou: ${error.message}`);
    }
  }
}
