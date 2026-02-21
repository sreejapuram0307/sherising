import { useState, useEffect, useRef } from 'react'
import { ideaChatAPI } from '../utils/api'

const IdeaChatModal = ({ idea, onClose }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const currentUserId = localStorage.getItem('userId')

  useEffect(() => {
    loadChatData()
    const interval = setInterval(loadMessages, 3000) // Poll every 3 seconds
    return () => clearInterval(interval)
  }, [idea._id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadChatData = async () => {
    try {
      const [messagesResult, participantsResult] = await Promise.all([
        ideaChatAPI.getMessages(idea._id),
        ideaChatAPI.getParticipants(idea._id)
      ])

      if (messagesResult.success) {
        setMessages(messagesResult.data)
      }

      if (participantsResult.success) {
        setParticipants(participantsResult.data)
      }
    } catch (error) {
      console.error('Error loading chat:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async () => {
    try {
      const result = await ideaChatAPI.getMessages(idea._id)
      if (result.success) {
        setMessages(result.data)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!newMessage.trim()) return

    try {
      const result = await ideaChatAPI.sendMessage(idea._id, newMessage)
      if (result.success) {
        setMessages([...messages, result.data])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{idea.title}</h3>
            <p className="text-sm text-gray-600">{participants.length} participants</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Participants */}
        <div className="border-b border-gray-200 p-3 bg-purple-50">
          <div className="flex flex-wrap gap-2">
            {participants.map((participant, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                  {participant.name.charAt(0)}
                </div>
                <span className="font-medium">{participant.name}</span>
                <span className="text-gray-500">({participant.role})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isCurrentUser = msg.senderId._id === currentUserId
              return (
                <div
                  key={idx}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!isCurrentUser && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-semibold">
                          {msg.senderName.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-semibold text-gray-700">
                        {isCurrentUser ? 'You' : msg.senderName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-2"
            />
            <button
              onClick={handleSend}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeaChatModal
