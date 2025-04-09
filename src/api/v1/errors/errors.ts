
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
  export class RepositoryError extends AppError {
    constructor(message = "Repository error") {
      super(message, 500);
    }
  }
  
  
  export class ServiceError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ServiceError";
    }
  }
  