
export interface ApiErrorResponse{
  success: boolean,
  error: string,
}

export interface ApiListResponse<T>{
  success: boolean;
  data: T[];
}

export interface ApiDetailsResponse<T>{
  success: boolean;
  data: {
    recipe: T,
    otherRecipes: T[]
  };
}

export interface ApiSuccessResponse{
  success: boolean;
  message: string;
}

export interface ApiCreateResponse<T> {
  success: boolean;
  data: T
}

export interface ApiUpdateResponse<T> {
  success: boolean;
  data: T
}

export interface ApiDeleteResponse {
  success: boolean;
  message: string;
}