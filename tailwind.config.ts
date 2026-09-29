import { type Config } from 'tailwindcss'

export default {
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			screens: {
				'max-768px': { max: '768px' }
			},
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', 'Roboto', 'system-ui', 'Helvetica Neue', 'Arial', 'sans-serif']
			},
			letterSpacing: {
				chat: '0.01em'
			},
			colors: {
				chat: {
					background: 'hsl(var(--chat-background))',
					surface: 'hsl(var(--chat-surface))',
					foreground: 'hsl(var(--chat-foreground))',
					muted: 'hsl(var(--chat-muted))',
					accent: 'hsl(var(--chat-accent))',
					'accent-foreground': 'hsl(var(--chat-accent-foreground))',
					danger: 'hsl(var(--chat-danger))',
					capsule: 'hsl(var(--chat-capsule))',
					'capsule-foreground': 'hsl(var(--chat-capsule-foreground))',
					pattern: 'hsl(var(--chat-pattern))',
					'bubble-in-foreground': 'hsl(var(--chat-bubble-in-foreground))',
					'bubble-out-foreground': 'hsl(var(--chat-bubble-out-foreground))'
				}
			},
			backgroundImage: {
				'chat-wallpaper': 'var(--chat-wallpaper)',
				'bubble-in': 'var(--chat-bubble-in)',
				'bubble-out': 'var(--chat-bubble-out)',
				'avatar-orange': 'linear-gradient(180deg, #ffc93d, #ff832a)',
				'avatar-violet': 'linear-gradient(180deg, #c58cf7, #8a5cf6)',
				'avatar-blue': 'linear-gradient(180deg, #6fc3ff, #2a8cf0)',
				'avatar-green': 'linear-gradient(180deg, #8fe28a, #35b56b)',
				'avatar-pink': 'linear-gradient(180deg, #ff9ac1, #f2508f)',
				'avatar-teal': 'linear-gradient(180deg, #6ee7d8, #14a8a0)'
			},
			keyframes: {
				'message-in': {
					from: { opacity: '0', transform: 'translateY(8px) scale(.99)' },
					to: { opacity: '1', transform: 'none' }
				},
				'pop-in': {
					from: { opacity: '0', transform: 'scale(.6)' },
					to: { opacity: '1', transform: 'none' }
				}
			},
			animation: {
				'message-in': 'message-in .3s cubic-bezier(.2, .8, .2, 1) backwards',
				'pop-in': 'pop-in .16s cubic-bezier(.2, .8, .2, 1) backwards'
			}
		}
	},
	plugins: []
} satisfies Config
