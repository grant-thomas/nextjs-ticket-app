'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const ToggleMode = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <Button variant='outline' size='icon' disabled={true}></Button>;
	}

	const dark = theme === 'dark';

	return (
		<Button
			variant='outline'
			size='icon'
			onClick={() => setTheme(`${dark ? 'light' : 'dark'}`)}>
			{dark ? (
				<Sun className='hover:curdor-point hover:text-primary' />
			) : (
				<Moon className='hover:curdor-point hover:text-primary' />
			)}
		</Button>
	);
};

export default ToggleMode;
