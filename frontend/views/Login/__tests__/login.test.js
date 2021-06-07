jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        SOME_VARIABLE_HERE: 'whatever-you-want-here'
    }
}))
import { render, screen, fireEvent } from '@testing-library/react';

import { Login } from '../login';

describe("Login Page", () => {
    it("render", () => {
        // render(<Login />)
    })
})