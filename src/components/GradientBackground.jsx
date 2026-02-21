const GradientBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-purple-300 relative overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>
      
      {children}
    </div>
  )
}

export default GradientBackground
