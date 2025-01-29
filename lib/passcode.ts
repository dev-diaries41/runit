
import * as Crypto from 'expo-crypto'
import * as SecureStore from 'expo-secure-store'


export const hashPass = async (enteredPasscode: string) => {
  try {
    const hashedPasscode = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, enteredPasscode);
    return hashedPasscode;
  } catch (error) {
    console.error('Error hashing passcode:', error);
    throw new Error('Error hashing passcode')
  }
};

export const validatePasscode = async (enteredPasscode: string, storedHashedPasscode: string | null) => {
  try {
    const hashedPasscode = await hashPass(enteredPasscode);
    return hashedPasscode === storedHashedPasscode;
  } catch (error) {
    console.log('Error validating passcode:', error);
    return false;
  }
};

export const checkHasPassocde = () => {
  const passcode =  SecureStore.getItem('passHash');
  return !!passcode;
};

