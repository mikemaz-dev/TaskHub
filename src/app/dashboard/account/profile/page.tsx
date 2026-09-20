import { CheckCircle2, Clock3, Folder, Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'

import { getAvatarUrl } from '@/utils/getAvatarUrl'

import { summarizeTasks } from '@/lib/analytics/metrics'
import { getServerProfile } from '@/services/profile/profile-server.service'
import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerTasks } from '@/services/tasks/task-server.service'

export const metadata = { title: 'Your profile' }
export default async function Page() {
	const [profile, projects, tasks] = await Promise.all([
		getServerProfile(),
		getServerProjects(),
		getServerTasks()
	])
	if (projects.error || tasks.error) throw new Error('Could not load profile metrics.')
	const ownTasks = (tasks.data ?? []).filter(
		t => t.owner_id === profile.id || t.task_participants.some(p => p.profile?.id === profile.id)
	)
	const stats = summarizeTasks(ownTasks, new Date().toISOString().slice(0, 10))
	return (
		<div className='th-page'>
			<Header title='Account profile' />
			<section className='th-panel th-profile-banner'>
				<div className='th-profile-cover'>
					<div className='th-cover-orbit' />
				</div>
				<div className='th-profile-body'>
					<div className='th-profile-heading'>
						{profile.avatar_path ? (
							<Image
								src={getAvatarUrl(profile.avatar_path)}
								width={80}
								height={80}
								alt={profile.name || 'Your profile'}
								className='th-profile-image'
								unoptimized
							/>
						) : (
							<span className='th-avatar th-avatar-large'>
								{(profile.name || '?').slice(0, 2).toUpperCase()}
							</span>
						)}
						<div>
							<h2>{profile.name}</h2>
							<p>@{profile.nick}</p>
							{profile.profession && <span className='th-pill'>{profile.profession}</span>}
						</div>
						<Link href='/dashboard/account' className='th-button th-button-subtle'>
							<Pencil size={15} />
							Edit profile
						</Link>
					</div>
					<p className='th-profile-bio'>
						{profile.description ||
							'Add a short introduction to tell your teammates a little about yourself.'}
					</p>
				</div>
			</section>
			<div className='th-profile-grid'>
				<section className='th-panel th-card'>
					<h2>Metrics hub</h2>
					<div className='th-profile-metric'>
						<Folder size={17} />
						<span>Projects</span>
						<strong>{projects.data?.length ?? 0}</strong>
					</div>
					<div className='th-profile-metric'>
						<CheckCircle2 size={17} />
						<span>Tasks completed</span>
						<strong>{stats.completed}</strong>
					</div>
					<div className='th-profile-metric'>
						<Clock3 size={17} />
						<span>Planned hours</span>
						<strong>{(stats.minutes / 60).toFixed(1)}h</strong>
					</div>
				</section>
				<section className='th-panel th-card'>
					<div className='th-section-title'>
						<h2>Your projects</h2>
						<Link href='/dashboard/projects' className='th-small th-muted'>
							View all
						</Link>
					</div>
					{projects.data?.slice(0, 5).map(p => (
						<Link
							key={p.id}
							className='th-profile-project'
							href={`/dashboard/projects/${p.slug || p.id}`}
						>
							<span className='th-avatar' style={{ color: p.color || 'var(--primary)' }}>
								<Folder size={18} />
							</span>
							<div>
								<strong>{p.name}</strong>
								<small>{p.deadline ? `Due ${p.deadline}` : 'Make progress at your own pace'}</small>
							</div>
						</Link>
					))}
					{!projects.data?.length && (
						<div className='th-empty'>Your next project belongs here.</div>
					)}
				</section>
			</div>
		</div>
	)
}
