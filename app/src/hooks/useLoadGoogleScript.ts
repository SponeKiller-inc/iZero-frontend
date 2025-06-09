import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useLoadGoogleScript(): boolean {
  const { i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("google-identity-script") as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-identity-script";
      script.src = `https://accounts.google.com/gsi/client?hl=${i18n.language}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      existingScript.src = `https://accounts.google.com/gsi/client?hl=${i18n.language}`;
    }

    let timeoutId: number;
    
    const waitGoogle = () => {
      if (
        window.google &&
        window.google.accounts &&
        typeof window.google.accounts.id === "object"
      ) {
        setLoaded(true);
      } else {
        timeoutId = window.setTimeout(waitGoogle, 50);
      }
    };

    // Wait until google is initialized
    waitGoogle();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [i18n.language]);
  
  return loaded;
}