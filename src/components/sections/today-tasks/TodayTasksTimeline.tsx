import { TIMELINE_SLOTS } from '@/data/timeline/timeline-slots.data'

export function TodayTasksTimeline() {
	return (
		<div className='flex items-center justify-between px-8'>
			{TIMELINE_SLOTS.map(slot => (
				<div
					key={slot.hour}
					className='flex flex-col items-center gap-2'
				>
					<span className='text-sm font-semibold opacity-60'>{slot.time}</span>
					<div className='h-80 w-px bg-blue-400' />
				</div>
			))}
		</div>
	)
}
