import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface CreateTodoData {
  title: string;
  description: string;
}

interface UpdateTodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
    if (this.token) {
      this.setAuthHeader(this.token);
    }
  }

  private setAuthHeader(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private removeAuthHeader() {
    delete axios.defaults.headers.common['Authorization'];
  }

  // Auth methods
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    const authData = response.data;
    this.token = authData.token;
    localStorage.setItem('authToken', authData.token);
    this.setAuthHeader(authData.token);
    return authData;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    const authData = response.data;
    this.token = authData.token;
    localStorage.setItem('authToken', authData.token);
    this.setAuthHeader(authData.token);
    return authData;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    this.removeAuthHeader();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Todo methods
  async getTodos(): Promise<Todo[]> {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  }

  async createTodo(data: CreateTodoData): Promise<Todo> {
    const response = await axios.post(`${API_BASE_URL}/todos`, data);
    return response.data;
  }

  async updateTodo(id: string, data: UpdateTodoData): Promise<Todo> {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, data);
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
  }
}

const apiService = new ApiService();
export default apiService;
export type { User, Todo, RegisterData, LoginData, CreateTodoData, UpdateTodoData };
