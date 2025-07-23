import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {
  if (!username || !password) {
    Alert.alert('Validation Error', 'Username and Password are required');
    return;
  }

  try {
    setLoading(true);

    const response = await fetch('http://31.97.63.120:8081/jwt/login', {
     
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login Success:', data);
      Alert.alert('Success', 'Login Successful');

      // Example: Save token
      // await AsyncStorage.setItem('token', data.token);
      // navigation.navigate('Home');
    } else {
      console.log('Login Failed:', data);
      Alert.alert('Login Failed', data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Network Error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.content}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}>
        <Text style={styles.loginButtonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#2c3e94',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2c3e94',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
