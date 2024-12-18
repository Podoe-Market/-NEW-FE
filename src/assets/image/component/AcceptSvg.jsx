const AcceptSvg = ({ fill = "black", opacity = "1", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <g opacity={opacity}>
        <path
          d="M11.9502 19.0331L7 14.0818L8.64967 12.4321L11.9502 15.7314L18.5488 9.13159L20.1997 10.7824L11.9502 19.0331Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.16675 14.0001C1.16675 6.91258 6.91258 1.16675 14.0001 1.16675C21.0876 1.16675 26.8334 6.91258 26.8334 14.0001C26.8334 21.0876 21.0876 26.8334 14.0001 26.8334C6.91258 26.8334 1.16675 21.0876 1.16675 14.0001ZM14.0001 24.5001C12.6212 24.5001 11.2558 24.2285 9.9819 23.7008C8.70799 23.1731 7.55048 22.3997 6.57546 21.4247C5.60044 20.4497 4.82702 19.2922 4.29935 18.0183C3.77167 16.7443 3.50008 15.379 3.50008 14.0001C3.50008 12.6212 3.77167 11.2558 4.29935 9.9819C4.82702 8.70799 5.60044 7.55048 6.57546 6.57546C7.55048 5.60044 8.70799 4.82702 9.9819 4.29935C11.2558 3.77167 12.6212 3.50008 14.0001 3.50008C16.7849 3.50008 19.4556 4.60633 21.4247 6.57546C23.3938 8.54459 24.5001 11.2153 24.5001 14.0001C24.5001 16.7849 23.3938 19.4556 21.4247 21.4247C19.4556 23.3938 16.7849 24.5001 14.0001 24.5001Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default AcceptSvg;