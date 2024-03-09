import React from 'react';
import Icon from '../assets/Icon.svg';
import Illustration from '../assets/signin.svg';
import { InputBox } from '../components/InputBox';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { Button } from '../components/Button';
import { ButtonWarning } from '../components/ButtonWarning';
// import OnlineBillPay from '../assets/unused/OnlineBillPay.mp4'; bg-[#DFE9F3] 

const Signin = () => {
return (
    <div className="flex lg:flex-row h-screen flex-1 flex-col justify-center items-center">
            {/* <video width="80%" height="80%" autoPlay loop muted>
                <source src={OnlineBillPay} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <div className="lg:w-1/2 h-screen p-4 bg-[#E5EEF3] flex justify-center items-center">
                <img src={Illustration} alt="Illustration" />
            </div>
            <div className="lg:w-1/2 p-4">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-16 w-auto" src={Icon} alt="Logo" />
                    <Heading label={"Sign in to your account"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                    <InputBox label="Email" placeholder="sneha@gmail.com" />
                    <InputBox label="Password" placeholder="1Ax23@!2*" />
                    <Button buttonText={"Sign In"} to="/dashboard"/>
                    </form>
                    <ButtonWarning label={"Don't have an account? "} buttonText={"Sign Up"} to="/signup" />
                    <ButtonWarning label={"By signing in, you agree to our "} buttonText={"Terms of Service"} to="/" />       
                </div>
            </div>
    </div>
    );
};

export default Signin;
