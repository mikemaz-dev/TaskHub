import { TIMELINE_SLOTS } from '@/data/timeline/timeline-slots.data'

export function TodayTasksTimeline() {
	return (
		<div className='flex items-center justify-between px-8'>
			{TIMELINE_SLOTS.map(slot => (
				<div
					key={slot.hour}
					className='flex flex-col items-center gap-2'
				>
					<span className='opacity-60 text-sm font-semibold'>{slot.time}</span>
					<div className='w-px h-80 bg-blue-400' />
				</div>
			))}
		</div>
	)
}
