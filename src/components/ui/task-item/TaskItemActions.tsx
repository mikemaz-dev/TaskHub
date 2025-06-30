import { Pencil, Plus } from 'lucide-react'

import type { ITask } from '@/types/tasks/task.types'

export function TaskItemActions({ task }: { task: ITask }) {
	return (
		<div className='flex items-center gap-4'>
			<button className='p-2 bg-violet-500 rounded-full cursor-pointer text-white border-2 border-transparent hover:bg-white hover:border-violet-500 hover:text-violet-500 transition-colors'>
				<Plus size={18} />
			</button>
			<button className='p-2 rounded-full cursor-pointer border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white transition-colors'>
				<Pencil size={16} />
			</button>
		</div>
	)
}
