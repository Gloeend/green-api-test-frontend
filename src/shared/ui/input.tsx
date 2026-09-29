import { cn } from '@shared/lib'
import { forwardRef, type InputHTMLAttributes } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
	({ className, type = 'text', ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				className={cn(
					'h-11 w-full min-w-0 rounded-xl border border-transparent bg-chat-foreground/5 px-3.5 text-base leading-5 tracking-chat text-chat-foreground outline-none transition-colors placeholder:text-chat-muted focus-visible:border-chat-accent disabled:opacity-50 aria-[invalid=true]:border-chat-danger',
					className
				)}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'
