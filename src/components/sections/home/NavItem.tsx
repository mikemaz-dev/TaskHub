export function NavItem({ title }: { title: string }) {
	return (
		<li className='hover:bg-primary cursor-pointer rounded-2xl px-4 py-1.5 font-semibold text-neutral-600 transition-colors select-none hover:text-neutral-100'>
			{title}
		</li>
	)
}
