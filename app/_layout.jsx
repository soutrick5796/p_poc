import { Stack } from 'expo-router';
import { SnackbarProvider } from './components/common/SnackbarProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './store/store';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const safeArea = useSafeAreaInsets();

  return (
    <SafeAreaProvider style={{ paddingTop: safeArea.top}}>
      <Provider store={store}>
        <SnackbarProvider>
          <Stack screenOptions={{ headerShown: false}} />
        </SnackbarProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
