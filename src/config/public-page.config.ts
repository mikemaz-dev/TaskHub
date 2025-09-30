export class Pages {
	static HOME = '/'
	static BASE = '/dashboard'
	static LOGIN = '/sign-in'
	static SIGNUP = '/signup'

	static DASHBOARD = Pages.BASE
	static MESSAGES = `${Pages.BASE}/messages`
	static INSIGHT = `${Pages.BASE}/insight`
	static TEAM = `${Pages.BASE}/team`
	static SCHEDULE = `${Pages.BASE}/schedule`
	static REPORT = `${Pages.BASE}/report`

	static ACCOUNT = `${Pages.BASE}/account`
	static PROFILE = `${Pages.BASE}/account/profile`
	static PROFILE_SETTINGS = `${Pages.BASE}/account/profile`
	static PROFILE_APPEARANCE = `${Pages.BASE}/account/appearance`
	static PROFILE_SECURITY = `${Pages.BASE}/account/security`
	static PROFILE_NOTIFICATIONS = `${Pages.BASE}/account/notifications`
	static PROFILE_ADVANCED = `${Pages.BASE}/account/advanced`


	static PROJECTS = `${this.DASHBOARD}/projects`
}
