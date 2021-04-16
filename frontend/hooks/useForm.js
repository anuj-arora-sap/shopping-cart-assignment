import { useState } from 'react';

const useForm = ({
  initialValues, fields, handleSubmit: _handleSubmit, validate,
}) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isFormDirty, setFormDirty] = useState(false);

  const handleSubmit = (event, key = '') => {
    if (event) event.preventDefault();

    setFormDirty(true);
    const validationErrors = validate({ values }, key) || {};
    if (!Object.keys(validationErrors).length) {
      _handleSubmit(values, key);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (event, key = '') => {
    const { target: { name } } = event;
    if (event.persist) {
      event.persist();
    }
    const updatedValues = fields[name].handleChange(event, values);
    setValues(updatedValues);
    if (isFormDirty) {
      const validationErrors = validate({ values: updatedValues }, key) || {};
      setErrors(validationErrors);
    }
  };

  const handleBlur = (key) => {
    if (isFormDirty) {
      const validationErrors = validate({ values }, key) || {};
      setErrors(validationErrors);
    }
  };

  const handleKeyUp = (event, key) => {
    if (event.keyCode === 13) {
      handleSubmit(event, key);
    }
  };

  return {
    values,
    setValues,
    reset: () => {
      setFormDirty(false);
      setErrors({});
      setValues(initialValues);
    },
    resetFormErrors: () => {
      setFormDirty(false);
      setErrors({});
    },
    isFormDirty,
    errors,
    events: {
      onSubmit: handleSubmit,
      onBlur: handleBlur,
      onChange: handleChange,
      onKeyUp: handleKeyUp,
    },
  };
};

export default useForm;

