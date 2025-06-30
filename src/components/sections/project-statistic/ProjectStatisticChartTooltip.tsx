import type { TooltipProps } from 'recharts'

interface CustomTooltipProps extends TooltipProps<number, string> {
	active?: boolean
	payload?: Array<{
		value: number
		dataKey: string
		color: string
		name?: string
	}>
}

export function ProjectStatisticChartTooltip({ active, payload }: CustomTooltipProps) {
	if (active && payload && payload.length) {
		const data = payload[0]

		return (
			<div className='bg-purple-500 text-white px-3.5 py-1.5 rounded-3xl shadow-lg border-0 relative'>
				<div className='text-sm font-medium'>
					{data.value} {data.dataKey === 'projectCount' ? 'Projects' : data.name || 'Items'}
				</div>
			</div>
		)
	}

	return null
}
