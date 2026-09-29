import { cn } from '@shared/lib'
import { Button } from '@shared/ui/button'
import { PhoneInput } from '@shared/ui/phone-input'
import { LoaderCircle } from 'lucide-react'

import { useCreateChatForm } from '../lib/hooks/use-create-chat-form'

export const CreateChatForm = ({ className, onCreated }: { className?: string; onCreated: VoidFunction }) => {
	const { form, onSubmit } = useCreateChatForm(onCreated)

	const {
		register,
		formState: { errors, isSubmitting }
	} = form

	return (
		<form noValidate className={cn(className, 'flex flex-col gap-y-1.5')} onSubmit={onSubmit}>
			<div className='flex gap-x-2'>
				<PhoneInput
					autoFocus
					placeholder='+7 (999) 123-45-67'
					aria-label='Номер телефона получателя'
					aria-invalid={Boolean(errors.phone)}
					disabled={isSubmitting}
					{...register('phone')}
				/>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? <LoaderCircle className='animate-spin' aria-label='Проверяем номер' /> : 'Создать'}
				</Button>
			</div>
			{errors.phone?.message ? (
				<p role='alert' className='text-xs leading-4 text-chat-danger'>
					{errors.phone.message}
				</p>
			) : (
				<p className='text-xs leading-4 text-chat-muted'>Номер с кодом +7 или +375</p>
			)}
		</form>
	)
}
