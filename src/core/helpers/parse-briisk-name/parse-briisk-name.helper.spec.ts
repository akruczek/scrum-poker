import { parseBriiskName } from './parse-briisk-name.helper';

describe('parseBriiskName', () => {
  describe('when parseBriiskName was called', () => {
    describe('and given email ends with @briisk.co', () => {
      it('should get name and optional last name from given email', () => {
        expect(parseBriiskName('test.example@briisk.co'))
          .toEqual('Test Example');
      });
    });

    describe('and given email does not ends with @briisk.co', () => {
      it('should return given email', () => {
        expect(parseBriiskName('test@example.com'))
          .toEqual('test@example.com');
      });
    });
  });
});
