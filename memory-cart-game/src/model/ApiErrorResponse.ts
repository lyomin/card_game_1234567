export interface ApiErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  path?: string;
  message?: string;
  errors?: Record<string, string>;
}