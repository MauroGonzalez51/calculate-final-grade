import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export function Row({ children, className, ...props }) {
    return (
        <div
            {...props}
            className={twMerge(
                "flex flex-col lg:flex-row p-4 border border-solid border-purple-700 rounded-md m-4 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
}

Row.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Row;
