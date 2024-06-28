import React from 'react';
import { useFormik } from 'formik';
import { FormControl, FormHelperText, Input, InputGroup, InputLeftElement, VStack, useColorMode } from '@chakra-ui/react';
import { SettingFormLabel, SettingTitle, SubmitButton } from '../common';
import { initialFormValues } from './mockups';
import { LockIcon } from '../Icons';

interface UpdatePasswordProps {

}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ }) => {
  const { colorMode } = useColorMode()
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      console.log('UpdatePassword/submit', values);
    },
  });

  return (
    <VStack spacing={8} align="stretch">
      <SettingTitle>Password</SettingTitle>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={6}>
          <FormControl>
            <SettingFormLabel>Old Password</SettingFormLabel>
            <InputGroup
              background={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
              borderRadius={colorMode === "dark" ? "md" : undefined}
            >
              <InputLeftElement>
                <LockIcon fill={colorMode === "dark" ? "#4A4D4F" : undefined} />
              </InputLeftElement>
              <Input type="password" fontSize="16px" lineHeight="24px" borderWidth="1px" borderStyle="solid"
                borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
                name="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {/* <FormHelperText fontSize="12px" color="neutral.60">Validation message goes here</FormHelperText> */}
          </FormControl>
          <FormControl>
            <SettingFormLabel>New Password</SettingFormLabel>
            <InputGroup
              background={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
              borderRadius={colorMode === "dark" ? "md" : undefined}
            >
              <InputLeftElement>
                <LockIcon fill={colorMode === "dark" ? "#4A4D4F" : undefined} />
              </InputLeftElement>
              <Input type="password" fontSize="16px" lineHeight="24px" borderWidth="1px" borderStyle="solid"
                borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormHelperText fontSize="12px" color="neutral.60">Minimum 8 characters</FormHelperText>
          </FormControl>
          <FormControl>
            <SettingFormLabel>Confirm Password</SettingFormLabel>
            <InputGroup
              background={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
              borderRadius={colorMode === "dark" ? "md" : undefined}
            >
              <InputLeftElement>
                <LockIcon fill={colorMode === "dark" ? "#4A4D4F" : undefined} />
              </InputLeftElement>
              <Input type="password" fontSize="16px" lineHeight="24px" borderWidth="1px" borderStyle="solid"
                borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormHelperText fontSize="12px" color="neutral.60">Minimum 8 characters</FormHelperText>
          </FormControl>
        </VStack>
        <SubmitButton type="submit" marginTop="2rem">Change password</SubmitButton>
      </form>
    </VStack>
  );
}

export default UpdatePassword;