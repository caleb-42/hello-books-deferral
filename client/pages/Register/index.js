import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import context from '@context/authContext';
import InputForm from '@components/inputForm';
import Button from '@components/Button';
import { RegisterValidator } from '@clientValidators/auth';

const { AuthContext } = context;

const Register = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleError = response => {
        response
            ? setErrorMessage('Email Already exist')
            : setErrorMessage('Network Error!');
        setErrorState(true);
    };
    return (
        <div
            className="bg-no-repeat bg-center bg-cover  flex flex-col justify-center items-center sm:h-screen"
            style={{ background: `url(/images/12.jpg)` }}
        >
            <div className="relative inline-block px-0 py-5 sm:w-9/12 max-w-custom w-500">
                <h1 className=" text-5xl text-gray-550 text-center my-10 mt-0">
                    Register
                </h1>
                <Formik
                    initialValues={{
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: '',
                        passwordConfirmation: ''
                    }}
                    validationSchema={RegisterValidator}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setErrorState(false);
                        axios
                            .post('/api/v1/auth/signup', values)
                            .then(res => {
                                resetForm({
                                    email: '',
                                    firstName: '',
                                    lastName: '',
                                    password: '',
                                    passwordConfirmation: ''
                                });

                                const user_token = res.data.data.token;
                                const user_data = res.data.data.user;
                                setAuth(prevAuth => {
                                    prevAuth.token = user_token;
                                    prevAuth.user = user_data;
                                });
                                localStorage.setItem('token', user_token);
                                setSubmitting(false);
                            })
                            .catch(({ response }) => {
                                handleError(response);
                                setSubmitting(false);
                            });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="shadow-custom px-16 py-5 pb-8 sm:w-12/12 sm:rounded-54 bg-white text-center"
                        >
                            <InputForm
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                name="firstName"
                                labelname="First-name"
                                id="firstName"
                                type="text"
                                value={values.firstName}
                            />
                            <InputForm
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                name="lastName"
                                labelname="Last-name"
                                id="lastName"
                                type="text"
                                value={values.lastName}
                            />
                            <InputForm
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                name="email"
                                labelname="Email"
                                id="email"
                                type="email"
                                value={values.email}
                            />
                            <InputForm
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                name="password"
                                labelname="Password"
                                id="password"
                                type="password"
                                value={values.password}
                            />
                            <InputForm
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                name="passwordConfirmation"
                                labelname="Confirm password"
                                id="con-password"
                                type="password"
                                value={values.passwordConfirmation}
                            />
                            <Button isSubmitting={isSubmitting}>
                                Register
                            </Button>
                            {errorState && (
                                <div className="font-raleway py-3 pb-0  bottom-0  w-full px-4 text-lg sm:px-0 text-red-500 text-center ">
                                    {errorMessage}
                                </div>
                            )}
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
