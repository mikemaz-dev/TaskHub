import type { Metadata } from 'next'
import Link from 'next/link'
import { FolderOpen, Home } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import '@/styles/not-found.css'

export const metadata: Metadata = { title: 'Page not found', ...NO_INDEX_PAGE }

export default function NotFound() {
 return <div className='th-not-found'>
  <section className='th-panel th-not-found-card' aria-labelledby='not-found-title'>
   <Logo />
   <p className='th-not-found-code' aria-hidden='true'>404</p>
   <h1 id='not-found-title'>This page is off the map.</h1>
   <p>The link may have changed, or this page no longer exists. Your workspace is a good place to start again.</p>
   <div className='th-not-found-actions'>
    <Link href='/dashboard/projects' className='th-button'><FolderOpen size={17} />Go to projects</Link>
    <Link href='/' className='th-button th-button-subtle'><Home size={17} />Back to home</Link>
   </div>
  </section>
 </div>
}
