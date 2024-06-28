import SourceStatusCircle from "src/Icons/SourceStatusCircle";
import { isDoubleStepEntity } from "src/utils/entity";
import { IUserVector } from "src/utils/types";
import { Badge, Text, } from "@chakra-ui/react";
import styled from "styled-components";

interface Props {
    isScraped: boolean;
    isNoData:boolean;
    userVectors: IUserVector[];
    sourceType: string;
    subSetType?: string;
}

function SourceStatusBadges({ isScraped,isNoData, sourceType, subSetType }: Props) {
    if (isDoubleStepEntity({ sourceType, subSetType })) {
        return <Badge fontSize='0.8em' color="#FFFFFF" bg="#6a5acd">Multi-Step</Badge>;
    }
 
    if (isNoData) {
        
        return <Badge fontSize='0.8em' color="#FFFFFF" bg="#989c9e">No data</Badge>;
    }
   
    
    if (isScraped) { //temp: userVectors.length --> isScraped, as we can pause using pinecone
        return <Badge fontSize='0.8em' color="#FFFFFF" bg="#12b802">Learned</Badge>
    }
    
    if (!isScraped) {
        return <Badge fontSize='0.8em' color="#FFFFFF" bg="secondary.70">In Progress</Badge>;
    }

    // if (!userVectors.length && isScraped) {
    //     return <Badge fontSize='0.8em' color="#FFFFFF" bg="#989c9e">No data</Badge>;
    // }
    if (isScraped) {
        return <Badge fontSize='0.8em' color="#FFFFFF" bg="#4386f4">Data Found</Badge>;
    }

    return <Badge fontSize='0.8em' color="#FFFFFF" bg="#b33211">Error</Badge>;
}

export default SourceStatusBadges;
