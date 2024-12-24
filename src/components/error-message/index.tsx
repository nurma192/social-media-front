import React from 'react';

type Props = {
    error: string;
}

const ErrorMessage = ({error = ''}:Props) => {
    return error && <p className="text-red-500 mt-2 mb-5 text-small">{error}</p>
};

export default ErrorMessage;