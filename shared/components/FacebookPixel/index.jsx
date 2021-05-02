import React from 'react'
// import { useRouter } from 'next/router'
// import * as fbq from './fpixel'
import { FB_PIXEL_ID } from '../../constants'

// const handleRouteChange = () => {
//   fbq.pageview()
// }

const FacebookPixel = ({ children }) => {
  // const router = useRouter()

  // useEffect(() => {
  //   // This pageview only trigger first time (it is important for Pixel to have real information)
  //   fbq.pageview()

  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  // return children
  // return ''
  
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${FB_PIXEL_ID});
                fbq('track', 'PageView');
                
              `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}

export default FacebookPixel
