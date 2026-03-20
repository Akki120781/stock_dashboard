import React from 'react';
import SignupForm from '../components/auth/SignupForm';
import AuthLayout from '../components/common/AuthLayout';

const SignupPage = () => {
    return (
        <AuthLayout>
            <SignupForm />
        </AuthLayout>
    );
};

export default SignupPage;
