import { describe, expect, test } from 'bun:test'

import { getAvatarUrl } from './getAvatarUrl'

describe('avatar URLs', () => {
	test('preserves existing GitHub URLs', () => {
		expect(getAvatarUrl('https://avatars2.githubusercontent.com/u/123')).toBe(
			'https://avatars2.githubusercontent.com/u/123'
		)
	})
	test('rejects unrecognized remote URLs', () => {
		expect(getAvatarUrl('https://example.com/a.png')).toBe('/images/default-avatar.png')
	})
	test('uses the fallback for missing avatars', () => {
		expect(getAvatarUrl()).toBe('/images/default-avatar.png')
	})
})
