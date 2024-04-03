'use client';

import { userSchema } from '@/validationSchemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

type UserFormData = z.infer<typeof userSchema>;

interface Props {
	user?: User;
}

const UserForm = ({ user }: Props) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	const form = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
	});

	async function onSubmit(values: z.infer<typeof userSchema>) {
		try {
			setIsSubmitting(true);
			setError('');

			if (user) {
				await axios.patch('/api/users/' + user.id, values);
			} else {
				await axios.post('/api/users', values);
			}

			setIsSubmitting(false);

			router.push('/users');
			router.refresh();
		} catch (error) {
			setError('Unknown error occurred!');
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<div>
				<div className='rounded-md border w-full p-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8 w-full'>
							<FormField
								control={form.control}
								defaultValue={user?.name}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter Users Full Name...'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								defaultValue={user?.username}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder='Enter a Username...' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								defaultValue=''
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												required={user ? false : true}
												placeholder='Enter a Password...'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div className='flex w-full space-x-4'>
								<FormField
									control={form.control}
									defaultValue={user?.role}
									name='role'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															placeholder='Role...'
															defaultValue={user?.role}
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='USER'>USER</SelectItem>
													<SelectItem value='TECH'>TECH</SelectItem>
													<SelectItem value='ADMIN'>ADMIN</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
							</div>

							<Button type='submit' disabled={isSubmitting}>
								{user ? 'Update User' : 'Create User'}
							</Button>
						</form>
					</Form>
					<p className='text-destructive mt-2'>{error}</p>
				</div>
			</div>
		</>
	);
};

export default UserForm;
