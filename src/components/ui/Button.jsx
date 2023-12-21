import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export function Button({ children, className, ...props }) {
    return (
        <button {...props} className={twMerge("p-4 flex-grow border border-solid rounded-md", className)}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Button;
