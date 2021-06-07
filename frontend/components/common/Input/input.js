import './input.scss';

function Input({ errorText, type, label, name, placeholder, onChange, value, maxLength }) {
    return (
        <div className="Input-Wrap">
            {errorText && <div data-testid="custom-error" className="Error-Text">{errorText}</div>}
            <input type={type} className="Input" name={name}
            data-testid="custom-input"
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