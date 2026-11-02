import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "sf_access_token";
const REFRESH_TOKEN_KEY = "sf_refresh_token";

async function setItem(key: string, value: string): Promise<void> {
  const strValue = typeof value === "string" ? value : JSON.stringify(value);
  if (!strValue) return;
  if (Platform.OS === "web") {
    localStorage.setItem(key, strValue);
  } else {
    await SecureStore.setItemAsync(key, strValue);
  }
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

async function deleteItem(key: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export async function saveTokens(accessToken: string, refreshToken: string): Promise<void> {
  await Promise.all([
    setItem(ACCESS_TOKEN_KEY, String(accessToken ?? "")),
    setItem(REFRESH_TOKEN_KEY, String(refreshToken ?? "")),
  ]);
}

export async function getAccessToken(): Promise<string | null> {
  return getItem(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return getItem(REFRESH_TOKEN_KEY);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    deleteItem(ACCESS_TOKEN_KEY),
    deleteItem(REFRESH_TOKEN_KEY),
  ]);
}
