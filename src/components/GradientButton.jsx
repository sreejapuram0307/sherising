const GradientButton = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-white rounded-2xl py-3 font-semibold hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
    >
      {children}
    </button>
  )
}

export default GradientButton
