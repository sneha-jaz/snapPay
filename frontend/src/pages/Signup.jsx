import React from 'react';
import Icon from '../assets/Icon.svg';
import Illustration from '../assets/signup.svg';
import { InputBox } from '../components/InputBox';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { Button } from '../components/Button';
import { ButtonWarning } from '../components/ButtonWarning';

const Signup = () => {
return (
    <div className="flex lg:flex-row h-screen flex-1 flex-col justify-center items-center">
            <div className="lg:w-1/2 h-screen p-4 bg-[#E5EEF3] flex justify-center items-center">
                <img src={Illustration} alt="Illustration" />
            </div>
            <div className="lg:w-1/2 p-4">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-16 w-auto" src={Icon} alt="Logo" />
                    <Heading label={"Sign in to your account"} />
                    <SubHeading label={"Enter your information to create an account"} />
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                    <InputBox label="First Name" placeholder="Sneha" />
                    <InputBox label="Last Name" placeholder="Jaiswal" />    
                    <InputBox label="Email" placeholder="sneha@gmail.com" />
                    <InputBox label="Password" placeholder="1Ax23@!2*" />
                    <Button buttonText={"Sign Upn"} to="/dashboard"/>
                    </form>
                    <ButtonWarning label={"Already have an account? "} buttonText={"Sign In"} to="/signin" />
                    <ButtonWarning label={"By signing up, you agree to our "} buttonText={"Terms of Service"} to="/" />       
                </div>
            </div>
    </div>
    );
};

export default Signup;
