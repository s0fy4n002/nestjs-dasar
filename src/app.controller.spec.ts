import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = await app.resolve<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return correct message and users data', () => {
      const result = appController.getHello();

      // Cek structure object
      expect(result).toEqual({
        message: 'data message',
        users: [
          { name: 'Andi', age: 25 },
          { name: 'Budi', age: 30 },
          { name: 'Citra', age: 28 },
        ],
      });

      // Atau cek individual properties
      expect(result.message).toBe('data message');
      expect(result.users).toHaveLength(3);
      expect(result.users[0].name).toBe('Andi');
      expect(result.users[0].age).toBe(25);
    });
  });


});
