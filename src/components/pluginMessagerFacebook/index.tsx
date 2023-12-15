import Script from "next/script";
import React from "react";

export function PluginMessagerFacebook() {
  return (
    <div>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>
      <Script
        id="messenger-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `{var chatbox = document.getElementById('fb-customer-chat');
					chatbox.setAttribute("page_id", "174304060167302");
					chatbox.setAttribute("attribution", "biz_inbox");}`,
        }}
      ></Script>
      <Script
        id="messenger-sdk"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `{window.fbAsyncInit = function() {
						FB.init({
							xfbml            : true,
							version          : 'v18.0'
						});
					};
		
					(function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(id)) return;
						js = d.createElement(s); js.id = id;
						js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));}`,
        }}
      ></Script>
    </div>
  );
}
