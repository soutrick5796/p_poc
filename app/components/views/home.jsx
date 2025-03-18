import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setPanCode, logout } from '../../store/userSlice';
import { useSnackbar } from '../common/SnackbarProvider';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { showSnackbar } = useSnackbar();
  const userName = useSelector((state) => state.user?.userName);
  const [inputValue, setInputValue] = useState('');

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/components/auth/login');
  };

  const handleSubmit = () => {
    if (!panRegex.test(inputValue.toUpperCase())) {
      showSnackbar('Invalid PAN format.');
      return;
    }

    dispatch(setPanCode(inputValue.toUpperCase()));
    router.push('/components/views/portfolio');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {userName}!</Text>

      <Text style={styles.label}>Enter PAN Code:</Text>
      <TextInput
        value={inputValue.toUpperCase()}
        onChangeText={setInputValue}
        placeholder="e.g., AAAAA9999A"
        style={styles.input}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Dark background
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  logoutButton: {
    backgroundColor: '#E63946',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
