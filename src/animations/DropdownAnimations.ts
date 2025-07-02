export const dropdownAnimations = {
	initial: {
		opacity: 0,
		scale: 0.95,
		y: -10,
		rotateX: -15
	},
	animate: {
		opacity: 1,
		scale: 1,
		y: 0,
		rotateX: 0
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: -10,
		rotateX: -15
	},
	transition: {
		type: 'spring' as const,
		stiffness: 400,
		damping: 25
	},
	style: {
		transformOrigin: 'top center' as const
	}
}

export const arrowAnimations = {
	transition: {
		type: 'spring' as const,
		stiffness: 300,
		damping: 20
	}
}
