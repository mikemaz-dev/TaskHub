import { Input } from '../input'
import { Label } from '../label'
import { Textarea } from '../textarea'

interface Props {
	id: string
	name: string
	label: string
	placeholder?: string
	defaultValue?: string
	textarea?: boolean
}

export function Field({ id, name, label, placeholder, defaultValue, textarea }: Props) {
	const Comp = textarea ? Textarea : Input
	return (
		<div className='flex flex-col gap-1'>
			<Label
				htmlFor={id}
				className='text-sm font-medium'
			>
				{label}
			</Label>
			<Comp
				id={id}
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
			/>
		</div>
	)
}
