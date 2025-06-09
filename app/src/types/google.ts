// Google Auth
export interface GoogleCallback {
  (token: string): void;
}

export interface InitOptions {
  clientId: string;
  onSuccess: GoogleCallback;
}

export interface CredentialResponse {
  credential: string;
}

export interface Props {
  onLogin?: (token: string) => void;
  onRegister?: (token: string) => void;
  mode?: "login" | "register";
}
