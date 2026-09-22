'use client'

import { addDays, format, startOfWeek, subMonths } from 'date-fns'
import { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { HelpTip } from '@/components/workspace/HelpTip'

import type { MeasurableTask } from '@/lib/analytics/metrics'

export function PerformanceChart({ tasks }: { tasks: MeasurableTask[] }) {
	const [range, setRange] = useState<'monthly' | 'weekly'>('monthly')
	const now = new Date()
	const points = Array.from({ length: range === 'monthly' ? 7 : 7 }, (_, i) => {
		const date =
			range === 'monthly'
				? subMonths(now, 6 - i)
				: addDays(startOfWeek(now, { weekStartsOn: 1 }), i)
		const key = format(date, range === 'monthly' ? 'yyyy-MM' : 'yyyy-MM-dd')
		return {
			label: format(date, range === 'monthly' ? 'MMM' : 'EEE'),
			count: tasks.filter(t => t.due_date.startsWith(key)).length
		}
	})
	return (
		<section className='th-panel th-card th-chart'>
			<div className='th-section-title'>
				<h2>
					Project performance <HelpTip topic='performance' />
				</h2>
				<div className='th-segmented'>
					{(['monthly', 'weekly'] as const).map(value => (
						<button key={value} aria-pressed={range === value} onClick={() => setRange(value)}>
							{value === 'monthly' ? 'Monthly' : 'Weekly'}
						</button>
					))}
				</div>
			</div>
			<p className='th-small th-muted'>Tasks by scheduled date</p>
			<div className='th-chart-canvas'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart data={points} margin={{ top: 12, right: 8, left: 8, bottom: 0 }}>
						<XAxis
							dataKey='label'
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
						/>
						<Tooltip
							cursor={{ fill: 'var(--surface)' }}
							contentStyle={{
								background: 'var(--popover)',
								border: '1px solid var(--border)',
								borderRadius: 10,
								fontSize: 12
							}}
						/>
						<Bar
							name='Tasks'
							dataKey='count'
							fill='var(--accent)'
							radius={[6, 6, 0, 0]}
							maxBarSize={18}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
			{!tasks.length && (
				<p className='th-small th-muted'>Create your first task to start tracking progress.</p>
			)}
		</section>
	)
}
