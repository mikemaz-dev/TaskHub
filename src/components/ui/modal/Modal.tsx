'use client'

import { CircleX } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface IModal {
	children: ReactNode
	onClose: () => void
	isOpen?: boolean
}

export function Modal({ children, onClose, isOpen = true }: IModal) {
	const [shouldRender, setShouldRender] = useState(isOpen)

	const handleClose = useCallback(() => {
		setShouldRender(false)
		setTimeout(onClose, 300)
	}, [onClose])

	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose()
			}
		}

		if (isOpen) {
			setShouldRender(true)
		} else {
			setShouldRender(false)
		}

		const originalOverflow = document.body.style.overflow
		document.body.style.overflow = shouldRender ? 'hidden' : 'unset'

		document.addEventListener('keydown', handleEscKey)
		document.body.style.overflow = shouldRender ? 'hidden' : 'unset'

		return () => {
			document.removeEventListener('keydown', handleEscKey)
			document.body.style.overflow = originalOverflow
		}
	}, [isOpen, shouldRender, handleClose])

	if (!isOpen) return null

	return createPortal(
		<AnimatePresence
			onExitComplete={() => {
				document.body.style.overflow = 'unset'
			}}
		>
			{shouldRender && (
				<m.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/80 dark:bg-secondary/30'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={handleClose}
				>
					<m.div
						className='relative w-[90%] max-w-lg rounded-3xl bg-white p-6 shadow-lg dark:bg-secondary'
						initial={{ opacity: 0, scale: 0.95, y: -20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -20 }}
						transition={{
							type: 'spring',
							stiffness: 400,
							damping: 25
						}}
						onClick={e => e.stopPropagation()}
						role='dialog'
						aria-modal='true'
					>
						<button
							onClick={handleClose}
							className='group absolute top-6 right-6 cursor-pointer'
							aria-label='Close modal'
						>
							<CircleX
								size={24}
								className='text-gray-400 transition-all duration-300 hover:scale-110 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400'
							/>
						</button>
						{children}
					</m.div>
				</m.div>
			)}
		</AnimatePresence>,
		document.body
	)
}
