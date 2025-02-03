const CustomButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
