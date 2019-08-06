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
      roomIndex: 0,
      userIndex: 1,
    };

    expect(getNewEstimation(card, rooms[0], rooms, { email: 'test1@example.com' } as UserModel))
      .toEqual(expectedResult);
  });
});
