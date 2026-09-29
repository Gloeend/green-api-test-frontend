import { cn } from '@shared/lib'
import { forwardRef, type HTMLAttributes } from 'react'

export const Capsule = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={cn(
				'w-fit select-none rounded-[10px] bg-chat-capsule/70 px-2.5 py-1 text-sm leading-[18px] tracking-chat text-chat-capsule-foreground backdrop-blur-sm',
				className
			)}
			{...props}
		/>
	)
})
Capsule.displayName = 'Capsule'
