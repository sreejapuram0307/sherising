const GovernmentSchemes = () => {
  const schemes = [
    {
      name: 'Stand-Up India Scheme',
      for: 'Women entrepreneurs starting new businesses',
      loan: '₹10 lakh – ₹1 crore',
      sectors: 'Manufacturing, Services, Trading',
      description: 'Stand-Up India provides bank loans for first-time women entrepreneurs.',
      link: 'https://www.standupmitra.in'
    },
    {
      name: 'Mahila Coir Yojana',
      for: 'Women in coir & rural industries',
      support: 'Subsidy for machinery + training',
      link: 'https://coirboard.gov.in/schemes'
    },
    {
      name: 'Mudra Yojana (PMMY)',
      loan: 'Up to ₹10 lakh',
      types: 'Shishu / Kishore / Tarun',
      link: 'https://www.mudra.org.in'
    },
    {
      name: 'TREAD Scheme',
      support: 'Training + grants + loans',
      link: 'https://msme.gov.in/schemes'
    },
    {
      name: 'Udyogini Scheme',
      loan: 'Up to ₹3 lakh',
      link: 'https://kmdc.karnataka.gov.in'
    },
    {
      name: 'Startup India',
      description: 'Government initiative for nurturing innovation and startups',
      link: 'https://www.startupindia.gov.in'
    },
    {
      name: 'SIDBI Startup Assistance',
      description: 'Financial support for startups and MSMEs',
      link: 'https://www.sidbi.in'
    },
    {
      name: 'Atal Innovation Mission',
      description: 'Promoting innovation and entrepreneurship',
      link: 'https://aim.gov.in'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Government Schemes</h2>
      <p className="text-gray-600 mb-6">Financial support for women entrepreneurs</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6 hover:scale-105 transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{scheme.name}</h3>
            
            {scheme.for && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">For:</span> {scheme.for}
              </p>
            )}
            
            {scheme.loan && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Loan:</span> {scheme.loan}
              </p>
            )}
            
            {scheme.sectors && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Sectors:</span> {scheme.sectors}
              </p>
            )}
            
            {scheme.support && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Support:</span> {scheme.support}
              </p>
            )}
            
            {scheme.types && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Types:</span> {scheme.types}
              </p>
            )}
            
            {scheme.description && (
              <p className="text-sm text-gray-600 mb-4 italic">{scheme.description}</p>
            )}
            
            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-semibold hover:scale-105 transition-all"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GovernmentSchemes
