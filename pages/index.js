import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
    window.location.href = '/api/auth/start';
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: 'url("https://i.pinimg.com/564x/05/ba/23/05ba23c0ea692c7c938c5ad8a5526218.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    card: {
      display: 'flex',
      maxWidth: '900px',
      width: '100%',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    leftSection: {
      display: 'none',
      background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)',
      color: 'white',
      padding: '40px',
      textAlign: 'center',
    },
    rightSection: {
      padding: '40px',
      width: '100%',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#F1C0E8',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#FFCFD2',
    },
    rememberForgot: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#6b7280',
    },
    signup: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Section */}
        <div style={styles.leftSection}>
          <h1>Welcome Back!</h1>
          <p>We’re excited to see you again!</p>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <h2>Login</h2>
          <p>Welcome back! Please login to your account.</p>

          {/* Email Input */}
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            placeholder="username@gmail.com" 
            style={styles.inputField} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          {/* Password Input */}
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            placeholder="********" 
            style={styles.inputField} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          {/* Remember Me & Forgot Password */}
          <div style={styles.rememberForgot}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
            <a href="#">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button 
            onClick={handleLogin} 
            style={styles.button}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          >
            Login with Google
          </button>

          {/* Signup Link */}
          <p style={styles.signup}>
            New User? <a href="#">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}
