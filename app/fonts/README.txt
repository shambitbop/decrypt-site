Place these 4 self-hosted Clash Display files here (from Fontshare, license permitting):
  ClashDisplay-Regular.woff2
  ClashDisplay-Medium.woff2
  ClashDisplay-Semibold.woff2
  ClashDisplay-Bold.woff2

These were referenced in the original project's app/fonts.ts but were not included in
the files provided to Claude, so they could not be carried over. The build will fail
on `next build` until these 4 files exist at this path. Download from
https://www.fontshare.com/fonts/clash-display
