import PropTypes from 'prop-types'
import './dropdown.scss';

function DropDown({selectedValue = '' ,handleChange, options}) {
    return(
        <div className="Select-Container styled-select">
          <select className="Select" value={selectedValue} onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
    )
}

DropDown.defaultProps= {
    selectedValue: '',
    options: [],
}

DropDown.propTypes = {
    options: PropTypes.array,
    selectedValue: PropTypes.string,
    handleChange: PropTypes.func.isRequired
};

export default DropDown;