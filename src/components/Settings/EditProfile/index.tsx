import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
  useColorMode
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useUpdateProfileMutation } from 'src/api/mutations/userIndex';
import { User } from '../../../types';
import {
  EnvelopIcon,
  PersonDoneIcon,
  ProfileIcon
} from '../Icons';
import { SettingBlock, SettingFormLabel, SettingTitle, SubmitButton } from '../common';
import UserSettingsAvatar from './Avatar';
import { useUserData } from '../../../api/queries';


// This is useful so that we know if keys will change in the future
type UpdatableUser = Partial<User>;
const mockUser: UpdatableUser = {
  username: "",
  email: "",
  password: "",
  profilePicture: "",
  bio: "",
};

const EditProfile: React.FC = () => {
  const { colorMode } = useColorMode()
  const { data: userData } = useUserData();

  const updateProfileMutation = useUpdateProfileMutation();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const isKeyInUser = (key: string): key is keyof User => {
    return key in mockUser;
}
    // Enforcing type safety on the form data
    const createUserUpdateFormData = (data: User): FormData => {
      const formData = new FormData();
      for (const key in data ) {
        if (isKeyInUser(key) && data[key] !== undefined) {
          formData.append(key, String(data[key]));
        }
        // //console.log('appended ',key,' with value ', data[key], ' to formData')
      }
      if (avatarFile) {
        formData.append("file", avatarFile);
      }
      for (const pair of formData.entries()) {
        //console.log(pair[0], ' : ', pair[1]); 
      }
      return formData;
    };

  const formik = useFormik({
    initialValues: userData!,
    enableReinitialize: true,
    onSubmit: (values) => {
      // type is not super clear as the returned formData could be anything
      // For the future we should find a way to be more explicit with this
      const uploadPayload = createUserUpdateFormData(values)
      updateProfileMutation.mutate(uploadPayload);
    },
  });

  return (
    <VStack spacing={[4, 4, 8]} align="stretch">
      <SettingTitle>Edit Profile</SettingTitle>
      <SettingBlock className="mobile-setting-profile">
        <form onSubmit={formik.handleSubmit} style={{
          width: "100%"
        }}>
        <VStack spacing={6}>
          <FormControl>
            <SettingFormLabel>Avatar</SettingFormLabel>
            <UserSettingsAvatar setAvatarFile={setAvatarFile} />
          </FormControl>
          <FormControl>
            <SettingFormLabel>Name</SettingFormLabel>
            <InputGroup
              background={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
              borderRadius={colorMode === "dark" ? "md" : undefined}
            >
              <InputLeftElement>
                <ProfileIcon fill={colorMode === "dark" ? "#4A4D4F" : undefined} />
              </InputLeftElement>
              <Input
                fontSize="16px"
                lineHeight="24px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
                color={colorMode === "dark" ? "neutral.20" : undefined}
                name="username"
                value={formik.values?.username || ""}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {/* <FormHelperText fontSize="12px" color="neutral.60">Validation message goes here</FormHelperText> */}
          </FormControl>
          <FormControl>
            {/* Create style for readonly */}
            <SettingFormLabel>Email</SettingFormLabel>
            <InputGroup
              background={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
              borderRadius={colorMode === "dark" ? "md" : undefined}
            >
              <InputLeftElement>
                <EnvelopIcon fill={colorMode === "dark" ? "#4A4D4F" : "#6C7275"} />
              </InputLeftElement>
              <Input
                type="email"
                fontSize="16px"
                lineHeight="24px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
                color={colorMode === "dark" ? "neutral.20" : undefined}
                name="email"
                value={formik.values?.email || ""}
                readOnly
              />
            </InputGroup>
            {/* <FormHelperText fontSize="12px" color="neutral.60">Validation message goes here</FormHelperText> */}
          </FormControl>
          <FormControl>
            <SettingFormLabel>Bio</SettingFormLabel>
            <InputGroup
              background={colorMode === "dark" ? "neutral.90" : "#F9F9FA"}
              borderRadius={colorMode === "dark" ? "md" : undefined}
            >
              <InputLeftElement>
                <PersonDoneIcon fill={colorMode === "dark" ? "#4A4D4F" : "#6C7275"} />
              </InputLeftElement>
              <Textarea
                placeholder="Short bio"
                pr="16px"
                pl="36px"
                py="12px"
                fontSize="16px"
                lineHeight="24px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor={colorMode === "dark" ? "neutral.80" : "neutral.30"}
                color={colorMode === "dark" ? "neutral.20" : undefined}
                name="bio"
                value={formik.values?.bio || ""}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {/* <FormHelperText fontSize="12px" color="neutral.60">Validation message goes here</FormHelperText> */}
          </FormControl>
        </VStack>
        <SubmitButton type="submit" marginTop="2rem" isLoading={updateProfileMutation.isLoading} isDisabled={updateProfileMutation.isLoading}>Save Changes</SubmitButton>
      </form>
      </SettingBlock>
    </VStack>
  );
}

export default EditProfile;