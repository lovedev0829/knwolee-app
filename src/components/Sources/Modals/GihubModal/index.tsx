import { Box, ModalBody, ModalFooter, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MODALS_DESCRIPTIONS } from "..";
import TrashIcon from "../../../../Icons/TrashIcon";
import { useAddEntityMutation } from "../../../../api/mutations";
import { githubSubSetTypes } from "../../../../utils/constants";
import { SOURCE_TYPES } from "../../../../utils/types";
import {
  AddButton,
  BulkUploadButton,
  CancelButton,
  SubmitButton,
} from "../SharedUI/Buttons";
import StyledInput from "../SharedUI/Input";
import { Description } from "../SharedUI/Text";
import TitleWithIcon from "../SharedUI/TitleWithIcon";
import { useUserData } from "../../../../api/queries";
import ErrorMessage from "../SharedUI/ErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { getEntityAddModalProps } from "src/utils/entity";
import GithubIcon from "src/Icons/GithubIcon";

type Props = {
  onClose: () => void
}

function GithubModal({ onClose }: Props) {
  const iconFillColor = useColorModeValue(undefined, "#4A4D4F");
  // Are we gonna need the isScraped property?
  // We'll only need it if the same source type can either be scheduled or not
  const emptyEntity = {
    id: uuidv4(),
    value: "",
    sourceType: SOURCE_TYPES.GITHUB,
    subSetType: "",
    isScraped: false,
    placeholder: "",
    placeholderURL: "",
    validationMessage: "",
  };

  const addEntityMutation = useAddEntityMutation();
  const queryClient = useQueryClient()
  const toast = useToast()

  const { data: userData } = useUserData();

  const [entities, setEntities] = useState([
    emptyEntity,
  ]);

  const [error, setError] = useState<string>("");
  const [isDisabledAddMore, disableAddMore] = useState(false);

  useEffect(() => {
    const disable =
      entities.find((e) => e.subSetType === "thread") || entities.length >= 5;
    disableAddMore(Boolean(disable));
  }, [entities]);

  if (!userData) return null;

  const validateEntities = () => {
    if (!entities.length) {
      setError("Add at least one entity");
      return true;
    }
    for (const entity of entities) {
      if (!entity.subSetType) {
        setError("Please select a type");
        return true;
      }
      if (!entity.value) {
        setError("Please insert a value");
        return true;
      }

      if (!entity.value) {
        setError(entity.validationMessage || "Please insert a valid URL");
        return true;
      }

    }
    return false;
  };

  const handleAddEntities = async () => {
    setError("");
    const isError = validateEntities();
    //console.log("isError", isError);
    if (isError) return;
    const entitiesPayload = entities.map(_ => ({ ..._, value: `${_.placeholderURL}${_.value}` }))
    const mutationPayload = { userId: userData.id, entities: entitiesPayload };
    //console.log("mutationPayload", mutationPayload);
    await addEntityMutation.mutateAsync(mutationPayload, {
      onError(error) {
        if (error.response) {
          if (error.response.status === 409) {
            const { message } = error.response.data;
            void queryClient.invalidateQueries(["userKnowledge"]);
            onClose();
            return toast({
              title: "Duplicate entities found",
              description: message,
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      }
    });
    onClose();
  };

  const handleEntityChange = (id: string, value: string) => {
    const updatedEntities = entities.map((entity) => {
      if (entity.id === id) {
        const { getCleanValue } = getEntityAddModalProps({
          sourceType: entity.sourceType,
          subSetType: entity.subSetType
        })
        value = getCleanValue(value || "");
        return { ...entity, value };
      } else {
        return entity;
      }
    });
    setEntities(updatedEntities);
  };

  const handleMenuItemClick = (id: string, subSetType: string) => {
    const updatedEntities = entities.map((entity) => {
      const defaultProps = getEntityAddModalProps({
        sourceType: entity.sourceType,
        subSetType: subSetType
      })
      if (entity.id === id) {
        return { ...entity, subSetType, ...defaultProps };
      } else {
        return entity;
      }
    });
    setEntities(updatedEntities);
  };

  const addNewEmptyEntity = () => {
    const newEntity = { ...emptyEntity, id: uuidv4() };
    setEntities([...entities, newEntity]);
  };

  const isDeleteDisabled = () => entities.length < 2

  const deleteEntity = (id: string) => {
    if (isDeleteDisabled()) return;
    const updatedEntities = entities.filter((entity) => entity.id !== id);
    setEntities(updatedEntities);
  };

  return (
    <Box>
      <ModalBody p={0}>
        <TitleWithIcon
          title="Github"
          icon={<GithubIcon />}
          iconColor="icons.github"
        />
        <Description text={MODALS_DESCRIPTIONS.GITHUB} />

        <Box px={1} mx={-1} flexGrow={1}>
          {entities.map((entity, index) => (
            <StyledInput
              key={entity.id}
              customZIndex={entities.length - index}
              rightIcon={
                !isDeleteDisabled() ? (
                  <TrashIcon fill={iconFillColor} />
                ) : undefined
              }
              value={entity.value}
              subSetType={entity.subSetType}
              onChange={(e) => handleEntityChange(entity.id, e.target.value)}
              onSelectTypeClick={(sourceType: string) =>
                handleMenuItemClick(entity.id, sourceType)
              }
              onDeleteEntity={() => deleteEntity(entity.id)}
              subSetTypes={githubSubSetTypes}
              placeholder={entity.placeholder}
              placeholderURL={entity.placeholderURL}
            />
          ))}
        </Box>

        {entities.length >= 5 && <ErrorMessage />}

        <Box display="flex" mt="8px" justifyContent="space-between">
          <AddButton
            onClick={addNewEmptyEntity}
            isDisabled={isDisabledAddMore}
          />
          <BulkUploadButton onClose={onClose} isDisabled={isDisabledAddMore} />
        </Box>
        {error && <Text color="red.500">{error}</Text>}
      </ModalBody>
      <ModalFooter justifyContent="center" gap="24px" pb={0}>
        <SubmitButton
          onClick={handleAddEntities}
          isDisabled={addEntityMutation.isLoading || !entities.length}
          isLoading={addEntityMutation.isLoading}
        />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </Box>
  );
}

export default GithubModal;
