import Link from 'next/link'
import { ArrowUpRight, Layers, ShieldCheck, Code2 } from 'lucide-react'
import { Header } from '@/components/layout/header/Header'
import '@/styles/about-and-demo.css'

export const metadata = { title: 'About TaskHub' }
const changes = [
 ['A workspace that feels connected', 'A redesigned dashboard, consistent controls, light and dark themes, and an accent color that follows you across the app.'],
 ['Projects with a real lifecycle', 'Invitations, clear owner/admin/member permissions, completion, archiving and restoration. Each project has its own context for conversations.'],
 ['A clearer picture of the day', 'Day, week and month planning, a current-time marker, task checklists and reports built from your actual work. Export a CSV or a print-ready report.'],
 ['Room for the team', 'Private conversations, general discussions, unread counts, activity notifications and working-hour preferences.'],
 ['Details beyond the dashboard', 'Branded sign-in, profile setup, useful empty states, keyboard shortcuts, social previews and documentation.']
]
const architecture = [
 ['Interface', 'Next.js App Router · React · TypeScript', 'Routes compose small feature components. Server-rendered pages load the initial workspace; client components handle forms and interactive controls.'],
 ['Data flow', 'Server services · TanStack Query', 'Server services read account-scoped data. Client queries keep interactive views current; Realtime subscriptions and polling update conversations and counters.'],
 ['Identity & permissions', 'Supabase Auth · PostgreSQL RLS', 'Magic links establish the session. Database policies scope rows to the signed-in user and project membership; role-aware SQL functions handle sensitive actions.'],
 ['Collaboration', 'PostgreSQL events · Supabase Realtime', 'Database events generate activity notifications. Private channels carry presence and typing signals, without broadcasting draft message text.'],
 ['Presentation', 'CSS tokens · Focused style files', 'Shared tokens define surfaces, spacing and accents. Styles are split by responsibility; reusable controls keep forms and navigation consistent.'],
 ['Quality', 'TypeScript · ESLint · Bun tests', 'Pure-logic tests cover analytics and validation; SQL fixtures cover permission boundaries. A production build checks route compilation. Real multi-user flows still need manual review.']
]
export default function AboutPage() {
 return <div className='th-page th-about'>
  <Header title='About TaskHub' />
  <section className='th-panel th-about-intro'>
   <span className='th-about-mark'><Layers size={28} /></span>
   <p className='th-muted'>Built by Mikhail Mazurkevich</p>
   <h1>A project that kept growing.</h1>
   <p>TaskHub began during a development marathon. After the marathon, I kept working on it: rethinking the interface, connecting the features and making the code easier to maintain.</p>
   <p>The result is a personal project about the whole product experience — from your first sign-in to finishing a project with a team.</p>
   <div className='th-about-links'>
    <Link href='/dashboard/account' className='th-button'>Try sample data in Settings</Link>
    <a href='https://github.com/mikemaz-dev/TaskHub' target='_blank' rel='noreferrer' className='th-text-link'>Explore the source <ArrowUpRight size={15} /></a>
   </div>
  </section>
  <section className='th-about-section'>
   <h2>Beyond the marathon version</h2>
   <p className='th-muted'>The original project was the starting point. This update develops the experience around it.</p>
   <div className='th-about-changes'>{changes.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
  </section>
  <section className='th-about-section'>
   <h2><Code2 size={23} /> How the pieces fit</h2>
   <p className='th-muted'>Page → service or query → Supabase → database permissions → your workspace.</p>
   <div className='th-about-architecture'>{architecture.map(([title, stack, body]) => <article className='th-panel' key={title}><h3>{title}</h3><p className='th-about-stack'>{stack}</p><p>{body}</p></article>)}</div>
  </section>
  <section className='th-panel th-about-note'>
   <ShieldCheck size={24} /><div><h2>Built to explore, still evolving</h2>
   <p>Sample data belongs to your account and is removable. It does not create fake people or conversations. Invite a real teammate to explore collaboration.</p>
   <p>Working hours are checked in the task form; the calendar still shows the full day. Email delivery and live status depend on the Supabase configuration. The repository documents these boundaries and the remaining checks.</p></div>
  </section>
 </div>
}
