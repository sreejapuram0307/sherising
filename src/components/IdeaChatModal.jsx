import { useState, useEffect, useRef } from 'react'
import { ideaChatAPI } from '../utils/api'

const IdeaChatModal = ({ idea, onClose }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockedBy, setBlockedBy] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
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
        setIsBlocked(messagesResult.isBlocked || false)
        setBlockedBy(messagesResult.blockedBy || null)
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
        setIsBlocked(result.isBlocked || false)
        setBlockedBy(result.blockedBy || null)
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

    if (isBlocked) {
      alert('You cannot send messages. This chat has been blocked.')
      return
    }

    try {
      const result = await ideaChatAPI.sendMessage(idea._id, newMessage)
      if (result.success) {
        setMessages([...messages, result.data])
        setNewMessage('')
      } else {
        alert(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    }
  }

  const handleBlockChat = async () => {
    if (!confirm('Are you sure you want to block this chat? No one will be able to send messages.')) {
      return
    }

    try {
      const result = await ideaChatAPI.blockChat(idea._id)
      if (result.success) {
        setIsBlocked(true)
        setBlockedBy(currentUserId)
        setShowSettings(false)
        alert('Chat has been blocked successfully')
      } else {
        alert(result.message || 'Failed to block chat')
      }
    } catch (error) {
      console.error('Error blocking chat:', error)
      alert('Failed to block chat')
    }
  }

  const handleUnblockChat = async () => {
    if (!confirm('Are you sure you want to unblock this chat?')) {
      return
    }

    try {
      const result = await ideaChatAPI.unblockChat(idea._id)
      if (result.success) {
        setIsBlocked(false)
        setBlockedBy(null)
        setShowSettings(false)
        alert('Chat has been unblocked successfully')
        loadMessages() // Reload to update state
      } else {
        alert(result.message || 'Failed to unblock chat')
      }
    } catch (error) {
      console.error('Error unblocking chat:', error)
      alert('Failed to unblock chat. You may not have permission.')
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
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                title="Chat Settings"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                  {isBlocked ? (
                    blockedBy === currentUserId ? (
                      <button
                        onClick={handleUnblockChat}
                        className="w-full text-left px-4 py-2 hover:bg-green-50 transition-all text-green-600 font-medium"
                      >
                        🔓 Unblock Chat
                      </button>
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        Only the blocker can unblock
                      </div>
                    )
                  ) : (
                    <button
                      onClick={handleBlockChat}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 transition-all text-red-600 font-medium"
                    >
                      🚫 Block Chat
                    </button>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
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
          ) : (
            <>
              {isBlocked && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚫</span>
                    <div>
                      <p className="font-semibold text-red-800">This chat has been blocked</p>
                      <p className="text-sm text-red-600">
                        {blockedBy === currentUserId 
                          ? 'You have blocked this chat. No one can send messages.'
                          : 'This chat has been blocked. You cannot send messages.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {messages.length === 0 ? (
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
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          {isBlocked ? (
            <div className="bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-gray-600 font-medium">
                💬 Chat is blocked. Messages cannot be sent.
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default IdeaChatModal
