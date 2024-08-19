"use client"

import { useState } from "react"
import BankLogo from "./BankLogo"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/user.actions"

const AuthForm = ({ type }: { type: String }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const [show, setShow] = useState(false)

    const formSchema = authFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            if (type === "sign-up") {
                const newUser = await signUp(data)
                setUser(newUser)

                if (newUser) router.push("/sign-in");
            }

            if (type === "sign-in") {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                
                if (response.code !== 401 || response.type !== "user_invalid_credentials") router.push("/");
                setError(response?.response?.message);
            }
            setIsLoading(false)
        } catch (error) {
            console.error("Error in onSubmit:", error);  // Improved error log
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <BankLogo />
                <div className="flex flex-col gap-1">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user ? "Link Account" :
                            type === "sign-in" ? "Sign In" : "Sign Up"
                        }
                        <p className="text-16 font-normal text-gray-600">
                            {
                                user ? "Link account to get started" :
                                    "Please enter your credentials"
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ?
                <div className="flex flex-col gap-4">
                    {/* Plaid Link */}
                </div>
                : <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "sign-up" && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput
                                            name={"firstName"}
                                            label={"First Name"}
                                            control={form.control}
                                            placeholder="Enter your first name"
                                        />
                                        <CustomInput
                                            name={"lastName"}
                                            label={"Last Name"}
                                            control={form.control}
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput
                                            name={"dob"}
                                            label={"Date of Birth"}
                                            control={form.control}
                                            placeholder="e.g. YYYY-MM-DD"
                                        />
                                        <CustomInput
                                            name={"adhaarNumber"}
                                            label={"Adhaar Card Number"}
                                            control={form.control}
                                            placeholder="e.g. 1234 5678 9101 1121"
                                        />
                                    </div>
                                    <CustomInput
                                        name={"address1"}
                                        label={"Address"}
                                        control={form.control}
                                        placeholder="Enter your full address"
                                    />
                                    <div className="flex gap-4">
                                        <CustomInput
                                            name={"city"}
                                            label={"City"}
                                            control={form.control}
                                            placeholder="e.g. Bengaluru"
                                        />
                                        <CustomInput
                                            name={"pinCode"}
                                            label={"Pin Code"}
                                            control={form.control}
                                            placeholder="e.g. 515411"
                                        />
                                    </div>
                                    <CustomInput
                                        name={"state"}
                                        label={"State"}
                                        control={form.control}
                                        placeholder="e.g. Karnataka"
                                    />
                                </>
                            )}

                            <CustomInput
                                name={"email"}
                                label={"Email"}
                                control={form.control}
                                placeholder="Enter your email"
                            />

                            <CustomInput
                                name={"password"}
                                label={"Password"}
                                control={form.control}
                                placeholder="Enter your password"
                            // show={show}
                            // setShow={setShow}
                            />
                            <div className="flex flex-col gap-4">
                                <Button type="submit"
                                    className="form-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ?
                                        <>
                                            <Loader2 size={20}
                                                className="animate-spin" />&nbsp;Loading...
                                        </> : type === "sign-in" ? "Sign In"
                                            : "Sign Up"
                                    }
                                </Button>
                            </div>
                            {error && (
                                <p className="text-14 font-normal text-center text-red-500">
                                {error}</p>
                            )}
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === "sign-in" ?
                                "Don't have an account?" :
                                "Already have an account?"}</p>
                        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className="form-link"
                        >{type === "sign-in" ? "Sign Up"
                            : "Sign In"}</Link>
                    </footer>
                </>
            }
        </section>
    )
}

export default AuthForm
