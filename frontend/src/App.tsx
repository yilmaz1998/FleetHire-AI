import { useState } from "react"

export default function App() {
  const [result, setResult] = useState(null)
  const [file, setFile] = useState(null)
  const [role, setRole] = useState("Truck Driver (CDL)")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("resume", file)
    formData.append("role", role)

    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/analyze`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      setResult(data.result)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl text-center mb-4">
          FleetHire AI ATS Dashboard
        </h1>
        <p className="text-sm text-gray-500 mb-3">
          Select the job role and upload a candidate's resume to get insights on their suitability for the position.
        </p>
        <select
          className="w-full border p-2 mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Truck Driver (CDL)</option>
          <option>Dispatcher</option>
          <option>Logistics Coordinator</option>
          <option>Fleet Manager</option>
        </select>
        <p className="text-sm text-gray-500 mb-3">
          Upload a candidate's resume in PDF format for analysis.
        </p>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 border border-gray-400 p-2"
        />
        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>



        {result && (
          <div className="mt-6">

            <div className="p-4 bg-gray-50 rounded-lg">
              <h1 className="text-3xl text-center font-semibold text-blue-600">Analysis Results</h1>

              <p className="text-gray-600 mt-3">
                {result.summary}
              </p>

              <p className="mt-2 text-sm text-blue-500">
                Role Fit: {result.candidateProfile?.roleFit}
              </p>
            </div>

            <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-blue-600">Strengths</h3>
              <ul className="list-disc ml-5">
                {result.strengths?.map((strengths, i) => (
                  <li key={i}>{strengths}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-600">Weaknesses</h3>
              <ul className="list-disc ml-5">
                {result.weaknesses?.map((weaknesses, i) => (
                  <li key={i}>{weaknesses}</li>
                ))}
              </ul>
            </div>

            {result.riskFlags?.length > 0 && (
              <div>
                <h3 className="font-semibold text-blue-600">Risk Flags</h3>
                <ul className="list-disc ml-5">
                  {result.riskFlags.map((riskflags, i) => (
                    <li key={i}>{riskflags}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-blue-600">
                Interview Focus Areas
              </h3>
              <ul className="list-disc ml-5">
                {result.interviewFocusAreas?.map((focusareas, i) => (
                  <li key={i}>{focusareas}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-blue-600">
                Interview Questions
              </h3>
              <ul className="list-disc ml-5">
                {result.interviewQuestions?.map((questions, i) => (
                  <li key={i}>{questions}</li>
                ))}
              </ul>
            </div>
            <h2 className="text-2xl font-semibold text-center mt-10">
                <span className="text-blue-600">Final Decision:</span> {result.finalDecision}
              </h2>
          </div>

        </div>
      )}
    </div>
  </div>
)}