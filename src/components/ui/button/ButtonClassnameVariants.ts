import { cn } from '@/utils/cn.util'

export const ButtonClassnameVariants = {
	primary: cn(
		'bg-primary text-white shadow-sm',
		'hover:bg-primary/90 hover:shadow-md hover:scale-[1.02]',
		'active:scale-[0.98] active:shadow-sm',
		'focus:ring-primary/50',
		'disabled:bg-primary/50 disabled:hover:bg-primary/50 disabled:hover:scale-100 disabled:shadow-none',
		'dark:bg-primary dark:hover:bg-primary/90'
	),
	secondary: cn(
		'bg-white border-2 border-gray-200 text-[#272727] shadow-sm',
		'hover:border-primary hover:text-primary hover:shadow-md hover:scale-[1.02]',
		'active:scale-[0.98] active:shadow-sm',
		'focus:ring-primary/50 focus:border-primary',
		'disabled:bg-gray-50 disabled:border-gray-100 disabled:text-gray-400 disabled:hover:scale-100 disabled:shadow-none',
		'dark:bg-neutral-800 dark:border-neutral-600 dark:text-white',
		'dark:hover:border-primary dark:hover:text-primary',
		'dark:disabled:bg-neutral-700 dark:disabled:border-neutral-600 dark:disabled:text-neutral-500'
	)
}
