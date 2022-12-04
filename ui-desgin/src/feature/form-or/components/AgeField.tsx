import { NumberInput } from "@mantine/core";
import { useContext } from "react";
import { FormContext } from "../FormOr";

export default function AgeField()
{
    const { form } = useContext(FormContext);

    return (
        <NumberInput
            mt="sm"
            label="Age"
            placeholder="Age"
            min={0}
            max={99}
            {...form.getInputProps('age')}
        />
    );
}
