"use client"

import Layout from "@/components/ui/layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import GroupInfo from "@/components/ui/sharedgrouppassword"
import moment from "moment"

interface Groups {
  name: string,
  id: number
  created_at : string;
}


export default function Groups() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
  const [selectedGroupData, setSelectedGroupData] = useState<Groups | null>(null)
  const [isAddNewOpen, setIsAddNewOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<Groups[]>([])
  const [refresh, setRefresh] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch('/v1/groups/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
    
        const data = await response.json()
    
        setGroups(data.data || []);
      } catch (error) {
        console.error('Error fetching groups:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
        setGroups([])
      } finally {
        setIsLoading(false)
      }
    }

    loadGroups()
  }, [refresh])

  const handleCreateGroup = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/v1/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ group_name: newGroupName })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Reset form and refresh the groups list
      setNewGroupName("")
      setIsAddNewOpen(false)
      setRefresh(prev => !prev)
    } catch (error) {
      console.error('Error creating group:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  const filteredGroups = (!isLoading) ? groups.filter(
    (group) =>
      group.name && group.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  const handleGroupClick = (group: Groups) => {
    if (selectedGroupId === group.id) {
      setSelectedGroupId(null)
      setSelectedGroupData(null)
    } else {
      setSelectedGroupId(group.id)
      setSelectedGroupData(group)
    }
  }

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search secrets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Button 
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={() => setIsAddNewOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Group
          </Button>
        </div>

        <AlertDialog open={isAddNewOpen} onOpenChange={setIsAddNewOpen}>
          <AlertDialogContent className="bg-gray-900 border border-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Create New Group</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Enter a name for your new group.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="group-name" className="text-white">Group Name</Label>
                <Input
                  id="group-name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel 
                onClick={() => {
                  setNewGroupName("")
                  setIsAddNewOpen(false)
                }}
                className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCreateGroup}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Create
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-800">
            <CardTitle className="text-2xl font-bold text-white"> Groups </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 overflow-y-auto h-[calc(100vh-150px)]">
            <div className="space-y-4">
              {filteredGroups.length > 0 && filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="cursor-pointer p-4 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-md"
                  onClick={() => handleGroupClick(group)}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">{group.name}</h2>
                    <span className="text-sm text-gray-400">{moment(group.created_at).format('h:mm A MMM DD, YYYY')}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="ml-4">
      {selectedGroupId && (
          <div className="  w-[38%] fixed right-0 top-0 border-l ml-0 pl-0 border-gray-900 bottom-0 p-4 ">
            {selectedGroupData && (
              <GroupInfo
                       onClose={() => setSelectedGroupId(null)} 
                       group_name ={selectedGroupData.name || ""} 
                       groupId = {selectedGroupData.id}
                       
              />
            )}
          </div>
        )}
      </div>
      </main>

    </Layout>
  )
}