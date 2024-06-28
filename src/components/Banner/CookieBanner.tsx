import { Button, Flex, Img, Text, useDisclosure } from "@chakra-ui/react";
import { useUpdateProfileMutation } from "src/api/mutations/userIndex";
import cookieImage from "src/assets/images/cookie.png";

function CookieBanner() {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    const updateProfileMutation = useUpdateProfileMutation();

    async function acceptCookies() {
        const formData = new FormData();
        formData.append("cookiesAccepted", String(true));
        await updateProfileMutation.mutateAsync(formData);
        onClose();
    }

    function denyCookies() {
        onClose();
    }

    if (!isOpen) return null;

    return (
        <Flex
            alignItems="center"
            backdropFilter="blur(3.75px)"
            background="rgba(39, 45, 62, 0.95)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            borderRadius="10px"
            bottom={["20px", "20px", "32px"]}
            boxShadow="0px 8px 32px -6px rgba(31, 38, 135, 0.37)"
            color="#F9F9F9"
            flexDirection={["column", "column", "row"]}
            fontSize="12px"
            gap="10px"
            justifyContent="center"
            marginLeft={["20px", "20px", "32px"]}
            maxWidth="580px"
            padding="16px"
            position="fixed"
            right={["20px", "20px", "32px"]}
            textAlign="center"
            zIndex="banner"
        >
            <Flex gap="10px" alignItems="center">
                <Img src={cookieImage} alt="cookie" width={25} height={25} />
                <Text textAlign="left">
                    We use third-party&nbsp;
                    <Text as="span" textDecoration="underline" textUnderlineOffset="2px">
                        <a href="https://www.knowlee.ai/privacy.html" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>cookies</a>
                    </Text>
                    &nbsp;to provide you the best user experience and for performance
                    analytics.
                </Text>
            </Flex>
            <Flex gap="10px">
                {/*<Button
                    background="#2C3447"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.18)"
                    borderRadius="8px"
                    color="#F9F9F9"
                    fontSize="12px"
                    fontWeight="500"
                    minWidth="96px"
                    onClick={denyCookies}
                    padding="8px"
                    variant="unstyled"
                >
                    Deny
    </Button>*/}
                <Button
                    background="linear-gradient(90deg, #FF8F00 0%, #FFAB3F 23.44%, #4386F4 100%)"
                    color="#FFF"
                    fontSize="12px"
                    fontWeight="500"
                    minWidth="96px"
                    onClick={acceptCookies}
                    padding="8px"
                    variant="unstyled"
                    isLoading={updateProfileMutation.isLoading}
                    isDisabled={updateProfileMutation.isLoading}
                >
                    Accept
                </Button>
            </Flex>
        </Flex>
    );
}

export default CookieBanner;
