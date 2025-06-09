import { InitOptions, CredentialResponse } from "@/types/google";


export function initGoogleAuth(options: InitOptions) {
  if (!window.google) {
    console.error("Google API not loaded");
    return;
  }

  window.google.accounts.id.initialize({
    client_id: options.clientId,
    callback: (response: CredentialResponse) => {
      const token = response.credential;
      options.onSuccess(token);
    },
  });
}

export function renderGoogleButton(elementId: string) {
  console.log("jsem tady")
  if (!window.google) return;
  window.google.accounts.id.renderButton(
    document.getElementById(elementId),
    { theme: "outline", size: "large"}
  );
}
