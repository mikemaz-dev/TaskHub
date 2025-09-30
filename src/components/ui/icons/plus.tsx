'use client'

import { useAnimation } from 'framer-motion'
import * as m from 'motion/react-m'
import React, { type HTMLAttributes } from 'react'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'

import { cn } from '@/utils/cn.util'

export interface PlusIconHandle {
	startAnimation: () => void
	stopAnimation: () => void
}

interface PlusIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number
}

const PlusIcon = forwardRef<PlusIconHandle, PlusIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation()
		const isControlledRef = useRef(false)

		useImperativeHandle(ref, () => {
			isControlledRef.current = true

			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal')
			}
		})

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start('animate')
				} else {
					onMouseEnter?.(e)
				}
			},
			[controls, onMouseEnter]
		)

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start('normal')
				} else {
					onMouseLeave?.(e)
				}
			},
			[controls, onMouseLeave]
		)

		return (
			<div
				className={cn(className)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<m.svg
					xmlns='http://www.w3.org/2000/svg'
					width={size}
					height={size}
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					animate={controls}
					transition={{ type: 'spring', stiffness: 100, damping: 15 }}
					variants={{
						normal: {
							rotate: 0
						},
						animate: {
							rotate: 180
						}
					}}
				>
					<path d='M5 12h14' />
					<path d='M12 5v14' />
				</m.svg>
			</div>
		)
	}
)

PlusIcon.displayName = 'PlusIcon'

export { PlusIcon }
