import React from "react";
import { useForm } from "react-hook-form";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from "@chakra-ui/react";

function Signin() {
    const { register, errors, setError, handleSubmit, formState } = useForm();

    function onSubmit(values) {
        return new Promise((resolve, reject) => {
            if (values.email === "naruto@gmail.com") {
                setError("email", {
                    type: "manual",
                    message: "already taken!",
                });
                console.log(formState);

                reject();
            } else {
                console.log(formState);
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 1500);
                resolve();
            }
        });
    }
    return (
        <form
            className="flex align-middle justify-items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl width="45%" className="p-2" isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    variant="flushed"
                    ref={register({
                        required: true,
                        pattern:
                            "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/",
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl
                width="45%"
                className="p-2"
                isInvalid={errors.password}
            >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    variant="flushed"
                    ref={register({ required: true, minLength: 5 })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>

            <Button
                mt={5}
                borderRadius="5em"
                colorScheme="blue"
                width="30%"
                isLoading={formState.isSubmitting}
                type="submit"
            >
                Login
            </Button>
        </form>
    );
}

export default Signin;
