import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('en-IN')
  const [category, setCategory] = useState('')
  const [funding, setFunding] = useState('')
  const [visibility, setVisibility] = useState('public')
  const navigate = useNavigate()
  const userName = localStorage.getItem('name') || 'Demo User'

  const languages = [
    { code: 'en-IN', label: 'English' },
    { code: 'hi-IN', label: 'Hindi' },
    { code: 'te-IN', label: 'Telugu' }
  ]

  const categories = ['Beauty', 'Books', 'Tech', 'Handmade', 'Fashion', 'Food', 'Healthcare', 'Education']

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = language
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    
    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript
        }
      }
      if (transcript) {
        setText(prev => (prev + ' ' + transcript).trim().slice(0, 300))
      }
    }

    recognition.start()
    
    setTimeout(() => {
      recognition.stop()
    }, 10000)
  }

  const handlePostIdea = () => {
    if (!text || !category || !funding) {
      alert('Please fill all fields')
      return
    }

    const ideas = JSON.parse(localStorage.getItem('sherise_all_ideas') || '[]')
    
    const newIdea = {
      id: Date.now(),
      author: userName,
      role: 'entrepreneur',
      text,
      language: languages.find(l => l.code === language)?.label || 'English',
      funding,
      category,
      visibility,
      likes: 0,
      comments: [],
      date: new Date().toLocaleDateString()
    }

    ideas.push(newIdea)
    localStorage.setItem('sherise_all_ideas', JSON.stringify(ideas))
    
    setText('')
    setCategory('')
    setFunding('')
    
    navigate('/entrepreneur-dashboard/my-ideas')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Business Idea</h2>
        <p className="text-gray-600 mb-6">Use voice or type your vision</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 bg-white"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Your Idea</label>
              <span className="text-xs text-gray-500">{text.length}/300</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 300))}
              placeholder="Describe your business idea..."
              rows="6"
              className="w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 resize-none bg-white"
            />
            <button
              onClick={startVoiceRecording}
              disabled={isListening}
              className={`mt-3 px-6 py-2 rounded-xl font-semibold transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-orange-400 to-pink-400 text-white hover:scale-105'
              }`}
            >
              {isListening ? '🎤 Listening...' : '🎤 Start Voice Input'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 bg-white"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Funding Goal</label>
              <input
                type="text"
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                placeholder="₹ 5,00,000"
                className="w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Visibility</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 font-medium">Public</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 font-medium">Private</span>
              </label>
            </div>
          </div>

          <button
            onClick={handlePostIdea}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl py-3 font-semibold hover:scale-105 transition-all"
          >
            Post Idea ✨
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
