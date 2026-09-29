import { useCallback, useLayoutEffect, useRef } from 'react'

const BOTTOM_THRESHOLD = 48

export const useStickToBottom = <T extends HTMLElement>(trigger: unknown) => {
	const containerRef = useRef<T | null>(null)
	const isAtBottomRef = useRef(true)

	const scrollToBottom = useCallback(() => {
		const container = containerRef.current

		if (!container || !isAtBottomRef.current) {
			return
		}

		container.scrollTop = container.scrollHeight
	}, [])

	const onScroll = useCallback(() => {
		const container = containerRef.current

		if (!container) {
			return
		}

		isAtBottomRef.current = container.scrollHeight - container.scrollTop - container.clientHeight < BOTTOM_THRESHOLD
	}, [])

	useLayoutEffect(() => {
		scrollToBottom()
	}, [scrollToBottom, trigger])

	useLayoutEffect(() => {
		const container = containerRef.current

		if (!container) {
			return
		}

		const resizeObserver = new ResizeObserver(scrollToBottom)
		resizeObserver.observe(container)

		return () => {
			resizeObserver.disconnect()
		}
	}, [scrollToBottom])

	return {
		containerRef,
		onScroll
	}
}
