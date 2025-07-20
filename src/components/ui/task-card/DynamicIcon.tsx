import dynamicIconImports from 'lucide-react/dynamicIconImports'
import dynamic from 'next/dynamic'

type IconName = keyof typeof dynamicIconImports

interface IDynamicIcon {
	name: IconName
	className?: string
}

export const DynamicIcon = ({ name, className }: IDynamicIcon) => {
	const LucideIconImport = dynamicIconImports[name]

	if (!LucideIconImport) {
		console.warn(`Icon "${name}" not found.`)
		return null
	}

	const IconComponent = dynamic(LucideIconImport, {
		ssr: false
	})

	return <IconComponent className={className} />
}
