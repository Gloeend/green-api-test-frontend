import { cn } from '@shared/lib'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

export const TextareaAutosize = forwardRef<
	HTMLTextAreaElement,
	Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> & {
		value: string
	}
>(({ className, value, ...props }, ref) => {
	return (
		<div className='grid w-full min-w-0 grid-cols-[minmax(0,1fr)]'>
			<div
				aria-hidden='true'
				className={cn('invisible max-h-52 overflow-hidden whitespace-pre-wrap break-words [grid-area:1/1]', className)}
			>
				{`${value} `}
			</div>
			<textarea
				ref={ref}
				rows={1}
				value={value}
				className={cn('max-h-52 resize-none overflow-y-auto bg-transparent outline-none [grid-area:1/1]', className)}
				{...props}
			/>
		</div>
	)
})
TextareaAutosize.displayName = 'TextareaAutosize'
