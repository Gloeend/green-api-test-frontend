import { cn } from '@shared/lib'
import { Button } from '@shared/ui/button'
import { LoaderCircle, TriangleAlert } from 'lucide-react'

import { useInstanceSettings } from '../lib/hooks/use-instance-settings'

export const InstanceSettingsBanner = ({ className }: { className?: string }) => {
	const { isMisconfigured, isFixing, isFixRequested, error, onFix } = useInstanceSettings()

	if (!isMisconfigured) {
		return null
	}

	return (
		<section
			role='status'
			className={cn(
				className,
				'flex items-center gap-x-4 border-b border-chat-foreground/10 bg-chat-surface px-4 py-2.5 max-768px:flex-col max-768px:items-start max-768px:gap-y-2'
			)}
		>
			<TriangleAlert className='size-5 shrink-0 text-chat-accent max-768px:hidden' />
			<div className='flex min-w-0 flex-1 flex-col gap-y-0.5 text-sm leading-[18px]'>
				{isFixRequested ? (
					<p>Настройки отправлены. Инстанс перезапустится, изменения применятся в течение 5 минут.</p>
				) : (
					<>
						<p>
							Входящие не будут приходить: у инстанса задан webhookUrl или выключен incomingWebhook. Для HTTP API нужен
							пустой webhookUrl и incomingWebhook = yes.
						</p>
						<p className='text-chat-muted'>Инстанс перезапустится, изменения применятся в течение 5 минут.</p>
					</>
				)}
				{error && <p className='text-chat-danger'>{error}</p>}
			</div>
			{!isFixRequested && (
				<Button variant='ghost' disabled={isFixing} onClick={onFix}>
					{isFixing ? <LoaderCircle className='animate-spin' aria-label='Сохраняем настройки' /> : 'Исправить настройки'}
				</Button>
			)}
		</section>
	)
}
