import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  if (!GA_ID) return null
  return (
    <>
      {/* Loads gtag.js after hydration */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* Bootstraps dataLayer & initial pageview */}
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', {analytics_storage: 'denied'});
        gtag('config', '${GA_ID}', { page_path: window.location.pathname });
      `}</Script>
    </>
  )
}

