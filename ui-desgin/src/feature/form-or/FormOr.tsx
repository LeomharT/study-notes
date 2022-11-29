import { Box, Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function FormOr()
{
    const form = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            age: 0
        },
        validate: {
            first_name: (value: string, values) =>
            {
                if (value || values.last_name) return null;

                return 'Name must have at least 2 letters';
            },
            last_name: (value: string, values) =>
            {
                if (value || values.first_name) return null;

                return 'Name must have at least 2 letters';
            },
            age: (value: number) => (value < 18 ? 'You must be at least 18 to register' : null),
        }
    });


    return (
        <Box sx={{ maxWidth: 340 }} mx="auto">
            <form onSubmit={form.onSubmit(console.log)}>
                <Box >
                    <TextInput label="First Name" placeholder="First Name" {...form.getInputProps('first_name')} />
                    <span style={{ fontSize: "20px" }}>or</span>
                    <TextInput label="Last Name" placeholder="Last Name" {...form.getInputProps('last_name')} />
                </Box>
                <NumberInput
                    mt="sm"
                    label="Age"
                    placeholder="Age"
                    min={0}
                    max={99}
                    {...form.getInputProps('age')}
                />
                <Button type="submit" mt="sm">
                    Submit
                </Button>
            </form>
        </Box>
    );
}
