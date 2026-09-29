import { cn } from '@shared/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'

const bubbleVariants = cva(
	'flow-root w-fit max-w-[min(30rem,85%)] animate-message-in whitespace-pre-wrap break-words rounded-2xl px-2.5 pb-2.5 pt-2 text-base leading-5 tracking-chat motion-reduce:animate-none',
	{
		variants: {
			variant: {
				incoming: 'rounded-bl-md bg-bubble-in text-chat-bubble-in-foreground shadow-sm dark:shadow-none',
				outgoing: 'rounded-br-md bg-bubble-out text-chat-bubble-out-foreground'
			}
		},
		defaultVariants: {
			variant: 'incoming'
		}
	}
)

export const Bubble = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof bubbleVariants>>(
	({ className, variant, ...props }, ref) => {
		return <div ref={ref} className={cn(bubbleVariants({ variant, className }))} {...props} />
	}
)
Bubble.displayName = 'Bubble'

export const BubbleMeta = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={cn(
				'float-right ml-2 mt-1.5 flex select-none items-center gap-x-[3px] whitespace-nowrap text-xs leading-4 tracking-normal opacity-65 [&_svg]:size-3.5',
				className
			)}
			{...props}
		/>
	)
})
BubbleMeta.displayName = 'BubbleMeta'
