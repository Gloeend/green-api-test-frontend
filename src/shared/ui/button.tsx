import { cn } from '@shared/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
	'inline-flex h-11 shrink-0 items-center justify-center gap-x-2 whitespace-nowrap rounded-xl px-4 text-base leading-5 tracking-chat transition-[background-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent focus-visible:ring-offset-2 focus-visible:ring-offset-chat-surface disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				accent: 'bg-chat-accent font-bold text-chat-accent-foreground hover:bg-chat-accent/90 active:bg-chat-accent/80',
				ghost: 'text-chat-accent hover:bg-chat-accent/10 active:bg-chat-accent/15'
			}
		},
		defaultVariants: {
			variant: 'accent'
		}
	}
)

export const Button = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ className, variant, type = 'button', ...props }, ref) => {
	return <button ref={ref} type={type} className={cn(buttonVariants({ variant, className }))} {...props} />
})
Button.displayName = 'Button'
