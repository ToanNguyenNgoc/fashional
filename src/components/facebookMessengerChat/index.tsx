import React, { useEffect } from 'react';

interface FBInterface {
  init: (params: { xfbml?: boolean; version?: string }) => void;
}

interface CustomWindow extends Window {
  FB?: FBInterface;
  fbAsyncInit?: () => void;
}

declare let window: CustomWindow;

export const FacebookMessengerChat: React.FC<{ attribution: string; pageId: string }> = ({ attribution, pageId }) => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB?.init({
        xfbml: true,
        version: 'v13.0',
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return <div data-attribution={attribution} data-page_id={pageId}></div>;
};

