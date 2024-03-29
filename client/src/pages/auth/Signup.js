import React from "react";
import { useForm } from "react-hook-form";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from "@chakra-ui/react";

function Signup(props) {
    const { onAuth, reqError } = props;
    const { register, errors, handleSubmit, formState } = useForm();

    function onSubmit(values) {
        onAuth("signup", values)
            .then(() => {
                props.history.push("/home");
            })
            .catch(() => {
                console.log(reqError);
            });
        // return new Promise((resolve) => {
        //     if (values.email === "naruto@gmail.com") {
        //         setError("email", {
        //             type: "manual",
        //             message: "already taken!",
        //         });
        //         resolve();
        //     } else {
        //         alert(JSON.stringify(values, null, 2));
        //         resolve();
        //     }
        // });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-center text-2xl font-bold my-5">
                Create Your Account
            </h5>

            <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    id="name"
                    name="name"
                    placeholder="Name"
                    variant="flushed"
                    label="name"
                    ref={register({
                        required: true,
                        minLength: 3,
                        maxLength: 50,
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    variant="flushed"
                    ref={register({
                        required: true,
                        pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                    id-="username"
                    name="username"
                    placeholder="@username"
                    variant="flushed"
                    ref={register({
                        required: true,
                        minLength: 4,
                        maxLength: 15,
                    })}
                />
                <FormErrorMessage>
                    {errors.username && errors.username.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
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
                mt={4}
                float="right"
                colorScheme="blue"
                borderRadius={100}
                isLoading={formState.isSubmitting}
                type="submit">
                Submit
            </Button>
        </form>
    );
}

export default Signup;
