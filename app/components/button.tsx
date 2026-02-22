interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  loadingText?: string;
  title?: string;
  tooltip?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  loading = false,
  disabled = false,
  onClick,
  className,
  loadingText = "Loading ...",
  title,
  tooltip,
}) => {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      disabled={isDisabled}
      title={title}
      data-tip={tooltip || undefined}
      className={`tooltip tooltip-top font-medium ${isDisabled ? "opacity-75 cursor-not-allowed" : "hover:opacity-85 cursor-pointer"} ${className}`}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex justify-center items-center gap-2">
          <span className="loading loading-spinner loading-sm text-white"></span>
          {loadingText && <p>{loadingText}</p>}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
