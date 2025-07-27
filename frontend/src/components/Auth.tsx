import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

interface AuthProps {
  onAuthSuccess?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      onAuthSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="auth-container" data-testid="auth-form">
      <div className="auth-form">
        <h2 data-testid="auth-title">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        {error && (
          <div className="error-message" data-testid="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-testid="name-input"
              />
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="email-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="password-input"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            data-testid="submit-button"
            className="submit-button"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p className="toggle-mode">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            type="button" 
            onClick={toggleMode}
            data-testid="toggle-mode-button"
            className="link-button"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
