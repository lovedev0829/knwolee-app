/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, ModalBody, ModalFooter, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MODALS_DESCRIPTIONS } from "..";
import TrashIcon from "../../../../Icons/TrashIcon";
import CodaIcon from "../../../../Icons/CodaIcon";
import { useAddEntityMutation } from "../../../../api/mutations";
import { codaSubSetTypes } from "../../../../utils/constants";
import { EntityPayload, SOURCE_TYPES } from "../../../../utils/types";
import { validateCodaNotes } from "../../../../utils/urlValidation";
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

export type CodaEntityPayload = EntityPayload & {
  id: string;
  subSetType: string;
  placeholder: string;
  placeholderURL: string;
  validationMessage: string;
};

// Are we gonna need the isScraped property?
// We'll only need it if the same source type can either be scheduled or not
const emptyCodaEntity = {
  id: uuidv4(),
  value: "",
  sourceType: SOURCE_TYPES.CODA,
  subSetType: "",
  isScraped: false,
  placeholder: "",
  placeholderURL: "",
  validationMessage: ""
};

const CodaModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const iconFillColor = useColorModeValue(undefined, "#4A4D4F");
  const addEntityMutation = useAddEntityMutation();
  const queryClient = useQueryClient()
  const toast = useToast()
  const { data: userData } = useUserData()

  const [entities, setEntities] = useState<CodaEntityPayload[]>([
    emptyCodaEntity,
  ]);

  const [error, setError] = useState<string>("");

  if (!userData) return null

  const validateEntities = () => {
    if (!entities.length) {
      setError("Add at least one entity");
      return true;
    }
    for (const entity of entities) {
      if (!entity.subSetType) {
        setError("Please selecte a type");
        return true;
      }
      if (!entity.value) {
        setError("Please insert a value");
        return true;
      }
      const isValidUrlUrl = validateCodaNotes(entity.value);
      if (!isValidUrlUrl) {
        setError(entity.validationMessage ||"Please insert a valid URL");
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
    const entitiesPayload = entities.map(_ => ({..._, value: `${_.placeholderURL}${_.value}`}))
    const mutationPayload = { userId: userData.id, entities: entitiesPayload };
    //console.log("mutationPayload", mutationPayload);
    await addEntityMutation.mutateAsync(mutationPayload, { onError(error) {
      if(error.response) {
        if(error.response.status === 409) {
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
    }});
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
    const emptyCodaEntity = {
      id: uuidv4(),
      value: "",
      sourceType: SOURCE_TYPES.CODA,
      subSetType: "",
      isScraped: false,
      placeholder: "",
      placeholderURL: "",
      validationMessage: ""
    };
    const newEntity = { ...emptyCodaEntity, id: uuidv4() };
    setEntities([...entities, newEntity]);
  };

  const deleteEntity = (id: string) => {
    const updatedEntities = entities.filter((entity) => entity.id !== id);
    setEntities(updatedEntities);
  };

  const isDeleteDisabled = () => entities.length < 2;

  return (
    <Box>
      <ModalBody p={0}>
        <TitleWithIcon
          title="Coda"
          icon={<CodaIcon />}
          iconColor="icons.url"
        />
        <Description text={MODALS_DESCRIPTIONS.CODA} />

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
              subSetTypes={codaSubSetTypes}
              placeholder={entity.placeholder}
              placeholderURL={entity.placeholderURL}
            />
          ))}
        </Box>

        {entities.length >= 5 && <ErrorMessage />}

        <Box display="flex" mt="8px" justifyContent="space-between">
          <AddButton
            onClick={addNewEmptyEntity}
            isDisabled={entities.length >= 5}
          />
          <BulkUploadButton onClose={onClose} />
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
};

export default CodaModal;
