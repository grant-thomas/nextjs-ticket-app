'use client';

import { Status } from '@prisma/client';
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface dataElements {
	name: Status;
	total: number;
}

interface dataProps {
	data: dataElements[];
}

const DashChart = ({ data }: dataProps) => {
	return (
		<Card className='col-span-4'>
			<CardHeader>
				<CardTitle>Ticket Counts</CardTitle>

				<CardContent className='pl-2'>
					<ResponsiveContainer width='100%' height={362}>
						<BarChart data={data}>
							<XAxis
								dataKey='name'
								stroke='#888888'
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke='#888888'
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<Bar dataKey='total' fill='#60A5FA' radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export default DashChart;
