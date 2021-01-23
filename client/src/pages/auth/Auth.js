import React from "react";
import {
    Flex,
    Center,
    Image,
    Icon,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";

function Auth() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex height="100vh">
            <Image
                fit="contain"
                src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2018/02/Twitter.jpg"
            />
            <Center flexGrow={1} flexDirection="column" flexWrap="wrap">
                <div className="p-4">
                    <Icon as={AiOutlineTwitter} fontSize="4em" />

                    <h1 className="py-2 text-3xl font-bold w-96">
                        See what’s happening in the world right now.
                    </h1>
                    <h4 className="mt-6 font-semibold">Join Twitter today.</h4>
                    <Button
                        variant="solid"
                        borderRadius="5em"
                        mt={3}
                        colorScheme="blue"
                        width="100%"
                        onClick={onOpen}
                    >
                        Signup
                    </Button>
                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>SignUp Form</ModalBody>
                        </ModalContent>
                    </Modal>
                    <Button
                        variant="outline"
                        mt={3}
                        borderRadius="5em"
                        colorScheme="blue"
                        width="100%"
                    >
                        Log In
                    </Button>
                </div>
            </Center>
        </Flex>
    );
}

export default Auth;
