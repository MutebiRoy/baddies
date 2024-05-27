import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../SignUp.css';
import SignUpPageLogo from '../images/logo.png';


// Yup schema for validation
const signupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(20, 'Name must not exceed 20 characters')
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(30, 'Password must not exceed 30 characters')  // Ensuring passwords are not too long
        .matches(/[a-z]/, 'Password must contain at least one lowercase, uppercase letters & a number')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase, lowercase letters & a number')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*#?&]/, 'Password must contain at least one special character')
        .required('Password is required'),
    birthday: Yup.date()
        .required('Birthday is required')
        .test('age', 'You must be at least 19 years old', value => {
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= 19;
        }),
});

function SignUp() {
    const [serverError, setServerError] = useState('');
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            birthday: ''
        },
        validationSchema: signupSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post('http://localhost:3001/api/users', values);
                console.log('Server Response:', response.data);
                resetForm();
                setSubmitting(false);
                // Handle redirection or success message here
                setServerError(''); // Clear any existing errors
            } catch (error) {
                console.error('Signup Error:', error);
                // Handle errors here, such as displaying a message to the user
                setSubmitting(false);
                setServerError(error.response ? error.response.data.error : 'Error connecting to server');
            }
        },
    });

    return (
        <div className="signup-container">
            <img className="login-logo" src={SignUpPageLogo} alt="Logo" />
            <h3 className="signupH3">You have to be 19+ years to join</h3>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Username"  // Changed from 'Name'
                    name="username" // Changed from 'name'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                {formik.errors.username && <div className="error">{formik.errors.username}</div>}

                <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email && <div className="error">{formik.errors.email}</div>}

                <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password && <div className="error">{formik.errors.password}</div>}

                <input
                    type="date"
                    className="form-input"
                    name="birthday"
                    onChange={formik.handleChange}
                    value={formik.values.birthday}
                />
                {formik.errors.birthday && <div className="error">{formik.errors.birthday}</div>}

                <button className="signup-button" type="submit">Sign Up</button>
                {serverError && <div className="error">{serverError}</div>}
            </form>
            <div className="signup-footer">
                <p>Already have an account? <a href="/SignIn">Log in</a></p>
            </div>
        </div>
    );
}

export default SignUp;
