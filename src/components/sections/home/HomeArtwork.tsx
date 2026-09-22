import { CalendarDays, CheckCircle2, GitBranch, MessageSquare } from 'lucide-react'

export function HomeArtwork() {
	return (
		<div className='th-hero-art' aria-label='Plan, collaborate, and complete your work'>
			<div className='th-orbit' />
			<div className='th-hero-note th-panel'>
				<span className='th-icon-tile'>
					<CalendarDays size={21} />
				</span>
				<div>
					<strong>A clear plan for today</strong>
					<p>Make room for what matters.</p>
				</div>
			</div>
			<div className='th-hero-project th-panel'>
				<div className='th-section-title'>
					<span className='th-icon-tile'>
						<GitBranch size={23} />
					</span>
					<span className='th-pill'>Your next big idea</span>
				</div>
				<h2>
					From a first step
					<br />
					to a finished project.
				</h2>
				<div className='th-workflow'>
					<span>Plan</span>
					<i />
					<span>Build</span>
					<i />
					<span>Ship</span>
				</div>
				<div className='th-hero-project-footer'>
					<CheckCircle2 size={18} />
					<span>Everything has its place.</span>
				</div>
			</div>
			<div className='th-hero-note th-panel th-hero-note-last'>
				<span className='th-icon-tile'>
					<MessageSquare size={21} />
				</span>
				<div>
					<strong>Good work happens together</strong>
					<p>Keep the conversation close.</p>
				</div>
			</div>
		</div>
	)
}
