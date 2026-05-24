type UserRole = 'REQUESTER' | 'TECHNICIAN';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  sector: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  expiresIn: number;
}

export interface RegisterResponse {
  publicId: number;
  name: string;
  email: string;
  role: UserRole;
  sector: string;
}
