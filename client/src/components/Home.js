import React, { useState } from 'react';

function SignIn() {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login Form Data:', formData);
        // Add login logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignIn;
