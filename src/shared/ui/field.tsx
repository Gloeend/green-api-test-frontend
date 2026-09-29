import { cn } from '@shared/lib'
import type { ReactNode } from 'react'

export const Field = ({
	className,
	label,
	htmlFor,
	hint,
	error,
	children
}: {
	className?: string
	label: string
	htmlFor: string
	hint?: string
	error?: string
	children: ReactNode
}) => {
	return (
		<div className={cn('flex flex-col gap-y-1.5', className)}>
			<label htmlFor={htmlFor} className='text-sm leading-[18px] tracking-chat text-chat-muted'>
				{label}
			</label>
			{children}
			{error ? (
				<p role='alert' className='text-xs leading-4 text-chat-danger'>
					{error}
				</p>
			) : (
				hint && <p className='text-xs leading-4 text-chat-muted'>{hint}</p>
			)}
		</div>
	)
}
