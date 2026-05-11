require('dotenv').config()

const express = require('express')
const cors = require('cors')
const multer = require('multer')
const OpenAI = require('openai')
const extract = require("pdf-extraction")
const app = express()

const upload = multer({
    storage: multer.memoryStorage()
})

app.use(cors())
app.use(express.json())

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const extractText = async (buffer) => {
    const data = await extract(buffer)
    return data.text
}

app.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        const role = req.body.role
        console.log("Role:", role)

        console.log("File:", req.file)

        if (!req.file) {
            return res.status(400).json({
                error: "Resume file missing"
            })
        }

        if (!req.file.mimetype.includes("pdf")) {
            return res.status(400).json({
                error: "Only PDF allowed"
            })
        }

        const resumeText = await extractText(req.file.buffer)
        console.log(resumeText)

        const prompt = `
        You are FleetHire ATS AI, a recruiting assistant for logistics companies.
        
        Your job is to evaluate a resume for a given role and return a hiring recommendation.
        
        ROLE:
        ${role}
        
        RULES:
        - Use ONLY information present in the resume
        - Do NOT assume missing information
        - If something is not found, use null or empty arrays
        - Focus on evidence-based evaluation only
        
        TASK:
        1. Identify relevant experience and skills
        2. Check match with role requirements
        3. Identify any missing critical qualifications (only if explicitly required)
        4. Provide a hiring recommendation
        
        ROLE REQUIREMENTS:
        
        Truck Driver:
        - CDL license required
        - driving experience required
        
        Dispatcher:
        - routing or scheduling experience required
        - communication skills important
        
        Logistics Coordinator:
        - logistics or warehouse experience required
        
        Fleet Manager:
        - leadership or operations experience required

        CRITICAL RULE:
        Do not convert uncertain or partial information into confirmed facts.

        If a qualification is partially stated:
        - describe it as "mentioned but not verified"
        - do NOT upgrade it into a confirmed credential
        
        OUTPUT FORMAT:
        Return STRICT JSON ONLY.
        
        {
          "candidateProfile": {
            "roleFit": "Strong Hire | Hire | Weak Hire | Reject"
          },
          "summary": "string",
          "strengths": ["string"],
          "weaknesses": ["string"],
          "riskFlags": ["string"],
          "interviewFocusAreas": ["string"],
          "interviewQuestions": ["string"],
          "finalDecision": "Strong Hire | Hire | Weak Hire | Reject"
        }
        
        RESUME:
        ${resumeText}
        `
        console.log("Sending to OpenAI...")

        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",

            messages: [
                {
                    role: "system",
                    content: "You are an ATS engine. Return only valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.2
        })

        const result = response.choices[0].message.content

        console.log("OpenAI response:")
        console.log(result)

        let parsed

        try {
            parsed = JSON.parse(result)
            console.log("JSON parsed successfully")
        } catch (err) {
            console.log("JSON parse failed")
            return res.status(500).json({
                error: "Invalid JSON from AI",
                raw: result
            })
        }

        return res.json({
            success: true,
            result: parsed
        })

    } catch (err) {
        console.error(err)

        return res.status(500).json({
            error: "Analysis failed",
            message: err.message
        })
    }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})