
export class AppError extends Error {
    statusCode: number;
    details?: string[];
    code?: string;
  
    constructor(message: string, statusCode: number, details?: string[]) {
      super(message);
      this.statusCode = statusCode;
      this.details = details;
      Object.setPrototypeOf(this, new.target.prototype); // For proper instanceof checks
    }
  }
  
  
  export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
  }
  
 
  export class ValidationError extends AppError {
    constructor(message = "Validation failed", details: string[]) {
      super(message, 400, details);
    }
  }
  
  /**
   * Thrown when a database-level failure occurs.
   */
  export class DatabaseError extends AppError {
    constructor(message = "Database error") {
      super(message, 500);
    }
  }
  
  /**
   * Thrown for issues originating from the repository layer.
   */
  export class ServiceError extends Error {
    code: string;
  
    constructor(message: string, code = "SERVICE_ERROR") {
      super(message);
      this.code = code;
    }
  }
  
  export class RepositoryError extends Error {
    code: string;
  
    constructor(message: string, code = "REPO_ERROR") {
      super(message);
      this.code = code;
    }
  }
  export class AuthenticationError extends AppError {
    constructor(message = "Authentication failed", code = "AUTH_ERROR") {
      super(message, 401);
      this.code = code;
    }
  }
  
  export class AuthorizationError extends AppError {
    constructor(message = "Not authorized", code = "FORBIDDEN") {
      super(message, 403);
      this.code = code;
    }
  }
  