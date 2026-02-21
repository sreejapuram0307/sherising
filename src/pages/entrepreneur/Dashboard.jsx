import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ideaAPI } from '../../utils/api'

const Dashboard = () => {
  const [isListening, setIsListening] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('en-IN')
  const [category, setCategory] = useState('')
  const [fundingGoal, setFundingGoal] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

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
        setDescription(prev => (prev + ' ' + transcript).trim().slice(0, 500))
      }
    }

    recognition.start()
    
    setTimeout(() => {
      recognition.stop()
    }, 10000)
  }

  const handlePostIdea = async () => {
    setError('')
    
    if (!title || !description || !category || !fundingGoal) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      const result = await ideaAPI.create({
        title,
        description,
        category,
        fundingGoal: parseFloat(fundingGoal)
      })

      if (result.success) {
        setTitle('')
        setDescription('')
        setCategory('')
        setFundingGoal('')
        navigate('/entrepreneur-dashboard/my-ideas')
      } else {
        setError(result.message || 'Failed to post idea')
      }
    } catch (err) {
      setError('Server error. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Business Idea</h2>
        <p className="text-gray-600 mb-6">Use voice or type your vision</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Idea Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your business idea title"
              className="w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 bg-white"
            />
          </div>

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
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <span className="text-xs text-gray-500">{description.length}/500</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Funding Goal (₹)</label>
              <input
                type="number"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(e.target.value)}
                placeholder="500000"
                className="w-full rounded-2xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 bg-white"
              />
            </div>
          </div>

          <button
            onClick={handlePostIdea}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-2xl py-3 font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Idea ✨'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
