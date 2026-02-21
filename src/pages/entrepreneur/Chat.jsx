import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { chatAPI } from '../../utils/api'

const Chat = () => {
  const location = useLocation()
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const currentUserId = localStorage.getItem('userId')
  const userName = localStorage.getItem('name') || 'Entrepreneur'

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    // If navigated from Smart Matches with a contact
    if (location.state?.contactId) {
      const contact = {
        _id: location.state.contactId,
        name: location.state.contactName,
        role: location.state.contactRole,
        online: true
      }
      setSelectedContact(contact)
      // Add to contacts if not already there
      setContacts(prev => {
        const exists = prev.find(c => c._id === contact._id)
        return exists ? prev : [contact, ...prev]
      })
    }
  }, [location.state])

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact._id)
      const interval = setInterval(() => loadMessages(selectedContact._id), 3000)
      return () => clearInterval(interval)
    }
  }, [selectedContact])

  const loadContacts = async () => {
    try {
      const result = await chatAPI.getContacts()
      if (result.success) {
        setContacts(result.data)
      }
    } catch (error) {
      console.error('Error loading contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (contactId) => {
    try {
      const result = await chatAPI.getMessages(contactId)
      if (result.success) {
        setMessages(result.data)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return

    try {
      const result = await chatAPI.sendMessage(selectedContact._id, newMessage)
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
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Chat</h2>
      
      <div className="grid grid-cols-3 gap-6 h-[600px]">
        <div className="col-span-1 bg-white rounded-2xl shadow-lg p-4 border border-purple-100 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-4">Contacts</h3>
          {loading ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No contacts yet</div>
          ) : (
            <div className="space-y-2">
              {contacts.map(contact => (
                <div
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedContact?._id === contact._id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-purple-50 hover:bg-purple-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                        {contact.name.charAt(0)}
                      </div>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs opacity-80">{contact.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2 bg-white rounded-2xl shadow-lg border border-purple-100 flex flex-col">
          {selectedContact ? (
            <>
              <div className="border-b border-purple-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                    {selectedContact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedContact.name}</h3>
                    <p className="text-xs text-gray-600">{selectedContact.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isCurrentUser = msg.senderId._id === currentUserId
                    return (
                      <div
                        key={idx}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${
                            isCurrentUser
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                              : 'bg-purple-50 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="border-t border-purple-100 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-2"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
