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
import { toast } from "@/hooks/use-toast"

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
  onAdd: (newPassword: {  secret_type: string; encrypted_data: string; description: string }) => void
}

const AddNewPassword: React.FC<AddNewPasswordProps> = ({ isOpen, onClose, onAdd }) => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [secret_type, setType] = useState('password')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const encryptData = (data: string) => {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(PUBLIC_KEY)
    return encrypt.encrypt(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const dataToEncrypt = JSON.stringify({ username, password })
      const encryptedData = encryptData(dataToEncrypt)
      if (!encryptedData) {
        throw new Error('Encryption failed')
      }


      const newSecret = {

        secret_type,
        encrypted_data: encryptedData,
        description
      }

      await onAdd(newSecret)

      // Reset form
      setUsername('')
      setPassword('')
      setDescription('')
      setType('password')
      onClose()

      toast({
        title: "Success",
        description: "New secret added successfully",
      })
    } catch (error) {
      console.error('Error adding new secret:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add new secret. Please try again.",
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
            <Select value={secret_type} onValueChange={setType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="password">Password</SelectItem>
                <SelectItem value="ssh_key">SSH Key</SelectItem>
                <SelectItem value="api_key">API Key</SelectItem>
              </SelectContent>
            </Select>
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