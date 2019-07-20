export interface RoomsStateModel {
  models: RoomModel[];
  model: RoomModel | {};
}

export interface RoomModel {
  id: number;
  name: string;
}