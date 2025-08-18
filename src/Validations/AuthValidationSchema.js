import * as Yup from 'yup';

export const LoginvalidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});


export const RegisterValidationSchema = Yup.object({
    first_name: Yup.string()
        .required('First name is required'),

    last_name: Yup.string()
        .required('Last name is required'),

    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    country: Yup.string()
        .required('Country is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),

    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});