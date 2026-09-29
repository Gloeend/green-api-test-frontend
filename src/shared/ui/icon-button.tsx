import { cn } from '@shared/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const iconButtonVariants = cva(
	'inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				ghost: 'text-chat-foreground/80 hover:bg-chat-foreground/10 active:bg-chat-foreground/15',
				accent: 'bg-chat-accent text-chat-accent-foreground hover:bg-chat-accent/90 active:scale-[.88] [&_svg]:size-[22px]'
			}
		},
		defaultVariants: {
			variant: 'ghost'
		}
	}
)

export const IconButton = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof iconButtonVariants>
>(({ className, variant, type = 'button', ...props }, ref) => {
	return <button ref={ref} type={type} className={cn(iconButtonVariants({ variant, className }))} {...props} />
})
IconButton.displayName = 'IconButton'
