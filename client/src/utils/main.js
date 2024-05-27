// Helper function to calculate age from birthday
const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Update your validation function to include age validation
const validateSignUpForm = (data) => {
    let errors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.includes('@')) errors.email = 'Email must be valid';
    if (data.password.length < 8) errors.password = 'Password must be at least 8 characters long';
    if (!data.birthday) {
        errors.birthday = 'Birthday is required';
    } else {
        const age = calculateAge(data.birthday);
        if (age < 19) errors.birthday = 'You must be at least 19 years old';
    }
    return errors;
};
