
const Icons = {
    cart: () => (
        <svg xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
    ),
    cross: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <g fill="none" fillRule="evenodd">
                <path d="M0 0H20V20H0z" />
                <g stroke="#4C4C4C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5px">
                    <path d="M12 0L0 12M0 0L12 12" transform="translate(4 4)" />
                </g>
            </g>
        </svg>
    ),
    'error-info': () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <g fill="none" fillRule="evenodd">
                <path d="M0 0H20V20H0z" />
                <g fillRule="nonzero">
                    <path fill="#ED3035" d="M8.333 0C3.738 0 0 3.738 0 8.333c0 4.596 3.738 8.334 8.333 8.334 4.596 0 8.334-3.738 8.334-8.334C16.667 3.738 12.929 0 8.333 0z" transform="translate(1.667 1.667)" />
                    <path fill="#ECEFF1" d="M9.028 12.5c0 .384-.311.694-.695.694-.383 0-.694-.31-.694-.694 0-.384.31-.694.694-.694.384 0 .695.31.695.694z" transform="translate(1.667 1.667)" />
                    <path fill="#FAFAFA" d="M9.028 9.722c0 .384-.311.695-.695.695-.383 0-.694-.311-.694-.695V4.167c0-.384.311-.695.694-.695.384 0 .695.311.695.695v5.555z" transform="translate(1.667 1.667)" />
                </g>
            </g>
        </svg>
    ),
    'success-info': () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <g fill="none" fillRule="evenodd">
                <path d="M0 0H20V20H0z" />
                <path fill="#60DB91" fillRule="nonzero" d="M10.333 2C5.73 2 2 5.73 2 10.333c0 4.602 3.73 8.332 8.333 8.332 4.602 0 8.332-3.73 8.332-8.332-.005-4.6-3.732-8.328-8.332-8.333zm4.587 5.778l-5.952 5.951c-.233.233-.61.233-.842 0l-2.38-2.38c-.237-.229-.243-.605-.015-.842.228-.236.605-.243.841-.015l.015.015 1.96 1.96 5.531-5.531c.237-.228.613-.222.842.015.223.23.223.596 0 .827z" />
            </g>
        </svg>
    )
};

export default function Icon({ name, ...restProps }) {
    return Icons[name](restProps);
}