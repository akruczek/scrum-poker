import { PokerCard } from '@core/models';
import { parseEmailToId } from '@core/helpers';
import { SetValuePayload } from '../../../dashboard/store/dashboard.actions';

export const getNewEstimation = (card: PokerCard, roomId: string, email: string): SetValuePayload => ({
  roomId,
  value: card,
  userId: parseEmailToId(email),
});
