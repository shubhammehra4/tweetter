import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { authUser } from "../../store/actions/auth";
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
    Box,
    useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";
import Signin from "./Signin";
import twitterBig from "../../images/twitter-big.png";

const Signup = lazy(() => import("./Signup"));

function Auth(props) {
    const { authUser, errors } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex height="100vh">
            <Center
                flex={0.5}
                className="bg-blue-300 overflow-hidden max-w-5xl">
                <Image
                    src={twitterBig}
                    className="transform rotate-15 scale-x-150 scale-y-150 translate-x-48"
                />
            </Center>

            <Center flex={0.5} flexDirection="column" flexWrap="wrap">
                <Box width="70%" className="mb-auto">
                    <Signin onAuth={authUser} />
                </Box>
                <div className="p-4 mb-auto">
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
                        onClick={onOpen}>
                        Signup
                    </Button>
                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <Suspense
                                    fallback={
                                        <div className="p-12 text-center">
                                            Loading...
                                        </div>
                                    }>
                                    <Signup
                                        onAuth={authUser}
                                        reqError={errors}
                                    />
                                </Suspense>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    <Button
                        borderRadius="5em"
                        variant="outline"
                        mt={3}
                        colorScheme="blue"
                        width="100%">
                        Log In
                    </Button>
                </div>
            </Center>
        </Flex>
    );
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
    };
}
export default connect(mapStateToProps, { authUser })(Auth);
