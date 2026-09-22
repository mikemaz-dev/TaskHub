'use client'
import '@/styles/about-and-demo.css'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { FlaskConical } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { localNow } from '@/utils/task-schedule'

export function DemoWorkspace({ userId }: { userId: string }) {
 const router = useRouter()
 const cache = useQueryClient()
 const [busy, setBusy] = useState(false)
 const [confirm, setConfirm] = useState(false)
 const [message, setMessage] = useState('')
 const demo = useQuery({
  queryKey: ['demo-workspace', userId],
  queryFn: async () => {
   const { data, error } = await createClient().from('taskhub_demo_workspace').select('owner_id').eq('owner_id', userId).maybeSingle()
   if (error) throw error
   return !!data
  }, retry: false
 })
 async function run(action: 'add' | 'remove') {
  setBusy(true); setMessage('')
  try {
   const { error } = await createClient().rpc('taskhub_demo_data', { action_input: action, day_input: localNow().date })
   if (error) throw error
   await cache.invalidateQueries()
   router.refresh()
   setConfirm(false)
   setMessage(action === 'add' ? 'Your sample workspace is ready. Open Projects to explore.' : 'Sample data removed. Projects with your own tasks or collaborators were kept.')
  } catch {
   setMessage('Could not update sample data. Please try again or contact the workspace owner.')
  } finally { setBusy(false) }
 }
 return <section className='th-panel th-card th-demo-card'>
  <FlaskConical size={24} aria-hidden />
  <h2>Explore with sample data</h2>
  <p>Try TaskHub with 3 personal projects, 12 tasks and 36 checklist steps. Explore the calendar, progress reports and archive.</p>
  <p className='th-small th-muted'>Projects are named “Demo”. Your existing work stays in place. Chat, invitations and live status need a real teammate.</p>
  {demo.isError ? <p role='alert'>Sample data is not available yet. The workspace owner needs to apply the demo database migration.</p> :
   <div className='th-demo-actions'>
    {!demo.data ? <button className='th-button' disabled={busy || demo.isPending} aria-busy={busy} onClick={() => run('add')}>Fill with sample data</button> :
     <button className='th-button th-button-subtle' disabled={busy} onClick={() => setConfirm(true)}>Remove sample data</button>}
    <Link className='th-text-link' href='/dashboard/projects'>Go to projects</Link>
   </div>}
  {confirm && <div className='th-demo-confirm'>
   <p>Remove the sample tasks, including your edits to them? Your own tasks are kept. Demo projects with new tasks, invitations or teammates are also kept.</p>
   <div className='th-demo-actions'>
    <button className='th-button' disabled={busy} aria-busy={busy} onClick={() => run('remove')}>{busy ? 'Removing…' : 'Remove demo data'}</button>
    <button className='th-text-link' disabled={busy} onClick={() => setConfirm(false)}>Keep it</button>
   </div>
  </div>}
  {message && <p role='status'>{message}</p>}
 </section>
}
