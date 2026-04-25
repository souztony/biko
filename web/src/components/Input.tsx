import './Input.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input className={error ? 'has-error' : ''} {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}
