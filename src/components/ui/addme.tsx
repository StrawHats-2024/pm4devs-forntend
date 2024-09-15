// "use client"

// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { X } from "lucide-react"
// import JSEncrypt from 'jsencrypt'

// // This should be fetched from your server or stored securely
// const PUBLIC_KEY = `
// -----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7JHoJfg6yNzLMOWet8Z49a4KD
// 0dCspMAYvo2YAMB7/wdEycocujbhJ2n/seONi+5XqTqqFkM5VBl8rmkkFPZk/A6g
// nnDdZHt3pKhKBSpA8FYsw1BhSsj3NA8jVjTniipOJfV2bddD4XQE03rXDOzXfVk7
// J6UXeJovL0xYoSQCPwIDAQAB
// -----END PUBLIC KEY-----
// `

// interface AddNewPasswordProps {
//   isOpen: boolean
//   onClose: () => void
//   onAdd: (newPassword: { encrypted_data: string; type: string }) => void
// }

// const AddNewPassword: React.FC<AddNewPasswordProps> = ({ isOpen, onClose, onAdd }) => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [description, setDescription] = useState('')
//   const [type, setType] = useState('password')

//   const encryptData = (data: string) => {
//     const encrypt = new JSEncrypt()
//     encrypt.setPublicKey(PUBLIC_KEY)
//     return encrypt.encrypt(data)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const dataToEncrypt = JSON.stringify({ username, password, description })
//     const encryptedData = encryptData(dataToEncrypt)
//     if (encryptedData) {
//       onAdd({
//         encrypted_data: encryptedData,
//         type
//       })
//       setUsername('')
//       setPassword('')
//       setDescription('')
//       setType('password')
//       onClose()
//     } else {
//       console.error('Encryption failed')
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Add New Secret</DialogTitle>
//           <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
//             <X className="h-4 w-4" />
//           </Button>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="text-sm font-medium text-gray-400">Username</label>
//             <Input
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="bg-gray-800 border-gray-700 text-white"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="text-sm font-medium text-gray-400">Password/Key</label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-gray-800 border-gray-700 text-white"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="text-sm font-medium text-gray-400">Description (Optional)</label>
//             <Textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="bg-gray-800 border-gray-700 text-white"
//             />
//           </div>
//           <div>
//             <label htmlFor="type" className="text-sm font-medium text-gray-400">Type</label>
//             <Select value={type} onValueChange={setType}>
//               <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
//                 <SelectValue placeholder="Select type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-800 border-gray-700 text-white">
//                 <SelectItem value="password">Password</SelectItem>
//                 <SelectItem value="ssh_key">SSH Key</SelectItem>
//                 <SelectItem value="api_key">API Key</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <DialogFooter>
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Secret</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default AddNewPassword

"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import JSEncrypt from 'jsencrypt'

// This should be fetched from your server or stored securely
const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7JHoJfg6yNzLMOWet8Z49a4KD
0dCspMAYvo2YAMB7/wdEycocujbhJ2n/seONi+5XqTqqFkM5VBl8rmkkFPZk/A6g
nnDdZHt3pKhKBSpA8FYsw1BhSsj3NA8jVjTniipOJfV2bddD4XQE03rXDOzXfVk7
J6UXeJovL0xYoSQCPwIDAQAB
-----END PUBLIC KEY-----
`

interface AddNewPasswordProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (newPassword: { encrypted_data: string; type: string }) => void
}

const AddNewPassword: React.FC<AddNewPasswordProps> = ({ isOpen, onClose, onAdd }) => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('password')
  const [token, setToken] = useState<string | null>(null)

  // Check for token when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    if (storedToken && user_id) {
      console.log('stores',storedToken);
      setToken(storedToken)
    } else {
      router.push('/login') // Redirect to login if no token is found
    }
  }, [router])

  const encryptData = (data: string) => {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(PUBLIC_KEY)
    return encrypt.encrypt(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!token) {
      console.error('User is not authenticated')
      return
    }
  
    const dataToEncrypt = JSON.stringify({ username, password }) // Encrypt only username and password
    const encryptedData = encryptData(dataToEncrypt)
    if (!encryptedData) {
      console.error('Encryption failed')
      return
    }
    const user_id = localStorage.getItem('user_id')
    const payload = {
      user_id: user_id,
      secret_type: type,
      encrypted_data: encryptedData,
      description: description
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/v1/secrets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}` // Make sure 'Bearer' is included
        },
        credentials: 'include', 
        body: JSON.stringify(payload)
      })
  
      if (response.ok) {
        const responseData = await response.json()
        console.log('Secret added successfully:', responseData)
  
        // Reset form
        setUsername('')
        setPassword('')
        setDescription('')
        setType('password')
        onClose()
      } else {
        // Handle non-JSON response (e.g., plain text error)
        if (response.headers.get('content-type')?.includes('application/json')) {
          const errorData = await response.json()
          console.error('Error adding secret:', errorData)
        } else {
          const textResponse = await response.text()
          console.error('Server error:', textResponse)
        }
      }
    } catch (error) {
      console.error('Error making request:', error)
    }
  }
  


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Secret</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-400">Username</label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-400">Password/Key</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-400">Description (Optional)</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="type" className="text-sm font-medium text-gray-400">Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="password">password</SelectItem>
                <SelectItem value="ssh_key">ssh_Key</SelectItem>
                <SelectItem value="api_key">api_Key</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={!token}>Add Secret</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewPassword;
