import React, { useEffect } from 'react';

import { initGoogleAuth, renderGoogleButton } from '@/services/googleAuth';
import { useLoadGoogleScript } from '@/hooks/useLoadGoogleScript';
import { Props } from '@/types/google';


export const GoogleButton: React.FC<Props> = ({ 
    onLogin, 
    onRegister, 
    mode = 'login' 
}) => {
    const loaded = useLoadGoogleScript();

  useEffect(() => {
    // Wait until google script is loaded 
    console.log(loaded)
    if (!loaded) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const callback = (token: string) => {
      if (mode === 'login' && onLogin) onLogin(token);
      else if (mode === 'register' && onRegister) onRegister(token);
    };

    initGoogleAuth({ clientId, onSuccess: callback });
    renderGoogleButton(`google-login-button-${mode}`);
  }, [loaded, onLogin, onRegister, mode]);

  return <div id={`google-login-button-${mode}`} />;
};