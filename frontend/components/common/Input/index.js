import './input.scss';

function Input({ errorText, type, label, name, placeholder, onChange, value, maxLength }) {
    return (
        <div className="Input-Wrap">
            {errorText && <div className="Error-Text">{errorText}</div>}
            <input type={type} className="Input" name={name}
                placeholder={placeholder} onChange={onChange}
                value={value}
                maxLength={maxLength}
            />
            <label for={name} className="Input-Label">
                {label}
            </label>
        </div>
    )
}

export default Input;