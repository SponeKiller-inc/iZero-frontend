export interface AccessTokenData {
  access_token: string;
  token_type: string;
}

export interface JwtTokenPayload {
  exp: number;
}