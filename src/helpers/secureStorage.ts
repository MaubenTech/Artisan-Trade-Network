import * as SecureStore from "expo-secure-store";

/**
 * Function to store key-value pair in secure storage
 * @param key The key of the key-value pair being stored
 * @param value The value of the key-value pair being stored
 */
export async function saveToSecureStorage(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

/**
 * Function to retrieve value from secure storage
 * @param key The key for which to retrieve the value from
 */
export async function getValueFromSecureStorage(key: string) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		alert("🔐 Here's your value 🔐 \n" + result);
	} else {
		alert("No values stored under that key.");
	}
	return result;
}
