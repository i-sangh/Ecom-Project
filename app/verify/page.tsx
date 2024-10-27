"use client"
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(8).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'dev***@revispy.com'

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 8)
  }, [])

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple character input

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Move to next input if value is entered
    if (value !== '' && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 8)
    const newCode = [...verificationCode]
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 8) {
        newCode[i] = pastedData[i]
      }
    }
    
    setVerificationCode(newCode)
    inputRefs.current[Math.min(pastedData.length, 7)]?.focus()
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join('')
    
    try {
      // Here you would typically verify the code with your backend
      console.log('Verifying code:', code)
      
      // If verification is successful, redirect to login
      router.push('/login')
    } catch (error) {
      console.error('Verification failed:', error)
      // Handle error appropriately
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="rounded-lg border p-8">
        <h1 className="mb-8 text-center text-2xl font-semibold">Verify your email</h1>
        
        <p className="mb-8 text-center text-gray-600">
          Enter the 8 digit code you have received on<br />
          {email}
        </p>

        <form onSubmit={handleVerify}>
          <div className="mb-8">
            <label className="mb-2 block">Code</label>
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  ref={el => { inputRefs.current[index] = el; }} // Updated ref assignment
                  className="h-12 w-12 rounded border border-gray-300 text-center text-lg"
                  value={digit}
                  onChange={e => handleInput(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-black py-3 text-white hover:bg-gray-800"
          >
            VERIFY
          </button>
        </form>
      </div>
    </div>
  )
}
