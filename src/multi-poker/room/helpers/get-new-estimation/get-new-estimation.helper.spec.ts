import { getNewEstimation } from './get-new-estimation.helper';
import { PokerCard } from '../../../../core/models';
import { UserModel } from '../../../../auth/models/auth.models';

describe('when getNewEstimation was called', () => {
  const rooms: any[] = [
    {
      id: 0,
      name: 'Super room',
      users: [
        { id: 11, email: 'test@example.com' }, { id: 22, email: 'test1@example.com' },
      ],
    },
    {
      id: 1,
      name: 'Test Room',
      users: [
        { id: 21, email: 'test2@example.com' }, { id: 32, email: 'test3@example.com' },
      ],
    },
  ];
  
  const card: PokerCard = { value: 5, label: '5' };

  it('should return given poker card, room and user indexes based on given arguments', () => {
    const expectedResult = {
      value: card,
      roomId: 0,
      userId: 'test1@example_com',
    };

    expect(getNewEstimation(card, rooms[0].id, 'test1@example.com'))
      .toEqual(expectedResult);
  });
});
