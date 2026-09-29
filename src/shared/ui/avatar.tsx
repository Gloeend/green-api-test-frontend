import { cn } from '@shared/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'
import { forwardRef, type HTMLAttributes } from 'react'

const TONES = ['orange', 'violet', 'blue', 'green', 'pink', 'teal'] as const

const avatarVariants = cva(
	'inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold uppercase text-white',
	{
		variants: {
			size: {
				default: 'size-10 text-base [&_svg]:size-[22px]',
				lg: 'size-12 text-lg [&_svg]:size-6'
			},
			tone: {
				orange: 'bg-avatar-orange',
				violet: 'bg-avatar-violet',
				blue: 'bg-avatar-blue',
				green: 'bg-avatar-green',
				pink: 'bg-avatar-pink',
				teal: 'bg-avatar-teal'
			}
		},
		defaultVariants: {
			size: 'default',
			tone: 'orange'
		}
	}
)

const getInitials = (name: string) => {
	return name
		.trim()
		.split(/\s+/)
		.filter((needle) => /\p{L}/u.test(needle.charAt(0)))
		.slice(0, 2)
		.map((needle) => needle.charAt(0))
		.join('')
}

const getTone = (seed: string) => {
	const hash = Array.from(seed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0)

	return TONES[hash % TONES.length]
}

export const Avatar = forwardRef<
	HTMLSpanElement,
	HTMLAttributes<HTMLSpanElement> &
		Pick<VariantProps<typeof avatarVariants>, 'size'> & {
			name: string
			seed?: string
		}
>(({ className, name, seed, size, ...props }, ref) => {
	const initials = getInitials(name)

	return (
		<span
			ref={ref}
			aria-hidden='true'
			className={cn(avatarVariants({ size, tone: getTone(seed ?? name), className }))}
			{...props}
		>
			{initials || <User />}
		</span>
	)
})
Avatar.displayName = 'Avatar'
