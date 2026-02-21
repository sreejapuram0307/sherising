import { useState, useEffect, useRef } from 'react'
import { chatBotAPI } from '../utils/api'

const BusinessChatBot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Hello! I\'m your Business AI Assistant. I can help you with questions about startups, funding, investors, business models, and more. Ask me anything!',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadSuggestions()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadSuggestions = async () => {
    try {
      const result = await chatBotAPI.getSuggestions()
      if (result.success) {
        setSuggestions(result.data)
      }
    } catch (error) {
      console.error('Error loading suggestions:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputMessage('')
    setIsTyping(true)
    setShowSuggestions(false)

    try {
      const result = await chatBotAPI.ask(inputMessage)
      
      // Simulate typing delay
      setTimeout(() => {
        if (result.success) {
          const botMessage = {
            type: 'bot',
            text: result.data.answer,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, botMessage])
        } else {
          const errorMessage = {
            type: 'bot',
            text: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, errorMessage])
        }
        setIsTyping(false)
      }, 800)
    } catch (error) {
      console.error('Error asking chatbot:', error)
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion)
    setShowSuggestions(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🤖 Business AI Assistant</h2>
        <p className="text-gray-600">Get instant answers to your entrepreneurship and investment questions</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 flex flex-col h-[600px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                {msg.type === 'bot' && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                      🤖
                    </div>
                    <span className="text-xs font-semibold text-gray-700">AI Assistant</span>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                    🤖
                  </div>
                  <span className="text-xs font-semibold text-gray-700">AI Assistant</span>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-purple-50">
            <p className="text-xs font-semibold text-gray-600 mb-2">💡 Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 rounded-full text-xs bg-white hover:bg-purple-100 text-gray-700 border border-purple-200 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about business, startups, or funding..."
              className="flex-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !inputMessage.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Press Enter to send your message
          </p>
        </div>
      </div>
    </div>
  )
}

export default BusinessChatBot
