# Phossil website replacement — September 10, 2026

Replaces the former demo with the reviewed one-page marketing site and illustrative Messaging, Flow Card, Explorer, and Workspace experiences. Research and source records are included. Product examples are fictional; chat is simulated. Contact prepares a draft in the visitor's email app, not a server submission.

## Hosting and rollback

- Repository: Phossil-io/phossil-demo-website (GitHub repository ID 1225262450, formerly sharksfreakmeout/phossil-demo).
- Existing Vercel project: phossil-demo; keep phossil.io and www.phossil.io domain configuration unchanged.
- Previous production commit: c2ccb982df88158fda101176db9b58e2dcbbc428.
- Previous deployment: dpl_44WEgaJ4MPxW5iZVEm6y1fNp876m.
- If the home page, interactive concept, assets, or contact links fail after publishing, roll back to the prior deployment or revert the release commit. Do not alter DNS.

## Retired endpoints

The former /api/generate, /api/chat and /api/feedback now return HTTP 410. They no longer call model providers or write feedback to Notion. No stored data or environment secrets were deleted. Historical implementation remains recoverable in Git.

## Verification

Build and typecheck must pass before release. Check new and modified runtime files with ESLint; pre-existing lint findings in unused legacy demo components are not represented as a passing full-repository lint run. Confirm production assets, research HTML/PDF and source records are served, and the three retired endpoints return 410.
