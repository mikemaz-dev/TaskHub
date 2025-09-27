import { BarChart3, CheckCircle, Users } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header/Header'

import { cn } from '@/utils/cn.util'

export const metadata: Metadata = {
	title: 'Team',
	robots: {
		index: false,
		follow: false
	}
}

export default function Page() {
	return (
		<div className='bg-background min-h-screen px-4 md:px-6 lg:px-8'>
			<Header title='Team' />

			<div className='mt-8 flex gap-6'>
				<div className='bg-card group relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
					<div className='from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200 group-hover:opacity-100' />

					<div className='relative mb-3 flex items-start justify-between'>
						<div>
							<h3 className='text-foreground font-semibold'>Frontend Team</h3>
							<div className='mt-1 flex items-center gap-1'>
								<div className='h-2 w-2 rounded-full bg-green-500' />
								<span className='text-muted-foreground text-xs'>Active</span>
							</div>
						</div>
						<div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg'>
							<Users className='h-5 w-5' />
						</div>
					</div>

					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-3'>
							<div className='flex items-center gap-1'>
								<CheckCircle className='text-muted-foreground h-4 w-4' />
								<span className='text-muted-foreground'>12 tasks</span>
							</div>
							<div className='flex items-center gap-1'>
								<Users className='text-muted-foreground h-4 w-4' />
								<span className='text-muted-foreground'>4 members</span>
							</div>
						</div>
						<div className='flex items-center gap-1'>
							<BarChart3 className='h-4 w-4 text-green-500' />
							<span className='text-xs font-medium text-green-600'>85%</span>
						</div>
					</div>
				</div>

				{/* Backend Team Card */}
				<div
					className={cn(
						'bg-card group relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
					)}
				>
					<div className='from-secondary/5 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200 group-hover:opacity-100' />

					<div className='relative mb-3 flex items-start justify-between'>
						<div>
							<h3 className='text-foreground font-semibold'>Backend Team</h3>
							<div className='mt-1 flex items-center gap-1'>
								<div className='h-2 w-2 rounded-full bg-yellow-500' />
								<span className='text-muted-foreground text-xs'>In Progress</span>
							</div>
						</div>
						<div className='bg-secondary/10 text-secondary flex h-10 w-10 items-center justify-center rounded-lg'>
							<BarChart3 className='h-5 w-5' />
						</div>
					</div>

					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-3'>
							<div className='flex items-center gap-1'>
								<CheckCircle className='text-muted-foreground h-4 w-4' />
								<span className='text-muted-foreground'>8 tasks</span>
							</div>
							<div className='flex items-center gap-1'>
								<Users className='text-muted-foreground h-4 w-4' />
								<span className='text-muted-foreground'>3 members</span>
							</div>
						</div>
						<div className='flex items-center gap-1'>
							<BarChart3 className='h-4 w-4 text-yellow-500' />
							<span className='text-xs font-medium text-yellow-600'>62%</span>
						</div>
					</div>
				</div>

				{/* Design Team Card */}
				<div
					className={cn(
						'bg-card group relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
					)}
				>
					<div className='from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200 group-hover:opacity-100' />

					<div className='relative mb-3 flex items-start justify-between'>
						<div>
							<h3 className='text-foreground font-semibold'>Design Team</h3>
							<div className='mt-1 flex items-center gap-1'>
								<div className='h-2 w-2 rounded-full bg-green-500' />
								<span className='text-muted-foreground text-xs'>Active</span>
							</div>
						</div>
						<div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg'>
							<CheckCircle className='h-5 w-5' />
						</div>
					</div>

					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-3'>
							<div className='flex items-center gap-1'>
								<CheckCircle className='text-muted-foreground h-4 w-4' />
								<span className='text-muted-foreground'>15 tasks</span>
							</div>
							<div className='flex items-center gap-1'>
								<Users className='text-muted-foreground h-4 w-4' />
								<span className='text-muted-foreground'>2 members</span>
							</div>
						</div>
						<div className='flex items-center gap-1'>
							<BarChart3 className='h-4 w-4 text-green-500' />
							<span className='text-xs font-medium text-green-600'>92%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
