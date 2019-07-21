import { AsyncStorage } from 'react-native';

export class Storage {
  static async set(key: string, value: any) {
    try {
      await AsyncStorage.setItem(`@scrum-poker:${key}`, value);
    } catch (error) {
      console.error('Error saving data in device storage');
    }
    return null;
  }

  static async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(`@scrum-poker:${key}`);
      return value;
    } catch (error) {
      console.error('Error getting data from device storage');
      return null;
    }
  };

  static async delete(key: string) {
    try {
      await AsyncStorage.removeItem(`@scrum-poker:${key}`);
    } catch (error) {
      console.error('Error removing data from device storage');
    }
    return null;
  }
}