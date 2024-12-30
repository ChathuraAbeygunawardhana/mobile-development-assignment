export const validateUsername = (username) => {
  if (username === '') {
    return 'Username is required';
  } else if (username.length < 5) {
    return 'Username must be at least 5 characters';
  } else if (/\s/.test(username)) {
    return 'Username cannot contain spaces';
  } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return 'Username can only contain letters and numbers';
  }
  return '';
};

export const validatePassword = (password) => {
  if (password === '') {
    return 'Password is required';
  } else if (password.length < 8) {
    return 'Password must be at least 8 characters';
  } else if (password.length > 64) {
    return 'Password must be less than 64 characters';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
      password
    )
  ) {
    return 'Password must contain an uppercase letter, a lowercase letter, a number, and a special character';
  } else if (/\s/.test(password)) {
    return 'Password must not contain spaces';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword === '') {
    return 'Confirm Password is required';
  } else if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};
