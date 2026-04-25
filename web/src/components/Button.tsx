import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  isLoading?: boolean
}

export function Button({ variant = 'primary', isLoading, children, ...props }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} ${isLoading ? 'is-loading' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <div className="spinner"></div> : children}
    </button>
  )
}
