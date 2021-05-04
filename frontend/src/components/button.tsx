import React from "react";

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button: React.FC<IButtonProps> = ({ canClick, loading, actionText }) => (
    <button className={`py-3 px-5 text-white text-2xl rounded-lg focus:outline-none transition-colors ${canClick ? "bg-red-800 hover:bg-red-900" : "bg-gray-400 pointer-events-none"}`}>
        {loading ? "Loading..." : actionText}
    </button>
);
