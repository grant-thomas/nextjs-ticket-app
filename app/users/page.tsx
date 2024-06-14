import UserForm from '@/components/UserForm';
import React, { useState } from 'react';
import DataTableSimple from './DataTableSimple';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
import { Button } from '@/components/ui/button';

const Users = async () => {
	const session = await getServerSession(options);

	if (session?.user.role !== 'ADMIN') {
		return <p className='text-destructive'>Admin access required.</p>;
	}

	const users = await prisma.user.findMany();

	return (
		<div>
			<UserForm />
			<DataTableSimple users={users} />
		</div>
	);
};

export default Users;
