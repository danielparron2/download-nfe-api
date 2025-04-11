import { Test, TestingModule } from '@nestjs/testing';
import { SoapController } from './soap.controller';

describe('SoapController', () => {
  let controller: SoapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoapController],
    }).compile();

    controller = module.get<SoapController>(SoapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
