const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`backdrop-blur-xl bg-white/60 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl p-8 ${className}`}>
      {children}
    </div>
  )
}

export default GlassCard
