export {};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (opts: {
            client_id: string;
            callback: (resp: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement | null,
            opts?: { theme?: string; size?: string; shape?: string }
          ) => void;
        };
      };
    };
  }
}