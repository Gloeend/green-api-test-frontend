import chatPatternUrl from '@shared/assets/images/chat-pattern.svg'
import { cn } from '@shared/lib'
import { type CSSProperties, forwardRef, type HTMLAttributes } from 'react'

const patternStyle: CSSProperties = {
	maskImage: `url("${chatPatternUrl}")`,
	WebkitMaskImage: `url("${chatPatternUrl}")`
}

export const ChatWallpaper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			aria-hidden='true'
			className={cn('pointer-events-none absolute inset-0 bg-chat-wallpaper', className)}
			{...props}
		>
			<div className='absolute inset-0 bg-chat-pattern [mask-repeat:repeat] [mask-size:180px]' style={patternStyle} />
		</div>
	)
})
ChatWallpaper.displayName = 'ChatWallpaper'
