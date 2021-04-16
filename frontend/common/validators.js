const passwordRegex = new RegExp('^(?=.{8,30})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$');
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const nameRegex = new RegExp(/^(?=.{2,26})(?!.*\s\s)[a-zA-Z ]*[a-zA-Z]$/);

export function validateRequire(value = '') {
    return value && !!value.trim();
}

export function validatePassword(value = '') {
    return passwordRegex.test(value);
}

export function validateEmail(value = '') {
    return emailRegex.test(value);
}

export function validateName(value = '') {
    return nameRegex.test(value);
}