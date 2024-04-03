'use client';

import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { z } from 'zod';
import { ticketSchema } from '@/validationSchemas/ticket';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { log } from 'console';
import { Input } from './ui/input';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
	ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	const form = useForm<TicketFormData>({
		resolver: zodResolver(ticketSchema),
	});

	async function onSubmit(values: z.infer<typeof ticketSchema>) {
		try {
			setIsSubmitting(true);
			setError('');

			if (ticket) {
				await axios.patch('/api/tickets/' + ticket.id, values);
			} else {
				await axios.post('/api/tickets', values);
			}

			setIsSubmitting(false);

			router.push('/tickets');
			router.refresh();
		} catch (error) {
			setError('Unknown error occurred!');
			setIsSubmitting(false);
		}
	}

	return (
		<div className='rounded-md border w-full p-4'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'>
					<FormField
						control={form.control}
						defaultValue={ticket?.title}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ticket Title</FormLabel>
								<FormControl>
									<Input placeholder='Ticket Title...' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Controller
						name='description'
						defaultValue={ticket?.description}
						control={form.control}
						render={({ field }) => (
							<SimpleMDE placeholder='Description' {...field} />
						)}
					/>
					<div className='flex w-full space-x-4'>
						<FormField
							control={form.control}
							defaultValue={ticket?.status}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													placeholder='Status...'
													defaultValue={ticket?.status}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='OPEN'>OPEN</SelectItem>
											<SelectItem value='STARTED'>STARTED</SelectItem>
											<SelectItem value='CLOSED'>CLOSED</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							defaultValue={ticket?.priority}
							name='priority'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													placeholder='Priority...'
													defaultValue={ticket?.priority}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='LOW'>LOW</SelectItem>
											<SelectItem value='MEDIUM'>MEDIUM</SelectItem>
											<SelectItem value='HIGH'>HIGH</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' disabled={isSubmitting}>
						{ticket ? 'Update Ticket' : 'Create Ticket'}
					</Button>
				</form>
			</Form>
			<p className='text-destructive mt-2'>{error}</p>
		</div>
	);
};

export default TicketForm;
