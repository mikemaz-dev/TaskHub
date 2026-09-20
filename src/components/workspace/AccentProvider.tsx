'use client'

import { type ReactNode, createContext, useContext, useEffect, useSyncExternalStore } from 'react'

export const accents = [
	{ id: 'violet', name: 'Violet', color: '#8170f2' },
	{ id: 'indigo', name: 'Indigo', color: '#6366f1' },
	{ id: 'emerald', name: 'Emerald', color: '#10b981' },
	{ id: 'amber', name: 'Amber', color: '#f59e0b' },
	{ id: 'pink', name: 'Pink', color: '#ec4899' }
] as const
const Context = createContext<{ accent: string; setAccent: (value: string) => void }>({
	accent: 'violet',
	setAccent: () => {}
})
function readAccent() {
	try {
		const value = localStorage.getItem('taskhub-accent')
		return accents.some(a => a.id === value) ? value! : 'violet'
	} catch {
		return 'violet'
	}
}
function subscribeAccent(notify: () => void) {
	window.addEventListener('storage', notify)
	window.addEventListener('taskhub-accent', notify)
	return () => {
		window.removeEventListener('storage', notify)
		window.removeEventListener('taskhub-accent', notify)
	}
}
function updateAccent(value: string) {
	if (!accents.some(a => a.id === value)) return
	try {
		localStorage.setItem('taskhub-accent', value)
	} catch {}
	window.dispatchEvent(new Event('taskhub-accent'))
}
export function AccentProvider({ children }: { children: ReactNode }) {
	const accent = useSyncExternalStore(subscribeAccent, readAccent, () => 'violet')
	useEffect(() => {
		document.documentElement.dataset.accent = accent
	}, [accent])
	return <Context.Provider value={{ accent, setAccent: updateAccent }}>{children}</Context.Provider>
}
export function AccentPicker() {
	const { accent, setAccent } = useContext(Context)
	return (
		<div className='th-accent-picker'>
			<h3>Accent color</h3>
			<p className='th-small th-muted'>Highlights, buttons and charts. Saved on this device.</p>
			<div>
				{accents.map(a => (
					<button
						type='button'
						key={a.id}
						aria-label={a.name}
						aria-pressed={accent === a.id}
						style={{ background: a.color }}
						onClick={() => setAccent(a.id)}
					>
						{accent === a.id ? '✓' : ''}
					</button>
				))}
			</div>
		</div>
	)
}
