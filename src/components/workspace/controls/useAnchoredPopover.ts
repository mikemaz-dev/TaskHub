import { type RefObject, useLayoutEffect } from 'react'

/** Top-layer panels escape card clipping and flip above controls near the viewport edge. */
export function useAnchoredPopover(
	open: boolean,
	anchor: RefObject<HTMLElement | null>,
	panel: RefObject<HTMLDivElement | null>,
	matchWidth = false
) {
	useLayoutEffect(() => {
		const el = panel.current
		if (!open || !el || !anchor.current) return
		el.showPopover()
		const position = () => {
			if (!anchor.current) return
			const rect = anchor.current.getBoundingClientRect()
			if (matchWidth) el.style.setProperty('width', `${rect.width}px`)
			el.style.setProperty('max-height', `${Math.max(80, window.innerHeight - 24)}px`)
			const { offsetWidth: width, offsetHeight: height } = el
			el.style.setProperty(
				'left',
				`${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`
			)
			const below = rect.bottom + 8
			const top = below + height <= window.innerHeight - 12 ? below : rect.top - height - 8
			el.style.setProperty(
				'top',
				`${Math.max(12, Math.min(top, window.innerHeight - height - 12))}px`
			)
		}
		position()
		const observer = new ResizeObserver(position)
		observer.observe(el)
		window.addEventListener('resize', position)
		window.addEventListener('scroll', position, true)
		return () => {
			observer.disconnect()
			window.removeEventListener('resize', position)
			window.removeEventListener('scroll', position, true)
		}
	}, [open, anchor, panel, matchWidth])
}
