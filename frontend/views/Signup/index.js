import { useRouter } from 'next/router'
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import useForm from '../../hooks/useForm';
import errorMessages from '../../common/errorMessages';
import { validateRequire, validateEmail, validatePassword, validateName } from '../../common/validators';
import { fieldNames, fields } from './fields';

import './signup.scss';
// import Router from 'next/dist/next-server/server/router';

function validate({ values = {} }) {
    const errors = {};
    if (!validateRequire(values[fieldNames.EMAIL])) {
        errors[fieldNames.EMAIL] = errorMessages.requireField;
    } else if (!validateEmail(values[fieldNames.EMAIL])) {
        errors[fieldNames.EMAIL] = errorMessages.emailNotValid;
    }

    if (!validateRequire(values[fieldNames.PASSWORD])) {
        errors[fieldNames.PASSWORD] = errorMessages.requireField;
    } else if (!validatePassword(values[fieldNames.PASSWORD])) {
        errors[fieldNames.PASSWORD] = errorMessages.passwordNotValid;
    }

    if (!validateRequire(values[fieldNames.CONFIRM_PASSWORD])) {
        errors[fieldNames.CONFIRM_PASSWORD] = errorMessages.requireField;
    } else if (values[fieldNames.PASSWORD]
        && values[fieldNames.PASSWORD]
        && (values[fieldNames.PASSWORD] !== values[fieldNames.CONFIRM_PASSWORD])) {
        errors[fieldNames.CONFIRM_PASSWORD] = errorMessages.passwordNotMatch;
    }

    if (!validateRequire(values[fieldNames.FIRST_NAME])) {
        errors[fieldNames.FIRST_NAME] = errorMessages.requireField;
    } else if (!validateName(values[fieldNames.FIRST_NAME])) {
        errors[fieldNames.FIRST_NAME] = errorMessages.nameNotValid;
    }

    if (!validateRequire(values[fieldNames.LAST_NAME])) {
        errors[fieldNames.LAST_NAME] = errorMessages.requireField;
    } else if (!validateName(values[fieldNames.LAST_NAME])) {
        errors[fieldNames.LAST_NAME] = errorMessages.nameNotValid;
    }
    return errors;
}

function handleSubmit() {
    this.router.push('/login');
}

function Signup() {
    const router = useRouter()
    const {
        values, errors, events,
    } = useForm({
        initialValues: {},
        handleSubmit: handleSubmit.bind({router}),
        fields,
        validate: validate,
    });

    const {
        onBlur, onKeyUp, onChange, onSubmit,
    } = events;
    return (
        <div className="Signup-Container">
            <Header />
            <div className="Signup-Wrapper Flex">
                <div className="Title">
                    <h1>Signup</h1>
                    <p>We do not share personal details with anyone</p>
                </div>
                <div className="Signup-Form">
                    <div className="Field">
                        <Input
                            name={fieldNames.FIRST_NAME}
                            label="First Name"
                            placeholder="First Name"
                            type="text"
                            value={values[fieldNames.FIRST_NAME]}
                            errorText={
                                errors[fieldNames.FIRST_NAME]
                            }
                            onBlur={onBlur}
                            onKeyUp={onKeyUp}
                            onChange={onChange}
                        />
                    </div>
                    <div className="Field">
                        <Input
                            name={fieldNames.LAST_NAME}
                            label="Last Name"
                            placeholder="Last Name"
                            type="text"
                            value={values[fieldNames.LAST_NAME]}
                            errorText={
                                errors[fieldNames.LAST_NAME]
                            }
                            onBlur={onBlur}
                            onKeyUp={onKeyUp}
                            onChange={onChange}
                        />
                    </div>
                    <div className="Field">
                        <Input
                            name={fieldNames.EMAIL}
                            label="Email"
                            placeholder="Email"
                            type="email"
                            value={values[fieldNames.EMAIL]}
                            errorText={
                                errors[fieldNames.EMAIL]
                            }
                            onBlur={onBlur}
                            onKeyUp={onKeyUp}
                            onChange={onChange}
                        />
                    </div>
                    <div className="Field">
                        <Input
                            name={fieldNames.PASSWORD}
                            label="Password"
                            type="password"
                            placeholder="Password"
                            value={values[fieldNames.PASSWORD]}
                            errorText={
                                errors[fieldNames.PASSWORD]
                            }
                            maxLength={30}
                            onBlur={onBlur}
                            onKeyUp={onKeyUp}
                            onChange={onChange}
                        />
                    </div>
                    <div className="Field">
                        <Input
                            name={fieldNames.CONFIRM_PASSWORD}
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm Password"
                            value={values[fieldNames.CONFIRM_PASSWORD]}
                            errorText={
                                errors[fieldNames.CONFIRM_PASSWORD]
                            }
                            maxLength={30}
                            onBlur={onBlur}
                            onKeyUp={onKeyUp}
                            onChange={onChange}
                        />
                    </div>
                    <button onClick={onSubmit}
                    >
                        Signup
                    </button>
                </div>
            </div>
            <div className="Copy">
                Copyright @ 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd
                </div>
        </div>
    )
}

export default Signup;