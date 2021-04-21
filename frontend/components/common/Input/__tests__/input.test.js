jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
      SOME_VARIABLE_HERE: 'whatever-you-want-here'
    }
  }))
import {render, screen, fireEvent } from '@testing-library/react';

import Input from '../input';

describe("Input Page",  () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            errorText: '',
            type: 'text',
            label: 'email',
            name: 'email',
            placeholder:'',
            //onChange: jest.fn(),
            value:'',
            maxLength: 10
        }
    })
    it("check input is input", () => {
        const handleChange = jest.fn();
        const utils = render(<Input onChange={handleChange} {...expectedProps}/>)
        const element = screen.getByTestId('custom-input')
        expect(element).toBeTruthy()
    })

    it("check for the error", () => {
        expectedProps.errorText= "Required";
        const handleChange = jest.fn();
        const utils = render(<Input onChange={handleChange} {...expectedProps}/>)
        const element = screen.getByTestId('custom-error')
        expect(element).toBeTruthy()
    })

    it("should called on change when input is changed", () => {
        const handleChange = jest.fn();
        const utils = render(<Input onChange={handleChange} {...expectedProps}/>)
        const element = screen.getByTestId('custom-input')
        fireEvent.change(element, { target: { value: '23' } })
        expect(handleChange).toHaveBeenCalledTimes(1)
    })
})