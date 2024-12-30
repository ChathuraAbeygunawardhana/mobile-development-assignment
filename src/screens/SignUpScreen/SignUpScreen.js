import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import { validateUsername, validatePassword, validateConfirmPassword } from '../../hooks/useValidation';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('Chathura');
  const [password, setPassword] = useState('Helloworld123@@@');
  const [confirmPassword, setConfirmPassword] = useState('Helloworld123@@@');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
    setUsernameError(validateUsername(text));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(text, confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setConfirmPasswordError(validateConfirmPassword(password, text));
  };

  const handleSignUp = () => {
    if (!usernameError && !passwordError && !confirmPasswordError && username && password && confirmPassword) {
      setUser({ username, password });
      navigation.replace('MainApp', { username });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
            backgroundColor: '#F8F9FA',
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ fontSize: 24, marginBottom: 32, textAlign: 'center' }}>
            Create Account
          </Text>
          <Text style={{ marginBottom: 8 }}>Username</Text>
          <TextInput
            value={username}
            onChangeText={handleUsernameChange}
            style={{
              marginBottom: 16,
              padding: 8,
              backgroundColor: 'white',
              borderRadius: 24,
              borderColor: 'rgba(128, 128, 128, 0.5)',
              borderWidth: 1,
            }}
          />
          {usernameError ? <Text style={{ color: 'red', marginBottom: 15, textAlign: 'right' }}>{usernameError}</Text> : null}
          <Text style={{ marginBottom: 8 }}>Password</Text>
          <View style={{ marginBottom: 16, position: 'relative' }}>
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              style={{ 
                padding: 8, 
                backgroundColor: 'white', 
                borderRadius: 24,
                borderColor: 'rgba(128, 128, 128, 0.5)', // Reduced opacity of border color
                borderWidth: 1,
              }}
            />
            {password.length > 0 && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 16, top: 12 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          </View>
          {passwordError ? <Text style={{ color: 'red', marginBottom: 15, textAlign: 'right' }}>{passwordError}</Text> : null}
          <Text style={{ marginBottom: 8 }}>Confirm Password</Text>
          <View style={{ marginBottom: 16, position: 'relative' }}>
            <TextInput
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
              style={{ 
                padding: 8, 
                backgroundColor: 'white', 
                borderRadius: 24,
                borderColor: 'rgba(128, 128, 128, 0.5)', // Reduced opacity of border color
                borderWidth: 1,
              }}
            />
            {confirmPassword.length > 0 && (
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: 16, top: 12 }}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          </View>
          {confirmPasswordError ? <Text style={{ color: 'red', marginBottom: 15, textAlign: 'right' }}>{confirmPasswordError}</Text> : null}
          <TouchableOpacity
            onPress={handleSignUp}
            style={{
              backgroundColor: 'black',
              padding: 12,
              borderRadius: 24,
              alignItems: 'center',
              marginTop: 24, // Added marginTop to move the button lower
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{ marginTop: 24, textAlign: 'center' }}> {/* Increased marginTop */}
              <Text style={{ color: 'grey' }}>Already have an account? </Text>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
