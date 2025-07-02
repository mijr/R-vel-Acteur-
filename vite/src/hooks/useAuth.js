// src/hooks/useAuth.js
import jwtDecode from 'jwt-decode';

export function useAuth() {
  const token = localStorage.getItem('token');
  if (!token) return { role: 'guest', user: null };

  try {
    const decoded = jwtDecode(token);
    return { role: decoded.role || 'user', user: decoded };
  } catch {
    return { role: 'guest', user: null };
  }
}
