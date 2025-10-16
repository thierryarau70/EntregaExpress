export interface User { id: number; name: string; email: string; roles: string[] }
export interface LoginPayload { email: string; password: string }
export interface LoginResponse { token: string; user: User }