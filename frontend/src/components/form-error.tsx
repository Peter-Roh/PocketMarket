import React from 'react';

interface IFormErrorProps {
    errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({errorMessage}) => (
    <span className="text-lg text-red-500">
        {errorMessage}
    </span>
);
