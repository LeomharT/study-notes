import { Box, Button } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { createContext } from 'react';
import AgeField from './components/AgeField';
import NameField from './components/NameField';

export type FormContextType = {
    form: UseFormReturnType<any>;
};


export const FormContext = createContext<FormContextType>({} as FormContextType);

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
            <FormContext.Provider value={{
                form
            }}>
                <form onSubmit={form.onSubmit(e => console.log(e))}>
                    <NameField />
                    <AgeField />
                    <Button type="submit" mt="sm">
                        Submit
                    </Button>
                </form>
            </FormContext.Provider>
        </Box>
    );
}
