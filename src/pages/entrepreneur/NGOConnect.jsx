const NGOConnect = () => {
  const ngos = [
    {
      name: 'SEWA (Self Employed Women\'s Association)',
      focus: 'Women\'s economic empowerment',
      services: 'Microfinance, Training, Healthcare',
      contact: 'contact@sewa.org'
    },
    {
      name: 'Mann Deshi Foundation',
      focus: 'Rural women entrepreneurs',
      services: 'Business training, Banking, Digital literacy',
      contact: 'info@manndeshi.org'
    },
    {
      name: 'Azad Foundation',
      focus: 'Women\'s livelihood',
      services: 'Skill development, Employment support',
      contact: 'info@azadfoundation.com'
    },
    {
      name: 'Breakthrough India',
      focus: 'Women\'s rights and empowerment',
      services: 'Leadership training, Advocacy',
      contact: 'contact@breakthrough.tv'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">NGO Connect</h2>
      <p className="text-gray-600 mb-6">Partner with NGOs supporting women entrepreneurs</p>

      <div className="space-y-4">
        {ngos.map((ngo, idx) => (
          <div key={idx} className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{ngo.name}</h3>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Focus:</span> {ngo.focus}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Services:</span> {ngo.services}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Contact:</span> {ngo.contact}
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold hover:scale-105 transition-all">
              Connect Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NGOConnect
