import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load Q&A data
const qaDataPath = path.join(__dirname, '../data/businessQA.json')
let qaData = []

try {
  const data = fs.readFileSync(qaDataPath, 'utf8')
  qaData = JSON.parse(data)
} catch (error) {
  console.error('Error loading Q&A data:', error)
}

// Simple keyword matching algorithm
const findBestMatch = (userQuestion) => {
  const normalizedQuestion = userQuestion.toLowerCase().trim()
  
  let bestMatch = null
  let highestScore = 0
  
  qaData.forEach(qa => {
    let score = 0
    
    // Check if question matches exactly
    if (qa.question.toLowerCase() === normalizedQuestion) {
      score = 100
    } else {
      // Check keywords
      qa.keywords.forEach(keyword => {
        if (normalizedQuestion.includes(keyword.toLowerCase())) {
          score += 10
        }
      })
      
      // Check question similarity
      const qaWords = qa.question.toLowerCase().split(' ')
      const userWords = normalizedQuestion.split(' ')
      
      qaWords.forEach(word => {
        if (word.length > 3 && userWords.includes(word)) {
          score += 5
        }
      })
    }
    
    if (score > highestScore) {
      highestScore = score
      bestMatch = qa
    }
  })
  
  // Return match only if score is above threshold
  return highestScore >= 10 ? bestMatch : null
}

export const askChatBot = async (req, res) => {
  try {
    const { question } = req.body
    
    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a question'
      })
    }
    
    const match = findBestMatch(question)
    
    if (match) {
      res.status(200).json({
        success: true,
        data: {
          question: match.question,
          answer: match.answer,
          confidence: 'high'
        }
      })
    } else {
      res.status(200).json({
        success: true,
        data: {
          question: question,
          answer: "Sorry, I don't have an answer for that yet. I'm trained on entrepreneurship and investment topics. Try asking about startups, funding, investors, business models, or scaling your business!",
          confidence: 'none'
        }
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getSuggestedQuestions = async (req, res) => {
  try {
    // Return 5 random suggested questions
    const shuffled = [...qaData].sort(() => 0.5 - Math.random())
    const suggested = shuffled.slice(0, 5).map(qa => qa.question)
    
    res.status(200).json({
      success: true,
      data: suggested
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getAllQuestions = async (req, res) => {
  try {
    const questions = qaData.map(qa => ({
      id: qa.id,
      question: qa.question
    }))
    
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
