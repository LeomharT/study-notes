import { Box, Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function FormOr()
{
    const form = useForm({
        initialValues: {
            name: {
                first_name: '',
                last_name: '',
            },
            age: 0
        },
        validate: {
            name: (value, values) =>
            {
                if (value.first_name !== '' || value.last_name !== '') return null;
                return 'Must enter a name';
            },
            age: (value: number) =>
            {
                if (value < 18) return 'You must be at least 18 to register';

                return null;
            }
        }
    });


    return (
        <Box sx={{ maxWidth: 340 }} mx="auto">
            <form onSubmit={form.onSubmit(e => console.log(e))}>
                <Box style={{
                    display: 'flex'
                }}>
                    <TextInput
                        withAsterisk
                        label="First Name"
                        placeholder="First Name"
                        {...form.getInputProps('name.first_name')}
                        error={form.getInputProps('name').error}
                    />
                    <span style={{ fontSize: "20px" }}>or</span>
                    <TextInput
                        label="Last Name"
                        placeholder="Last Name"
                        {...form.getInputProps('name.last_name')}
                        error={form.getInputProps('name').error}
                    />
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
