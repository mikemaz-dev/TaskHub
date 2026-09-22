import { describe, expect, test } from 'bun:test'

import { TaskSchema } from './task.zod'

const task = {
	title: 'Plan release',
	due_date: '2026-09-12',
	project_id: 'project',
	icon: 'check-circle',
	start_time: '09:00',
	end_time: '09:30'
}
describe('task scheduling validation', () => {
	test('accepts 24-hour time and legacy seconds', () => {
		expect(TaskSchema.safeParse(task).success).toBe(true)
		expect(
			TaskSchema.safeParse({ ...task, start_time: '09:00:00', end_time: '09:30:00' }).success
		).toBe(true)
	})
	test('rejects invalid hours and minutes', () => {
		expect(TaskSchema.safeParse({ ...task, start_time: '25:00' }).success).toBe(false)
		expect(TaskSchema.safeParse({ ...task, end_time: '10:75' }).success).toBe(false)
	})
	test('requires an end after the start', () => {
		expect(TaskSchema.safeParse({ ...task, end_time: '08:30' }).success).toBe(false)
		expect(TaskSchema.safeParse({ ...task, end_time: '09:00' }).success).toBe(false)
	})
	test('allows all-day tasks but not an end without a start', () => {
		expect(TaskSchema.safeParse({ ...task, start_time: '', end_time: '' }).success).toBe(true)
		expect(TaskSchema.safeParse({ ...task, start_time: '' }).success).toBe(false)
	})
})
