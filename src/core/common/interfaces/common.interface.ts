export enum SuccessMessage {
  CREATE = '%s created successfully.',
  FETCH = '%s fetched successfully',
  UPDATE = '%s updated successfully',
  DELETE = '%s deleted successfully',
  REMOVE = '%s removed successfully',
  REGISTER = '%s registered successfully',
  LOGGED_IN = 'logged in successfully',
  STORED = '%s stored successfully',
  PUBLISH = '%s published successfully',
  VERIFY = '%s verified successfully',
  REFRESH = '%s refreshed successfully',
  ARCHIVE = '%s archived successfully',
}

export enum ErrorMessage {
  INVALID_BODY = 'Cannot process request body.',
  USER_NAME_NOT_AVAILABLE = 'Username is not available.Choose another username.',
  NOT_AUTHORIZED = 'You are not authorized to access this resource.',
  NOT_AUTHENTICATED = 'You are not authenticated to access this resource.',
  INVALID_CREDENTIAL = 'Invalid Email or Password',
  NOT_FOUND = '%s not found.',
  DUPLICATE_DATA = 'Duplicate %s found.',
  TOKEN_EXPIRED = '%s has expired.',
  INVALID_TOKEN = 'Invalid Token',
  INVALID_OTP = 'Invalid OTP.',
  CHILD_EXISTS = '%s is used in %s',
  PERMANENT_DATA = "You can't delete or update this %s.",
  NOT_ALLOWED = 'Your are not allowed to %s',
  NOT_MATCHED = '%s does not match',
  REQUIRED_DATA = '%s is required',
  INVALID_DATA = '%s is invalid',
  INAPPLICABLE = '%s is not applicable in following %s',
  EXPIRED = '%s has expired',
  CUSTOM = '%s',
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface RequestOptions {
  method: string;
  url: string;
  data: any;
  header?: {
    [key: string]: string;
  };
}
