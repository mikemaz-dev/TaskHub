import { ArrowUpRight, CalendarDays, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/ui/Logo'

import { HomeArtwork } from './HomeArtwork'

export function HomeSection() {
	return (
		<div className='th-landing'>
			<header className='th-landing-nav'>
				<Logo />
				<nav aria-label='Website'>
					<a href='#workspace'>The workspace</a>
					<a href='https://github.com/mikemaz-dev/TaskHub' target='_blank' rel='noreferrer'>
						GitHub <ArrowUpRight size={14} />
					</a>
					<Link className='th-button th-button-subtle' href='/sign-in'>
						Sign in
					</Link>
				</nav>
			</header>
			<section className='th-hero'>
				<div className='th-hero-copy'>
					<p className='th-eyebrow'>
						<span />
						Space to do your best work
					</p>
					<h1>
						Bring your work
						<br />
						into focus.
					</h1>
					<p>
						Projects, people, and the next thing to do.
						<br />
						One thoughtful workspace to move it all forward.
					</p>
					<div className='th-hero-actions'>
						<Link href='/sign-in' className='th-button'>
							Create your workspace <ArrowUpRight size={18} />
						</Link>
						<a href='#workspace' className='th-text-link'>
							Take a closer look
						</a>
					</div>
					<p className='th-small th-muted'>Free to get started. Built in the open.</p>
				</div>
				<HomeArtwork />
			</section>
			<section id='workspace' className='th-features'>
				<div className='th-features-intro'>
					<h2>
						Less scattered.
						<br />
						More connected.
					</h2>
					<p className='th-muted'>A calm home for everything your team is working on.</p>
				</div>
				{[
					{
						Icon: CheckCircle2,
						title: 'Know what comes next',
						text: 'Turn projects into clear tasks, set due dates, and follow your progress.'
					},
					{
						Icon: MessageSquare,
						title: 'Keep everyone in the loop',
						text: 'Bring your team together around shared projects and conversations.'
					},
					{
						Icon: CalendarDays,
						title: 'See the bigger picture',
						text: 'Connect your daily schedule with the work that moves your projects forward.'
					}
				].map(({ Icon, title, text }) => (
					<article key={title}>
						<Icon size={24} />
						<h3>{title}</h3>
						<p>{text}</p>
					</article>
				))}
			</section>
			<section className='th-landing-cta th-panel'>
				<div>
					<ShieldCheck size={26} />
					<h2>Your next project starts here.</h2>
					<p>Make a workspace of your own.</p>
				</div>
				<Link href='/sign-in' className='th-button'>
					Get started <ArrowUpRight size={18} />
				</Link>
			</section>
			<footer className='th-footer'>
				<Logo />
				<span>
					Designed and built by{' '}
					<a href='https://mikemaz-portfolio.vercel.app/ru' target='_blank' rel='noreferrer'>
						Mike Mazurkevich
					</a>
				</span>
				<a href='https://github.com/mikemaz-dev/TaskHub' target='_blank' rel='noreferrer'>
					Explore the source <ArrowUpRight size={14} />
				</a>
			</footer>
		</div>
	)
}
