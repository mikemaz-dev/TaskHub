'use client'

import { X } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { type ReactNode, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface IModal {
	children: ReactNode
	onClose: () => void
	isOpen: boolean
}

export function Modal({ children, onClose, isOpen }: IModal) {
	const panelRef = useRef<HTMLDivElement>(null)
	const closeRef = useRef(onClose)
	useEffect(() => {
		closeRef.current = onClose
	}, [onClose])
	const handleClose = useCallback(() => {
		closeRef.current()
	}, [])

	useEffect(() => {
		if (!isOpen) return

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose()
			if (e.key === 'Tab') {
				const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
					'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex="0"]'
				)
				if (!nodes?.length) return
				const first = nodes[0],
					last = nodes[nodes.length - 1]
				if (
					e.shiftKey &&
					(document.activeElement === first || document.activeElement === panelRef.current)
				) {
					e.preventDefault()
					last.focus()
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault()
					first.focus()
				}
			}
		}

		const previousFocus = document.activeElement as HTMLElement | null
		const frame = requestAnimationFrame(() => panelRef.current?.focus())
		const originalOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		document.addEventListener('keydown', handleEsc)

		return () => {
			document.removeEventListener('keydown', handleEsc)
			document.body.style.overflow = originalOverflow
			cancelAnimationFrame(frame)
			previousFocus?.focus()
		}
	}, [isOpen, handleClose])

	if (typeof document === 'undefined') return null
	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<m.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={handleClose}
				>
					<m.div
						ref={panelRef}
						tabIndex={-1}
						aria-label='Task dialog'
						style={{ maxHeight: '90dvh', overflowY: 'auto' }}
						className='bg-background/90 relative w-[90%] max-w-md rounded-2xl p-5 shadow-xl dark:bg-neutral-900'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						onClick={e => e.stopPropagation()}
						role='dialog'
						aria-modal='true'
					>
						<button
							onClick={handleClose}
							aria-label='Close modal'
							className='absolute top-4 right-4 text-gray-400 transition-colors hover:text-red-500'
						>
							<X size={22} />
						</button>
						{children}
					</m.div>
				</m.div>
			)}
		</AnimatePresence>,
		document.body
	)
}
