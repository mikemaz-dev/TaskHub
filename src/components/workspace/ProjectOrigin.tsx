import '@/styles/project-identity.css'
import { Crown, Users } from 'lucide-react'
export function ProjectOrigin({ own, compact = false }: { own: boolean; compact?: boolean }) {
	const label = own ? 'Created by you' : 'Invited project'
	const Icon = own ? Crown : Users
	return <span className={`th-project-origin ${compact ? 'is-compact' : ''}`} title={label}>
		<Icon size={13} aria-hidden='true' /><span>{compact ? (own ? 'Yours' : 'Invited') : label}</span>
	</span>
}
