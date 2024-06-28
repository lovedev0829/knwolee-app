import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

type Props = {
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
};

function PaginationComponent({
    totalPages = 0,
    setCurrentPage,
    currentPage,
}: Props) {
    return (
        <Flex justifyContent="end" px="12px">
            <ButtonGroup spacing="2">
                <Button
                    onClick={() => setCurrentPage((page) => page - 1)}
                    isDisabled={currentPage === 1}
                >
                    <ChevronLeftIcon boxSize={6} />
                </Button>
                {currentPage !== 1 && (
                    <Button onClick={() => setCurrentPage(currentPage - 1)}>
                        {currentPage - 1}
                    </Button>
                )}
                <Button colorScheme={"blue"}>{currentPage}</Button>
                {currentPage < totalPages && (
                    <Button onClick={() => setCurrentPage(currentPage + 1)}>
                        {currentPage + 1}
                    </Button>
                )}
                <Button
                    onClick={() => setCurrentPage((page) => page + 1)}
                    isDisabled={currentPage >= totalPages}
                >
                    <ChevronRightIcon boxSize={6} />
                </Button>
            </ButtonGroup>
        </Flex>
    );
}

export default PaginationComponent;
