import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/todos" replace />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              } 
            />
            <Route 
              path="/todos" 
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={<Navigate to="/todos" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
