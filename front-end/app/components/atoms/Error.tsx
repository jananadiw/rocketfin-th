import React from "react";

interface ErrorProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 text-center">
        <p className="text-xl font-bold">Error</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
