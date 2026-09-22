import { describe, expect, test } from 'bun:test'

import {
	type MeasurableTask,
	csvCell,
	isTaskDone,
	plannedMinutes,
	summarizeTasks,
	taskProgress
} from './metrics'

const base: MeasurableTask = {
	id: '1',
	title: 'Task',
	due_date: '2026-09-10',
	project_id: null,
	start_time: null,
	end_time: null,
	sub_task: []
}
describe('real task metrics', () => {
	test('an empty checklist is not a completed task', () => {
		expect(isTaskDone(base)).toBe(false)
		expect(taskProgress(base)).toBe(0)
	})
	test('completed tasks do not become overdue', () => {
		expect(
			summarizeTasks(
				[{ ...base, due_date: '2026-09-01', sub_task: [{ is_completed: true }] }],
				'2026-09-10'
			).overdue
		).toBe(0)
	})
	test('partial checklist completion is rounded', () => {
		expect(
			taskProgress({
				...base,
				sub_task: [{ is_completed: true }, { is_completed: false }, { is_completed: null }]
			})
		).toBe(33)
	})
	test('empty data produces zero, never fabricated history', () => {
		expect(summarizeTasks([], '2026-09-10')).toEqual({
			total: 0,
			completed: 0,
			active: 0,
			overdue: 0,
			minutes: 0,
			completionRate: 0
		})
	})
	test('planned duration excludes missing or inverted times', () => {
		expect(plannedMinutes(base)).toBe(0)
		expect(plannedMinutes({ ...base, start_time: '10:15', end_time: '11:00' })).toBe(45)
		expect(plannedMinutes({ ...base, start_time: '11:00', end_time: '10:00' })).toBe(0)
	})
	test('CSV prevents spreadsheet formulas and quotes embedded separators', () => {
		expect(csvCell('=SUM(A1)')).toBe('"\'=SUM(A1)"')
		expect(csvCell('a,"b"')).toBe('"a,""b"""')
	})
})
