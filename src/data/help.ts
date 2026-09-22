/** User-facing explanations. Keep these aligned with database permissions and analytics. */
export const help = {
	roles: {
		title: 'Project roles',
		text: 'The owner manages roles and archives the project. Admins manage the project and invitations. Members edit tasks they create or are assigned to.'
	},
	performance: {
		title: 'Reading this chart',
		text: 'Tasks are grouped by their scheduled date. This is planned workload, not a history of completed work.'
	},
	duration: {
		title: 'Planned time',
		text: 'Start and end times belong to the same day. Duration shortcuts set the end time; planned hours are not a time tracker.'
	},
	archive: {
		title: 'Your project archive',
		text: 'Completed and archived projects leave the active workspace. Their tasks and conversations are kept. The owner can restore an archived project.'
	},
	invitation: {
		title: 'Inviting a teammate',
		text: 'Share the generated code with your teammate. They can join from the Team page. Codes expire after 7 days and allow up to 10 joins.'
	}
} as const
export type HelpTopic = keyof typeof help
