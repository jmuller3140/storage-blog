// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import posthog from 'posthog-js'

export const onClientEntry = () => {
  console.log('onClientEntry fired')  // Debug log
  if (typeof window !== 'undefined' && process.env.GATSBY_POSTHOG_API_KEY) {
    console.log('PostHog init starting')  // Debug log
    posthog.init(
      process.env.GATSBY_POSTHOG_API_KEY,
      {
        api_host: 'https://app.posthog.com',
        loaded: (posthog) => {
          console.log('PostHog loaded')  // Debug log
          if (process.env.NODE_ENV === 'development') posthog.debug()
        },
        capture_pageview: true,
      }
    )
  } else {
    console.log('PostHog not initialized:', {  // Debug log
      hasWindow: typeof window !== 'undefined',
      hasKey: !!process.env.GATSBY_POSTHOG_API_KEY
    })
  }
}
