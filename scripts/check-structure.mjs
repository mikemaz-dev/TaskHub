import { readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'

// Generated database contracts keep the upstream generator's structure.
const exceptions = new Set(['src/types/db.types.ts'])
const violations = []
let checked = 0
function inspect(directory) {
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name)
		if (entry.isDirectory()) {
			inspect(path)
			continue
		}
		if (!['.css', '.ts', '.tsx'].includes(extname(path)) || exceptions.has(path)) continue
		const lines = readFileSync(path, 'utf8').trimEnd().split('\n').length
		const limit = path.endsWith('.css') ? 100 : 120
		checked++
		if (lines > limit) violations.push(`${path}: ${lines}/${limit} lines`)
	}
}
inspect('src')
if (violations.length) {
	console.error(violations.join('\n'))
	process.exitCode = 1
} else console.log(`Structure OK: ${checked} files, CSS ≤100, TypeScript ≤120 lines.`)
