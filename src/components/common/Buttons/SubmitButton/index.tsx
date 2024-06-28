import { Button, ButtonProps } from "@chakra-ui/react"

const SubmitButton: React.FC<ButtonProps> = (props) =>
  <Button type="submit"
    colorScheme="blue"
    mt={4}
    width="100%"
    height="48px"
    fontSize="16px"
    fontWeight="500"
    fontFamily="Roboto"
    color="neutral.10"
    py="12px"
    background="primary.50"
    lineHeight="24px"
    {...props}
  />

  export default SubmitButton