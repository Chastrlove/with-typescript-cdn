import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'

export const init = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const integrations = []
    if (
      process.env.NEXT_IS_SERVER === 'true' &&
      process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
    ) {
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
              'app:///'
            )
            frame.filename = frame.filename.replace(process.env.BUILD_DIR, '_next')
            return frame
          },
        })
      )
    }

    Sentry.init({
      enabled: true,
      integrations,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
    })
  }
}
