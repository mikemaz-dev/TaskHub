'use client'

import { LogIn, Play } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { NavItem } from '@/components/sections/home/NavItem'
import { Button, Logo } from '@/components/ui'

import { Pages } from '@/config/public-page.config'

import { HEADER_DATA } from '@/data/header/header.data'

export function HomeSection() {
	const router = useRouter()

	return (
		<div className='mx-auto flex h-full max-w-[1500px] flex-col gap-15'>
			<header className='flex w-full justify-between pt-10'>
				<div className='flex items-center gap-15'>
					<Logo />
					<ul className='flex items-center gap-5'>
						{HEADER_DATA.map(data => (
							<NavItem
								key={data.title}
								title={data.title}
							/>
						))}
					</ul>
				</div>
				<Button
					className='text-lg font-medium'
					size='lg'
					onClick={() => router.push(Pages.LOGIN)}
				>
					Sign in
					<LogIn />
				</Button>
			</header>

			<div className='flex h-full items-center justify-between px-6'>
				<div className='flex flex-col gap-8'>
					<h1 className='max-w-2xl text-8xl leading-28 font-extrabold text-neutral-700'>
						Transform your tasks into <span className='text-primary'>success.</span>
					</h1>
					<p className='max-w-md text-lg font-semibold text-neutral-500'>
						Unlock your full productivity potential with our intuitive task management system
					</p>
					<div className='flex items-center gap-6'>
						<Button
							size='lg'
							className='max-w-max rounded-full px-10 py-8 text-lg font-medium'
							onClick={() => router.push(Pages.LOGIN)}
						>
							Get started
						</Button>
						<button className='group flex cursor-pointer items-center gap-3'>
							<div className='bg-primary/30 flex items-center justify-center rounded-full p-2'>
								<Play
									size={18}
									fill='#725cee'
									color='#725cee'
								/>
							</div>
							<span className='text-lg transition-all duration-300 group-hover:font-semibold'>
								Watch how
							</span>
						</button>
					</div>
				</div>
				<Image
					src='/images/manager.jpg'
					alt='Manager image'
					width={568}
					height={853}
					className='rounded-lg'
				/>
			</div>
		</div>
	)
}
