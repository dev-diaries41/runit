import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing'
import { Platform, Share } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings, File, NewFile, RunSession } from '@/types';
import CryptoJS from "react-native-crypto-js";
import * as Crypto from 'expo-crypto'
import { DefaultSettings } from '@/constants/globals';
import * as DocumentPicker from 'expo-document-picker';

// As Expo's SecureStore does not support values larger than 2048
// bytes, an AES-256 key is generated and stored in SecureStore, while
// it is used to encrypt/decrypt values stored in AsyncStorage.

export class EncryptedAsyncStorage {
  private async _encrypt(key: string, value: string) {
    return await encrypt(key, value)
  }

  private async _decrypt(key: string, value: string) {
   return await decrypt(key, value);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) { return encrypted; }

    return await this._decrypt(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value);
    await AsyncStorage.setItem(key, encrypted);
  }
}

export const getBase64WithHeader = async (fileUri: string) => {
  const base64NoMeta = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
  const extension = fileUri.split('.').pop();
  const base64Image = `data:image/${extension};base64,${base64NoMeta}`;
  return base64Image;
}

export const downloadFromUrl = async (url: string) => {
  const filename = `IMG_${Date.now()}`;
  const result = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + filename
  );

  return await saveExistingFile({uri: result.uri, filename, mimetype: result.headers["Content-Type"]});
};

export async function downloadBase64ImageLocally(base64String: string) {
  if(!base64String){
    throw new Error('Invalid base64 image');
  }
  try {
    // Create a directory for the downloaded images if it doesn't exist
    const directory = `${FileSystem.documentDirectory}images/`;
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    const filename = `POST_${Date.now()}`

    const filePath = `${directory}${filename}.png`; // Change the extension if needed
    await FileSystem.writeAsStringAsync(filePath, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return filePath; // Return the local URI of the downloaded image
  } catch (error) {
    console.error('Error downloading base64 image:', error);
    throw error;
  }
}

export const saveExistingFile = async (file: File) => {
  const {uri, filename, mimetype, readingOptions={encoding: FileSystem.EncodingType.Base64}, writingOptions= {encoding: FileSystem.EncodingType.Base64}} = file;
  if (Platform.OS === 'android') {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const  fileContent = await FileSystem.readAsStringAsync(uri, readingOptions);
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype);
        await FileSystem.writeAsStringAsync(fileUri, fileContent, writingOptions);
        return { success: true, message: 'Download successful' };
      } else {
        return { success: false, message: 'Permissions not granted' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } else {
    shareAsync(uri);
    return { success: true, message: 'Sharing' };
  }
};

export const saveNewFile = async (file: NewFile) => {
  const { filename, mimetype, content, writingOptions= {encoding: FileSystem.EncodingType.Base64}} = file;
  if (Platform.OS === 'android') {
    if(!content)throw new Error('Missing file content');
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype);
        await FileSystem.writeAsStringAsync(fileUri, content, writingOptions);
        return { success: true, message: 'Download successful' };
      } else {
        return { success: false, message: 'Permissions not granted' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};


export const shareContent = async (content: string, title = 'Sharing Note') => {
  try {
    const shareOptions = {
      title: title,
      message: content
    };

    const iOSShareOptions = {
      title: title,
      url: content
    };

    return await Share.share(Platform.OS === 'ios'? iOSShareOptions: shareOptions);
  } catch (error) {
  }
};

export const saveSettings = async (settings: Partial<Settings>) => {
  try {
    const currentSettingsStr = await AsyncStorage.getItem('settings');
    const currentSettings = currentSettingsStr ? JSON.parse(currentSettingsStr) : DefaultSettings;
    Object.entries(settings).forEach(([key, value]) => currentSettings[key] = value )
    await AsyncStorage.setItem('settings', JSON.stringify(currentSettings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

const genEncryptionKey = () => Crypto.getRandomBytes(32).toString();

// Generate random encryption key and use it to encrypt note content
// Store key in secure store
export const encrypt = async(key: string, string: string) => {
   const encryptionKey = genEncryptionKey() 
   const encryptedString = CryptoJS.AES.encrypt(string, encryptionKey).toString();
   await SecureStore.setItemAsync(key, encryptionKey)
   return encryptedString;

}

// Read key from SecrureStore and decrypt note content
export const decrypt = async(key: string, encryptedString: string) => {  
  const encryptionKey = await SecureStore.getItemAsync(key);
  if(encryptionKey){
    const bytes  = CryptoJS.AES.decrypt(encryptedString, encryptionKey);
    const decryptString = bytes.toString(CryptoJS.enc.Utf8);
    return decryptString;
  }
  return null;
}


export const fetchAsyncStorageBatch = async <T = any>(batchSize: number, filterConditon?: (key: string) => boolean) => {
  const allKeys = await AsyncStorage.getAllKeys();
  const runKeys = filterConditon? allKeys.filter(filterConditon): allKeys;
  const newBatchKeys = runKeys.slice(0, batchSize);
  const retrievedItems: T[] = ( await AsyncStorage.multiGet(newBatchKeys))
    .map(([key, value]) => ({ id: key, name: key, ...JSON.parse(value ?? '{}') }))
    .filter(item => Object.keys(item).length !== 0);
    
  return {retrievedItems, batchKeysLength: newBatchKeys.length}
};

export const backup = async() => {
  const {retrievedItems} = await fetchAsyncStorageBatch<RunSession>(Infinity, key => key.includes("run"));
  const runHistory = JSON.stringify(retrievedItems);
  await saveNewFile({filename: 'notes_backup', content: runHistory, mimetype:'application/json', writingOptions:{
      encoding: FileSystem.EncodingType.UTF8,
  }})
}

export async function pickDocument(callback: (uri: string) => void): Promise<void> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true, 
    });
    if (!result.canceled) {
      callback(result.assets[0].uri);
    } 
  } catch (error) {
    console.error('Error picking document:', error);
  }
}


export const importRunitData = async(uri: string): Promise<void>  =>{
  try {
    const fileContent = await FileSystem.readAsStringAsync(uri);
    const runSessions = JSON.parse(fileContent) as RunSession[];
    const savePromises = runSessions.map(session => AsyncStorage.setItem(session.id, JSON.stringify(session)));
    await Promise.all(savePromises)
    await FileSystem.deleteAsync(uri); 
    console.log('Imported runit data sucessfully');

  } catch (error) {
    console.error('Error importing runit data:', error);
    throw new Error('Failed to runit data');
  }
}