const DAY_MS = 24 * 60 * 60 * 1000

const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' })
const dayFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
const dayWithYearFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
const shortDateFormatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' })

const getDayStart = (timestamp: number) => {
	const date = new Date(timestamp)
	date.setHours(0, 0, 0, 0)

	return date.getTime()
}

const getDaysAgo = (timestamp: number, now: number) => {
	return Math.round((getDayStart(now) - getDayStart(timestamp)) / DAY_MS)
}

export const isSameDay = (first: number, second: number) => {
	return getDayStart(first) === getDayStart(second)
}

export const formatMessageTime = (timestamp: number) => {
	return timeFormatter.format(timestamp)
}

export const formatDayLabel = (timestamp: number, now = Date.now()) => {
	const daysAgo = getDaysAgo(timestamp, now)

	if (daysAgo === 0) {
		return 'Сегодня'
	}

	if (daysAgo === 1) {
		return 'Вчера'
	}

	if (new Date(timestamp).getFullYear() !== new Date(now).getFullYear()) {
		return dayWithYearFormatter.format(timestamp)
	}

	return dayFormatter.format(timestamp)
}

export const formatChatListTime = (timestamp: number, now = Date.now()) => {
	if (getDaysAgo(timestamp, now) === 0) {
		return timeFormatter.format(timestamp)
	}

	return shortDateFormatter.format(timestamp)
}
