import * as R from 'ramda';
import { AsyncStorage } from 'react-native';

export class Storage {
  static async set(key: string, value: any) {
    try {
      await AsyncStorage.setItem(`@scrum-poker:${key}`, value);
    } catch (error) {
      console.error('Error saving data in device storage');
    }
  }

  static async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(`@scrum-poker:${key}`);
      return value;
    } catch (error) {
      console.error('Error getting data from device storage');
    }
  };

  static async delete(key: string) {
    try {
      await AsyncStorage.removeItem(`@scrum-poker:${key}`);
    } catch (error) {
      console.error('Error removing data from device storage');
    }
  }

  static async multiSet(keys: string[], values: any[]) {
    try {
      const _keys = R.map(R.concat('@scrum-poker:'))(keys);
      const payload = _keys.map((key: string, index: number) => [ key, values[index] ]);
      await AsyncStorage.multiSet(payload);
    } catch (error) {
      console.error('Error saving multi data in device storage');
    }
  }

  static async multiGet(keys: string[]) {
    try {
      const _keys = R.map(R.concat('@scrum-poker:'))(keys);
      const values = await AsyncStorage.multiGet(_keys);
      return values;
    } catch (error) {
      console.error('Error getting multi data from device storage');
    }
  }

  static async multiDelete(keys: string[]) {
    try {
      const _keys = R.map(R.concat('@scrum-poker:'))(keys);
      await AsyncStorage.multiRemove(_keys);
    } catch(error) {
      console.error('Error removing multi data from device storage');
    }
  }
}
