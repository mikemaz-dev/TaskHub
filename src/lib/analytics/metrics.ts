export type MeasurableTask = {
	id: string
	title: string
	due_date: string
	project_id: string | null
	start_time: string | null
	end_time: string | null
	sub_task: { is_completed: boolean | null }[]
}
export function taskProgress(task: MeasurableTask) {
	const total = task.sub_task.length
	return total ? Math.round((task.sub_task.filter(s => s.is_completed).length / total) * 100) : 0
}
export function isTaskDone(task: MeasurableTask) {
	return task.sub_task.length > 0 && task.sub_task.every(s => s.is_completed)
}
export function plannedMinutes(task: MeasurableTask) {
	if (!task.start_time || !task.end_time) return 0
	const minutes = (time: string) => {
		const [h, m] = time.split(':').map(Number)
		return h * 60 + m
	}
	const result = minutes(task.end_time) - minutes(task.start_time)
	return Number.isFinite(result) && result > 0 ? result : 0
}
export function summarizeTasks(tasks: MeasurableTask[], today: string) {
	const completed = tasks.filter(isTaskDone).length
	return {
		total: tasks.length,
		completed,
		active: tasks.length - completed,
		overdue: tasks.filter(t => !isTaskDone(t) && t.due_date < today).length,
		minutes: tasks.reduce((sum, t) => sum + plannedMinutes(t), 0),
		completionRate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0
	}
}
export function csvCell(value: string | number) {
	const text = String(value)
	const safe = /^[\s]*[=+@-]/.test(text) ? `'${text}` : text
	return `"${safe.replaceAll('"', '""')}"`
}
