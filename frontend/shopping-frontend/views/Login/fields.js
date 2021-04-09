export const fieldNames = {
    EMAIL: 'email',
    PASSWORD: 'password',
};

function handleChange(event, preValues) {
    const { name, value } = event.target || {};
    return { ...preValues, [name]: value };
}

export const fields = {
    [fieldNames.EMAIL]: {
        handleChange,
    },
    [fieldNames.PASSWORD]: {
        handleChange,
    },
};