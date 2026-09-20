// Presentation copy also improves notifications already stored in the database.
const titles: Record<string, string> = {
	'Checklist item added': 'New step added to a task',
	'Checklist item completed': 'Task step completed',
	'Checklist updated': 'Task steps updated'
}
export function notificationTitle(title: string) {
	return titles[title] || title
}
export function notificationBody(title: string, body: string) {
	return titles[title] ? `Task: ${body}` : body
}
