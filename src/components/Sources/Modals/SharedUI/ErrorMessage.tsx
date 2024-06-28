import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
    errorMessage?: string;
}

function ErrorMessage({
    errorMessage = "Max 5 items per time",
    ...textProps
}: Props) {
    return (
        <Text color="red" mt={2} {...textProps}>
            {errorMessage}
        </Text>
    );
}

export default ErrorMessage;
