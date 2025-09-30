'use client'

import { X } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { type ReactNode, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface IModal {
	children: ReactNode
	onClose: () => void
	isOpen: boolean
}

export function Modal({ children, onClose, isOpen }: IModal) {
	const handleClose = useCallback(() => {
		onClose()
	}, [onClose])

	useEffect(() => {
		if (!isOpen) return

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose()
		}

		const originalOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		document.addEventListener('keydown', handleEsc)

		return () => {
			document.removeEventListener('keydown', handleEsc)
			document.body.style.overflow = originalOverflow
		}
	}, [isOpen, handleClose])

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
						className='relative w-[90%] max-w-md rounded-2xl bg-background/90 p-5 shadow-xl dark:bg-neutral-900'
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
