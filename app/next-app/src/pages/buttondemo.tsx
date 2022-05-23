import { ActionIcon, Button, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';

export default function Buttondemo()
{
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <div>
            <Link href='/'>
                <Button component='a'>Normal Button</Button>
            </Link>
            <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
        </div>
    );
}
