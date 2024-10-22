// "use client"

// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/hooks/use-toast"

// interface AddNewPasswordProps {
//   isOpen: boolean
//   onClose: () => void
//   onAdd: (newPassword: { name: string; secret_type: string; encrypted_data: string; description: string }) => void
// }

// const AddNewPassword: React.FC<AddNewPasswordProps> = ({ isOpen, onClose, onAdd }) => {
//   const [name, setName] = useState('')
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [description, setDescription] = useState('')
//   const [secret_type, setType] = useState('password')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // Simulate encryption by concatenating the values into a string
//   const getEncryptedData = (data: string) => {
//     return `Encrypted(${data})` // Just a placeholder string for now
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const dataToEncrypt = JSON.stringify({ username, password, secret_type })
//       const encryptedData = getEncryptedData(dataToEncrypt) // No real encryption here

//       const newSecret = {
//         name,
//         secret_type,
//         encrypted_data: encryptedData,
//         description
//       }

//       await onAdd(newSecret)

//       // Reset form
//       setName('')
//       setUsername('')
//       setPassword('')
//       setDescription('')
//       setType('password')
//       onClose()

//       toast({
//         title: "Success",
//         description: "New secret added successfully",
//       })
//     } catch (error) {
//       console.error('Error adding new secret:', error)
//       toast({
//         title: "Error",
//         description: "Failed to add new secret. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Add New Secret</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="bg-gray-800 border-gray-700 text-white"
//               required
//             />
//           </div>
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
//             <Select value={secret_type} onValueChange={setType}>
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
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
//               {isSubmitting ? 'Adding...' : 'Add Secret'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default AddNewPassword;

"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface AddNewPasswordProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (newPassword: { name: string; encrypted_data: string }) => void
}

const AddNewPassword: React.FC<AddNewPasswordProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simulate encryption by concatenating the values into a string
  const getEncryptedData = (username: string, password: string, description?: string) => {
    const data = description
      ? `Encrypted(username: ${username}, password: ${password}, description: ${description})`
      : `Encrypted(username: ${username}, password: ${password})`
    return data
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const encryptedData = getEncryptedData(username, password, description)

      const newSecret = {
        name,
        encrypted_data: encryptedData
      }

      await onAdd(newSecret)

      // Reset form
      setName('')
      setUsername('')
      setPassword('')
      setDescription('')
      onClose()

      toast({
        title: "Success",
        description: "New secret added successfully",
      })
    } catch (error) {
      console.error('Error adding new secret:', error)
      toast({
        title: "Error",
        description: "Failed to add new secret. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Secret</DialogTitle>
          {/* <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
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
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Secret'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewPassword;