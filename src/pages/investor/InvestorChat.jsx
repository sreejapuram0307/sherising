import { useState, useEffect } from 'react'

const InvestorChat = () => {
  const [contacts] = useState([
    { id: 1, name: 'Ananya Sharma', role: 'Entrepreneur', online: true },
    { id: 2, name: 'Priya Patel', role: 'Entrepreneur', online: false },
    { id: 3, name: 'Meera Singh', role: 'Entrepreneur', online: true },
    { id: 4, name: 'Rajesh Kumar', role: 'Mentor', online: true },
    { id: 5, name: 'Kavya Reddy', role: 'Entrepreneur', online: false },
  ])
  const [selectedContact, setSelectedContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const userName = localStorage.getItem('name') || 'Investor'

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact.id)
    }
  }, [selectedContact])

  const loadMessages = (contactId) => {
    const allMessages = JSON.parse(localStorage.getItem('investor_messages') || '[]')
    const filtered = allMessages.filter(
      msg =>
        (msg.sender === userName && msg.receiverId === contactId) ||
        (msg.senderId === contactId && msg.receiver === userName)
    )
    setMessages(filtered)
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return

    const message = {
      sender: userName,
      senderId: 'investor',
      receiver: selectedContact.name,
      receiverId: selectedContact.id,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    const allMessages = JSON.parse(localStorage.getItem('investor_messages') || '[]')
    allMessages.push(message)
    localStorage.setItem('investor_messages', JSON.stringify(allMessages))
    
    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Chat</h2>
      
      <div className="grid grid-cols-3 gap-6 h-[600px]">
        <div className="col-span-1 bg-white rounded-2xl shadow-lg p-4 border border-purple-100 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-4">Contacts</h3>
          <div className="space-y-2">
            {contacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedContact?.id === contact.id
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
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === userName ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.sender === userName
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-purple-50 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))
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

export default InvestorChat
