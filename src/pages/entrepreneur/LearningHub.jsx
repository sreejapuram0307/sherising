const LearningHub = () => {
  const videos = {
    Telugu: [
      {
        title: 'Business Ideas for Women',
        url: 'https://youtu.be/by9bvptoDD8?si=PhxfNL_2OO0A5IVC',
        icon: '🎯'
      },
      {
        title: 'Women Entrepreneur Success',
        url: 'https://youtu.be/iCHEUKbhKCk?si=OnHLuhPJjQ72jmT4',
        icon: '🌟'
      }
    ],
    Hindi: [
      {
        title: 'Startup Guide Hindi',
        url: 'https://youtu.be/gAWPm4tp3bE?si=PKtoim4RJ-jXnFhr',
        icon: '🚀'
      },
      {
        title: 'Small Business Hindi',
        url: 'https://youtu.be/NXXjY68tL84?si=AMZYlh9Z8eL_utwY',
        icon: '💼'
      }
    ],
    English: [
      {
        title: 'Startup Basics',
        url: 'https://youtu.be/wxyGeUkPYFM?si=SMWyAzwIKm0qAHXo',
        icon: '📚'
      },
      {
        title: 'Business Growth',
        url: 'https://youtu.be/eHJnEHyyN1Y?si=ijhGin0_0dbALxj5',
        icon: '📈'
      }
    ]
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Learn & Grow</h2>
      <p className="text-gray-600 mb-6">Curated resources for women entrepreneurs</p>

      {Object.entries(videos).map(([language, videoList]) => (
        <div key={language} className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">{language}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoList.map((video, idx) => (
              <div
                key={idx}
                onClick={() => window.open(video.url, '_blank')}
                className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6 cursor-pointer hover:scale-105 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{video.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">{video.title}</h4>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-purple-200 text-purple-800 font-medium">
                      {language}
                    </span>
                  </div>
                  <div className="text-2xl">▶️</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LearningHub
