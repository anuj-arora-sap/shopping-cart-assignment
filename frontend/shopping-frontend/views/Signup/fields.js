export const fieldNames = {
    EMAIL: 'email',
    PASSWORD: 'password',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    CONFIRM_PASSWORD: 'confirmPassword'
};

function handleChange(event, preValues) {
    const { name, value } = event.target || {};
    return { ...preValues, [name]: value };
}

export const fields = {
    [fieldNames.EMAIL]: {
        handleChange,
    },
    [fieldNames.CONFIRM_PASSWORD] :{
        handleChange,
    },
    [fieldNames.FIRST_NAME]: {
        handleChange,
    },
    [fieldNames.LAST_NAME]: {
        handleChange,
    },
    [fieldNames.PASSWORD]: {
        handleChange,
    },
};