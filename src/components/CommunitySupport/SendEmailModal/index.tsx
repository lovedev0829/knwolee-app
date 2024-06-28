import React, { useCallback, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  ModalProps,
  FormLabel,
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  Input,
  Select,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import type { SendEmailPayload } from 'src/types/community.interface';
import { supportObjects } from './mockup';
import { useSendSupportEmailMutation } from 'src/api/mutations/sendEmailIndex';
import { useUserData } from 'src/api/queries';

interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: () => void;
  initialValues?: SendEmailPayload
}

const formControlStyle = {
  mt: "24px",
}

interface FormError {
  email: string;
  object: string;
  message: string;
}

const validateFormValues = (values: SendEmailPayload): FormError => {
  return {
    object: '',
    email: values.email ? '' : 'Email is required!',
    message: values.message ? '' : 'Message is required!',
  };
}

const SendEmailModal: React.FC<ConfirmModalProps> = ({
  onSubmit,
  onClose,
  initialValues = {
    email: '',
    object: 'Support',
    message: '',
  },
  ...otherProps
}) => {
  const modalContnetBgColor = useColorModeValue("#FFF", "neutral.100");
  const textColor = useColorModeValue("neutral.100", "neutral.10");
  const subHeadingTextColor = useColorModeValue("neutral.60", "neutral.50");
  const buttonBgColor = useColorModeValue("primary.60", "primary.50");
  const inputBgColor = useColorModeValue("#F9F9FA", "neutral.90");
  const inputBorderColor = useColorModeValue("neutral.30", "neutral.80");
  const inputTextColor = useColorModeValue("neutral.100", "neutral.20");

  const sendSupportEmailMutation = useSendSupportEmailMutation();
  const { data: userData } = useUserData();

  const [formError, setFormError] = useState<FormError>({
    email: '',
    object: '',
    message: '',
  });

  const formik = useFormik<SendEmailPayload>({
    initialValues: { ...initialValues, email: userData?.email || "" },
    onSubmit: (values) => {
      const formErrorNew = validateFormValues(values);
      setFormError(formErrorNew);
      const formHasError = formErrorNew.email || formErrorNew.message;
      if (formHasError) return;
      
      sendSupportEmailMutation.mutate(values);
      onClose();
    }
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormError(validateFormValues({
      ...formik.values,
      [e.target.name]: e.target.value,
    }));
    formik.handleChange(e);
  }, [formError, formik]);

  return (
    <Modal isCentered={true} onClose={onClose} {...otherProps}>
      <ModalOverlay />
      <ModalContent
        borderRadius="24px"
        px="40px"
        py="48px"
        boxSizing='content-box'
        bg={modalContnetBgColor}
      >
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader
            color={textColor}
            textAlign="center"
            fontFamily="Roboto"
            fontSize="20px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="28px"
            py="0"
          >
            Send an Email
          </ModalHeader>
          <ModalBody
            pt="16px"
            pb="0"
            color={subHeadingTextColor}
          >
            <FormControl {...formControlStyle} isInvalid={!!formError.email}>
              <FormLabel>Your email</FormLabel>
              <Input
                name="email"
                value={formik.values?.email}
                onChange={handleChange}
                bg={inputBgColor}
                borderColor={inputBorderColor}
                color={inputTextColor}
                disabled
              />
              {formError.email && <FormErrorText>{formError.email}</FormErrorText>}
            </FormControl>
            <FormControl {...formControlStyle}>
              <FormLabel>Object</FormLabel>
              <Select
                name="object"
                value={formik.values?.object}
                onChange={formik.handleChange}
                bg={inputBgColor}
                borderColor={inputBorderColor}
                color={inputTextColor}
              >
                {supportObjects.map(obj => <option
                  key={obj}
                  value={obj}
                >{obj}</option>)}
              </Select>
            </FormControl>
            <FormControl {...formControlStyle} isInvalid={!!formError.message}>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                value={formik.values?.message}
                onChange={handleChange}
                bg={inputBgColor}
                borderColor={inputBorderColor}
                color={inputTextColor}
              />
              {formError.message && <FormErrorText>{formError.message}</FormErrorText>}
            </FormControl>
          </ModalBody>
          <ModalFooter pt="40px" pb="0">
            <Box display="flex" width="100%" alignItems="center" justifyContent="center" gap="24px">
              <Button
                type="submit"
                bg={buttonBgColor}
                borderRadius="10px"
                colorScheme="blue"
                color="neutral.10"
                fontSize="16px"
                fontFamily="Roboto"
                fontWeight="500"
                lineHeight="24px"
                py="12px"
                width="144px"
                height="48px"
                isDisabled={sendSupportEmailMutation.isLoading}
                isLoading={sendSupportEmailMutation.isLoading}
              >Submit</Button>
              <Button
                onClick={onClose}
                borderRadius="10px"
                color={textColor}
                fontSize="16px"
                fontFamily="Roboto"
                fontWeight="500"
                lineHeight="24px"
                py="12px"
                width="144px"
                height="48px"
                bg={inputBorderColor}
              >Cancel</Button>
            </Box>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

const FormErrorText: React.FC<FormHelperTextProps> = (props) =>
  <FormHelperText
    color="red"
    {...props}
  />

export default SendEmailModal;