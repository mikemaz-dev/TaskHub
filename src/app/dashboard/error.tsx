'use client'
export default function WorkspaceError({ reset }: { reset: () => void }) {
	return (
		<div className='th-page'>
			<section className='th-panel th-card th-empty'>
				<h1>We couldn’t load your workspace.</h1>
				<p>Please try again. If this continues, your workspace connection may need attention.</p>
				<button className='th-button' onClick={reset}>
					Try again
				</button>
			</section>
		</div>
	)
}
