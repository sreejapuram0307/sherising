const API_URL = 'http://localhost:5000/api'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    return response.json()
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return response.json()
  }
}

export const ideaAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/ideas`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  create: async (ideaData) => {
    const response = await fetch(`${API_URL}/ideas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(ideaData)
    })
    return response.json()
  },

  invest: async (ideaId, amount) => {
    const response = await fetch(`${API_URL}/ideas/${ideaId}/invest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ amount })
    })
    return response.json()
  },

  like: async (ideaId) => {
    const response = await fetch(`${API_URL}/ideas/${ideaId}/like`, {
      method: 'POST',
      headers: getAuthHeader()
    })
    return response.json()
  }
}

export const investorAPI = {
  getDashboard: async () => {
    const response = await fetch(`${API_URL}/investor/dashboard`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  getMyInvestments: async () => {
    const response = await fetch(`${API_URL}/investor/my-investments`, {
      headers: getAuthHeader()
    })
    return response.json()
  }
}

export const chatAPI = {
  getContacts: async () => {
    const response = await fetch(`${API_URL}/chat/contacts`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  getMessages: async (userId) => {
    const response = await fetch(`${API_URL}/chat/${userId}`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  sendMessage: async (receiverId, message) => {
    const response = await fetch(`${API_URL}/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ receiverId, message })
    })
    return response.json()
  }
}

export const profileAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/profile`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  getProfileById: async (userId) => {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  get: async () => {
    const response = await fetch(`${API_URL}/profile`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  update: async (profileData) => {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(profileData)
    })
    return response.json()
  }
}

export const ideaChatAPI = {
  getMessages: async (ideaId) => {
    const response = await fetch(`${API_URL}/idea-chat/${ideaId}/messages`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  sendMessage: async (ideaId, message) => {
    const response = await fetch(`${API_URL}/idea-chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ ideaId, message })
    })
    return response.json()
  },

  getParticipants: async (ideaId) => {
    const response = await fetch(`${API_URL}/idea-chat/${ideaId}/participants`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  markAsRead: async (ideaId) => {
    const response = await fetch(`${API_URL}/idea-chat/${ideaId}/read`, {
      method: 'PUT',
      headers: getAuthHeader()
    })
    return response.json()
  }
}

export const matchAPI = {
  getEntrepreneurMatches: async () => {
    const response = await fetch(`${API_URL}/matches/entrepreneur`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  getInvestorMatches: async () => {
    const response = await fetch(`${API_URL}/matches/investor`, {
      headers: getAuthHeader()
    })
    return response.json()
  }
}

export const gamificationAPI = {
  getLeaderboard: async () => {
    const response = await fetch(`${API_URL}/gamification/leaderboard`, {
      headers: getAuthHeader()
    })
    return response.json()
  },

  getBadgeProgress: async () => {
    const response = await fetch(`${API_URL}/gamification/badge-progress`, {
      headers: getAuthHeader()
    })
    return response.json()
  }
}
