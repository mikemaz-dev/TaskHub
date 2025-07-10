// src/services/authService.ts
import Cookies from 'js-cookie'

// Типы для данных
type TUser = {
	id: string
	name: string
	email: string
}

type TAuthResponse = {
	user: TUser
	accessToken: string
	refreshToken: string
}

// Моковые данные пользователей
const mockUsers: TUser[] = [
	{
		id: '1',
		name: 'John Doe',
		email: 'john@example.com'
	},
	{
		id: '2',
		name: 'Jane Smith',
		email: 'jane@example.com'
	}
]

// Имитация задержки сети
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 1000))

export const authService = {
	async login(email: string, password: string): Promise<TAuthResponse> {
		await simulateNetworkDelay()

		// Проверяем пароль (в моках пароль должен быть "password123")
		if (password !== 'password123') {
			throw new Error('Неверный пароль')
		}

		const user = mockUsers.find(u => u.email === email)

		if (!user) {
			throw new Error('Пользователь не найден')
		}

		return {
			user,
			accessToken: `mock-access-token-${user.id}`,
			refreshToken: `mock-refresh-token-${user.id}`
		}
	},

	async signup(name: string, email: string, password: string): Promise<TAuthResponse> {
		await simulateNetworkDelay()

		// Проверка на существующего пользователя
		if (mockUsers.some(u => u.email === email)) {
			throw new Error('Пользователь с таким email уже существует')
		}

		const newUser: TUser = {
			id: (mockUsers.length + 1).toString(),
			name,
			email
		}

		mockUsers.push(newUser)

		return {
			user: newUser,
			accessToken: `mock-access-token-${newUser.id}`,
			refreshToken: `mock-refresh-token-${newUser.id}`
		}
	},

	async logout(): Promise<void> {
		await simulateNetworkDelay()
		// Просто удаляем токены
	},

	async getCurrentUser(): Promise<TUser | null> {
		await simulateNetworkDelay()

		const accessToken = Cookies.get('accessToken')
		if (!accessToken) return null

		// Извлекаем ID пользователя из токена
		const userId = accessToken.replace('mock-access-token-', '')
		return mockUsers.find(u => u.id === userId) || null
	}
}
