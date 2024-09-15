"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, EyeOff, Key, Plus, Search, Home, User, Users, Share2 } from "lucide-react"
import PasswordComponent from "@/components/ui/password"
import Link from "next/link"

const mockPasswords = [
  { id: 1, name: "Google", username: "user@example.com", lastUpdated: "2023-04-15" },
  { id: 2, name: "GitHub", username: "devuser", lastUpdated: "2023-05-20" },
  { id: 3, name: "Netflix", username: "moviebuff", lastUpdated: "2023-06-10" },
  { id: 4, name: "Amazon", username: "shopper123", lastUpdated: "2023-07-05" },
]

const SidebarItem = ({
  icon: Icon,
  label,
  href, 
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string; 
}) => {
  return (
    <Link href={href} passHref>
      <div className="relative group cursor-pointer">
        <div className="p-3 hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default function PasswordManagerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [selectedPasswordId, setSelectedPasswordId] = useState<number | null>(null)

  const filteredPasswords = mockPasswords.filter(
    (password) =>
      password.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePasswordClick = (id: number) => {
    setSelectedPasswordId(selectedPasswordId === id ? null : id)
  }

  const selectedPassword = mockPasswords.find((p) => p.id === selectedPasswordId)

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="bg-black w-16 min-h-screen flex flex-col items-center py-8 border-r border-gray-800">
        <div className="mb-8">
          <Key className="h-8 w-8"></Key>
        </div>
        <nav className="space-y-4">
         <SidebarItem icon={Home} label="Home" href="/" /> 
         <SidebarItem icon={User} label="Personal" href="/personal" /> 
         <SidebarItem icon={Users} label="Groups" href="/groups" /> 
         <SidebarItem icon={Share2} label="Shared" href="/shared" />
        </nav>
      </aside>

      <div className="flex-1 flex">
        <div className={`transition-all duration-300 ease-in-out ${selectedPassword ? 'w-3/5' : 'w-full'}`}>
          <header className="bg-black shadow border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white flex items-center">

                  DevVault
              </h1>
              <Avatar>
                <AvatarImage src="https://avatars.dicebear.com/api/initials/username.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>

            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-800">
                <CardTitle className="text-2xl font-bold text-white">Saved Passwords</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="text-sm text-gray-300 bg-gray-800"
                >
                  {showPasswords ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {showPasswords ? "Hide" : "Show"} Passwords
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPasswords.map((password) => (
                    <div 
                      key={password.id} 
                      className="flex items-center justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => handlePasswordClick(password.id)}
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-white">{password.name}</h3>
                        <p className="text-sm text-gray-400">{password.username}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Last updated: {password.lastUpdated}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <div 
          className={`fixed right-0 top-0 bottom-0 bg-gray-900 border-l border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
            selectedPassword ? 'w-2/5' : 'w-0'
          }`}
        >
          {selectedPassword && (
            <div className="h-full overflow-y-auto">
              <PasswordComponent onClose={() => setSelectedPasswordId(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};