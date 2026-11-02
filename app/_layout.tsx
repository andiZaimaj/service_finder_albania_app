import React, { useEffect, useCallback } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { InstrumentSerif_400Regular_Italic } from "@expo-google-fonts/instrument-serif";
import * as SplashScreen from "expo-splash-screen";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/store/authStore";
import { useSavedStore } from "@/store/savedStore";
import { Colors } from "@/constants/colors";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadStoredAuth = useAuthStore((s) => s.loadStoredAuth);
  const loadSaved = useSavedStore((s) => s.loadSaved);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    InstrumentSerif_400Regular_Italic,
  });

  useEffect(() => {
    loadStoredAuth();
    loadSaved();
  }, [loadStoredAuth, loadSaved]);

  const onLayoutReady = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutReady();
  }, [onLayoutReady]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.cream },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="worker/[id]" />
          <Stack.Screen name="job/[id]" />
          <Stack.Screen name="job/create" />
          <Stack.Screen name="job/browse" />
          <Stack.Screen name="job/my-jobs" />
          <Stack.Screen name="proposal/[jobId]" />
          <Stack.Screen name="review/create" />
          <Stack.Screen name="subscription/index" />
          <Stack.Screen name="notifications/index" />
          <Stack.Screen name="messages/[userId]" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
