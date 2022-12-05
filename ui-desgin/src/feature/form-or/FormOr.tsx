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
            name: value => (value.first_name === '' && value.last_name === '') ? 'Must enter a name' : null,

            age: value => value < 18 ? 'You must be at least 18 to register' : null,
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
