export function hasValue<T>(value: T | null | undefined): boolean {
	switch (true) {
		case value === null:
		case value === undefined:
			return false

		case typeof value === 'string' && value.trim() === '':
			return false

		case Array.isArray(value) && value.length === 0:
			return false

		case value instanceof Object && Object.keys(value).length === 0:
			return false

		default:
			return true
	}
}
