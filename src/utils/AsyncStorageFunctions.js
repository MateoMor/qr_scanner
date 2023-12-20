import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataAsync = async (key, value) => {
    console.log("hello world")
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getDataAsync = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        /* console.log(value) */
        return value; 
      }
    } catch (e) {
      console.error(e);
    }
  };
