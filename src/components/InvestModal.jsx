import { useState } from 'react'

const InvestModal = ({ idea, onClose, onConfirm }) => {
  const [amount, setAmount] = useState('')

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    onConfirm(amount)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Invest in Idea</h3>
        
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">{idea.title}</p>
          <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
          
          <div className="bg-purple-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Funding Goal:</span>
              <span className="font-semibold">₹{idea.fundingGoal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Already Raised:</span>
              <span className="font-semibold text-green-600">₹{idea.amountRaised.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Entrepreneur:</span>
              <span className="font-semibold">{idea.entrepreneurName}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Investment Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none px-4 py-3 text-gray-800"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Confirm Investment
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvestModal
