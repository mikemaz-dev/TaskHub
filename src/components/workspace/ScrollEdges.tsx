'use client'

import { useEffect } from 'react'

const selector = '.th-hours-scroll, .th-message-history, .th-contacts, .th-today-section, .th-task-list, .th-upcoming > div, .th-activity, .th-option-list, .th-notification-list, .th-conversation-projects > div'

// Observe content and container changes, including asynchronously loaded lists.
export function ScrollEdges() {
	useEffect(() => {
		const watched = new Set<HTMLElement>()
		let frame = 0
		function update() {
			frame = 0
			document.querySelectorAll<HTMLElement>(selector).forEach(node => {
				if (!watched.has(node)) {
					watched.add(node)
					node.addEventListener('scroll', schedule, { passive: true })
					resize.observe(node)
				}
				const top = node.scrollTop > 2
				const bottom = node.scrollHeight - node.clientHeight - node.scrollTop > 2
				node.dataset.scrollEdges = top ? (bottom ? 'both' : 'top') : (bottom ? 'bottom' : 'none')
			})
			watched.forEach(node => {
				if (!node.isConnected) {
					resize.unobserve(node)
					node.removeEventListener('scroll', schedule)
					watched.delete(node)
				}
			})
		}
		function schedule() { if (!frame) frame = requestAnimationFrame(update) }
		const resize = new ResizeObserver(schedule)
		const mutation = new MutationObserver(schedule)
		mutation.observe(document.body, { childList: true, subtree: true, characterData: true })
		schedule()
		return () => {
			cancelAnimationFrame(frame)
			resize.disconnect()
			mutation.disconnect()
			watched.forEach(node => node.removeEventListener('scroll', schedule))
		}
	}, [])
	return null
}
