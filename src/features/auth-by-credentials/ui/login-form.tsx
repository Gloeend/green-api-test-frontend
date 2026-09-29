import { cn } from '@shared/lib'
import { Button } from '@shared/ui/button'
import { Field } from '@shared/ui/field'
import { Input } from '@shared/ui/input'
import { LoaderCircle } from 'lucide-react'

import { useLoginForm } from '../lib/hooks/use-login-form'

export const LoginForm = ({ className }: { className?: string }) => {
	const { form, notice, onSubmit } = useLoginForm()

	const {
		register,
		formState: { errors, isSubmitting }
	} = form

	return (
		<form
			noValidate
			className={cn(className, 'flex flex-col gap-y-5 rounded-2xl bg-chat-surface p-6 shadow-sm')}
			onSubmit={onSubmit}
		>
			<div className='flex flex-col gap-y-1'>
				<h1 className='text-xl font-bold leading-6 tracking-chat'>Вход в веб-чат MAX</h1>
				<p className='text-sm leading-[18px] text-chat-muted'>Данные инстанса из личного кабинета GREEN-API</p>
			</div>
			{notice && (
				<p role='status' className='rounded-xl bg-chat-accent/10 px-3.5 py-2.5 text-sm leading-[18px]'>
					{notice}
				</p>
			)}
			<div className='flex flex-col gap-y-4'>
				<Field label='idInstance' htmlFor='idInstance' error={errors.idInstance?.message}>
					<Input
						id='idInstance'
						inputMode='numeric'
						autoComplete='off'
						placeholder='1101000001'
						aria-invalid={Boolean(errors.idInstance)}
						{...register('idInstance')}
					/>
				</Field>
				<Field label='apiTokenInstance' htmlFor='apiTokenInstance' error={errors.apiTokenInstance?.message}>
					<Input
						id='apiTokenInstance'
						type='password'
						autoComplete='off'
						aria-invalid={Boolean(errors.apiTokenInstance)}
						{...register('apiTokenInstance')}
					/>
				</Field>
				<Field label='apiUrl' htmlFor='apiUrl' hint='Возьмите из личного кабинета GREEN-API' error={errors.apiUrl?.message}>
					<Input id='apiUrl' type='url' autoComplete='off' aria-invalid={Boolean(errors.apiUrl)} {...register('apiUrl')} />
				</Field>
				<label className='flex w-fit cursor-pointer select-none items-center gap-x-2 text-sm leading-[18px]'>
					<input type='checkbox' className='size-4 accent-chat-accent' {...register('isRemembered')} />
					Запомнить до закрытия вкладки
				</label>
			</div>
			{errors.root?.message && (
				<p role='alert' className='rounded-xl bg-chat-danger/10 px-3.5 py-2.5 text-sm leading-[18px] text-chat-danger'>
					{errors.root.message}
				</p>
			)}
			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? <LoaderCircle className='animate-spin' aria-label='Проверяем данные' /> : 'Войти'}
			</Button>
		</form>
	)
}
