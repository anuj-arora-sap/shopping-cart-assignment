import { connect } from 'react-redux';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import useForm from '../../hooks/useForm';
import errorMessages from '../../common/errorMessages';
import { loginUser } from '../../redux/actions/login';
import { validateRequire, validateEmail, validatePassword } from '../../common/validators';
import { fieldNames, fields } from './fields';

import './login.scss';

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

    return errors;
}

function handleSubmit(values) {
    this.loginUser({...values});
}

function Login({ loginUser }) {
    const {
        values, errors, events,
    } = useForm({
        initialValues: {},
        handleSubmit: handleSubmit.bind({ loginUser }),
        fields,
        validate: validate,
    });

    const {
        onBlur, onKeyUp, onChange, onSubmit,
    } = events;
    return (
        <div className="Login-Container">
            <Header />
            <div className="Login-Wrapper Flex">
                <div className="Title">
                    <h1>Login</h1>
                    <p>Get access to your Orders,Wishlists and Recommendations</p>
                </div>
                <div className="Login-Form">
                    <div className="Field Email">
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
                    <button onClick={onSubmit}
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="Copy">
                Copyright @ 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd
                </div>
        </div>
    )
}

function mapStateToProps({ login }) {
    return { login };
}

export default connect(
    mapStateToProps,
    {
        loginUser
    }
)(Login);
