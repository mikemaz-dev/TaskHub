export interface IAuthStore {
	isLoggedIn: boolean

	login: () => void
	logout: () => void
}
