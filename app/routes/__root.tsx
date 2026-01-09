import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import * as React from 'react'
import Header from '../components/Header'
import SmoothScroll from '../components/motion/SmoothScroll'
import globalsCss from '../styles/globals.css?url'

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SmoothScroll>
          <Header />
          <main>
            {children}
          </main>
        </SmoothScroll>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Portfolio | Editorial & Precision' },
      { name: 'description', content: 'Cinematic portfolio focused on modern editorial design and high-performance motion.' },
    ],
    links: [
      { rel: 'stylesheet', href: globalsCss },
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
})
