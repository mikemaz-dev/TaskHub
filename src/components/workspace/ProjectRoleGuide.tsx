import { Crown, ShieldCheck, UserRound, ChevronDown, Check } from 'lucide-react'
import '@/styles/project-roles.css'

const roles = [
	{ name: 'Member', icon: UserRound, caption: 'Focus on the work', items: ['Create tasks', 'Edit own & assigned tasks', 'Delete own tasks'], note: 'No invitations or role changes' },
	{ name: 'Admin', icon: ShieldCheck, caption: 'Keep the team moving', items: ['Manage every task', 'Invite people & remove members', 'Complete or reopen the project'], note: 'No role changes or archiving' },
	{ name: 'Owner', icon: Crown, caption: 'Your project, your decisions', items: ['Everything an admin can do', 'Assign roles & manage admins', 'Archive & restore the project'], note: 'Reserved for the project creator' }
]
export function ProjectRoleGuide() {
	return <details className='th-roles'>
		<summary><ShieldCheck size={17} /><span>Project roles<small>Who can do what</small></span><ChevronDown size={16} /></summary>
		<div className='th-roles-grid'>{roles.map(({ name, icon: Icon, caption, items, note }) =>
			<article key={name}>
				<header><span className='th-role-icon'><Icon size={18} /></span><div><strong>{name}</strong><p>{caption}</p></div></header>
				<ul>{items.map(item => <li key={item}><Check size={13} />{item}</li>)}</ul>
				<footer>{note}</footer>
			</article>
		)}</div>
		<p className='th-roles-note'>All roles can view tasks and chat. Tasks stay read-only in completed or archived projects.</p>
	</details>
}
