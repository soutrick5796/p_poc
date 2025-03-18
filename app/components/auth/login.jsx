import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSnackbar } from '../common/SnackbarProvider';
import { authenticateUser } from '../../util/util';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!userName || !password) {
      showSnackbar('Please enter both username and password');
      return;
    }
    const user = authenticateUser(userName, password);
    if (user) {
      dispatch(setUser({ userId: user.id, userName: user.username }));
      router.replace('/components/views/home');
    } else {
      showSnackbar('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#aaa"
        value={userName} 
        onChangeText={setUserName} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#aaa"
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: '#121212' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#fff' 
  },
  input: { 
    width: '100%', 
    padding: 12, 
    marginVertical: 10, 
    borderWidth: 1, 
    borderColor: '#444', 
    borderRadius: 8, 
    backgroundColor: '#222', 
    color: '#fff'
  },
  button: { 
    backgroundColor: '#1DB954', 
    padding: 12, 
    borderRadius: 8, 
    width: '100%', 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});
