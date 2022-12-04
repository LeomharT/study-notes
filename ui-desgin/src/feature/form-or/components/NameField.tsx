import { Box, TextInput } from "@mantine/core";
import { useContext } from "react";
import { FormContext } from "../FormOr";

export default function NameField()
{
    const { form } = useContext(FormContext);

    return (
        <div>
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
        </div>
    );
}
