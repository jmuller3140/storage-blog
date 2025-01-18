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
  if (typeof window !== 'undefined') {
    posthog.init(
      process.env.GATSBY_POSTHOG_API_KEY,
      {
        api_host: 'https://app.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        },
      }
    )
  }
}
