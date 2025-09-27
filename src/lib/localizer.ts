import { format, getDay, parse, startOfWeek } from 'date-fns'
import { ru } from 'date-fns/locale'
import { dateFnsLocalizer } from 'react-big-calendar'

const locales = {
	ru: ru
}

export const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
})
