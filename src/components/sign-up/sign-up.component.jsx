import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument }  from '../../firebase/firebase.utils'
import './sign-up.styles.scss'

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event=>{
        event.preventDefault(); //prevent default functionality
        const {displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword  ){
            alert("passwords don't match");
            return;
        }

        try{
            //use firebase auth's method to create new user
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            //create new user profile document on the firebase store
            createUserProfileDocument(user, {displayName});

            //To clear the values of SignUp
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        }catch(error)
        {
            console.log(error);
        }
        
    };

    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({
            //whatever it that property, set the value of the property from the controls below
            [name]:value
        });
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'> I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit} >
                    <FormInput 
                      type='text'
                      name='displayName'
                      value={displayName}
                      onChange={this.handleChange}
                      label='Display Name'
                      required
                      >
                    </FormInput>
                    <FormInput 
                      type='email'
                      name='email'
                      value={email}
                      onChange={this.handleChange}
                      label='Email'
                      required
                      >
                    </FormInput>
                    <FormInput
                     type='password'
                     name='password'
                     value={password}
                     onChange={this.handleChange}
                     label='Password'
                     required
                    >
                    </FormInput>
                    <FormInput
                      type='password'
                      name='confirmPassword'
                      value={confirmPassword}
                      onChange={this.handleChange}
                      label='Confirm Password'
                      required
                     >
                    </FormInput>
                    <CustomButton type='submit'>
                        SIGN UP
                    </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;