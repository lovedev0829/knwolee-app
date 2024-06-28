import SourceStatusCircle from "src/Icons/SourceStatusCircle";
import { isDoubleStepEntity } from "src/utils/entity";
import { IUserVector } from "src/utils/types";

interface Props {
    isScraped: boolean;
    userVectors: IUserVector[];
    sourceType: string;
    subSetType?: string;
}

function SourceStatus({ isScraped, userVectors = [], sourceType, subSetType }: Props) {
    if (isDoubleStepEntity({ sourceType, subSetType })) {
        return <SourceStatusCircle fill="#12dded" />;
    }
    if (!isScraped) {
        return <SourceStatusCircle fill="#FFAB3F" />;
    }

    // empty response (no scraped content basically) 
    if (!userVectors.length) {
        return <SourceStatusCircle fill="#b3b6b8" />;
    }
    if (!userVectors.length) {
        return <SourceStatusCircle fill="#4386F4" />;
    }

    if (userVectors.length) {
        return <SourceStatusCircle fill="#4CAF50" />;
    }

    return <SourceStatusCircle fill="#FFAB3F" />;
}

export default SourceStatus;
