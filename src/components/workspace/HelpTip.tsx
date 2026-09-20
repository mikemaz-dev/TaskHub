'use client'

import { CircleHelp } from 'lucide-react'
import { useId, useRef, useState } from 'react'

import { useAnchoredPopover } from './controls/useAnchoredPopover'
import { type HelpTopic, help } from '@/data/help'

export function HelpTip({ topic }: { topic: HelpTopic }) {
	const [open, setOpen] = useState(false)
	const trigger = useRef<HTMLButtonElement>(null)
	const panel = useRef<HTMLDivElement>(null)
	const id = useId()
	useAnchoredPopover(open, trigger, panel)
	return (
		<span
			className='th-help'
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				ref={trigger}
				type='button'
				aria-label={help[topic].title}
				aria-describedby={open ? id : undefined}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				onClick={() => setOpen(true)}
				onKeyDown={event => {
					if (event.key === 'Escape') {
						event.stopPropagation()
						setOpen(false)
					}
				}}
			>
				<CircleHelp size={14} />
			</button>
			{open && (
				<div
					id={id}
					ref={panel}
					popover='auto'
					role='tooltip'
					className='th-help-panel'
					onToggle={event => {
						if ((event.nativeEvent as ToggleEvent).newState === 'closed') setOpen(false)
					}}
				>
					<strong>{help[topic].title}</strong>
					<p>{help[topic].text}</p>
				</div>
			)}
		</span>
	)
}
