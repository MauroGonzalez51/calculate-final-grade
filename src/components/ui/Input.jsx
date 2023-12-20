import PropTypes from "prop-types";
import { twJoin } from "tailwind-merge";

export function Input({ className, ...props }) {
    return (
        <input
            {...props}
            className={twJoin(
                "p-4 border border-solid rounded-md outline-none placeholder:italic flex-grow border-blue-400 placeholder:text-black focus:border-purple-700",
                className,
            )}
        />
    );
}

Input.propTypes = {
    className: PropTypes.string,
};

export default Input;
