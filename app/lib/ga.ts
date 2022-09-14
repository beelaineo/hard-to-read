// @ts-nocheck
// log the pageview with their URL
export const pageview = (url) => {
  if (typeof window?.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
  if (typeof window?.gtag !== 'undefined') {
    window.gtag('event', action, params)
  }
}
