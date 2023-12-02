import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex justify-center items-center h-screen'>{children}</body>
    </html>
  )
}
