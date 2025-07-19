import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  if (!GA_ID) return null
  return (
    <>
      <Script async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="gtag-init">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', {
          ad_storage:        'denied',
          analytics_storage: 'denied',
          ad_user_data:      'denied',
          ad_personalization:'denied'
        });
        gtag('config', '${GA_ID}');
      `}</Script>
    </>
  )
}

