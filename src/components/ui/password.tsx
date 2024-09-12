// 'use client'

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Edit, Share, MoreVertical, Star, Trash2 } from "lucide-react"
// import { Separator } from "@/components/ui/separator"

// export default function PasswordComponent() {
//   const [isEditing, setIsEditing] = useState(false)
//   const [username, setUsername] = useState("Jeevan")
//   const [password, setPassword] = useState("Jeevan@42003")
//   const [website, setWebsite] = useState("https://instagram.com")

//   const handleEdit = () => {
//     setIsEditing(!isEditing)
//   }

//   const handleSave = () => {
//     setIsEditing(false)
//     // Here you would typically save the changes to your backend
//   }

//   return (
//     <div className="h-full bg-zinc-900 text-white">
//       <div className="border-b-2 border-zinc-800 shadow-lg">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <div className="flex items-center space-x-2">
//             <span className="font-semibold">Owner</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button size="icon" className="text-gray-400 pr-4">
//               Personal
//             </Button>
//             <Button variant="ghost" size="icon" className="text-gray-400">
//               <Share className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" className="text-gray-400" onClick={handleEdit}>
//               <Edit className="h-4 w-4" />
//             </Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="text-gray-400">
//                   <MoreVertical className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="bg-zinc-800 text-white">
//                 <DropdownMenuItem className="focus:bg-zinc-700">
//                   <Star className="mr-2 h-4 w-4" />
//                   <span>Add to favorites</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="focus:bg-zinc-700">
//                   <Trash2 className="mr-2 h-4 w-4" />
//                   <span>Delete</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </CardHeader>
//       </div>
//       <CardContent className="space-y-4">
//         <div className="flex items-center pt-2 space-x-4">
//           <div className="h-12 w-12 rounded-xl flex items-center justify-center">
//             logo
//           </div>
//           <h2 className="text-2xl font-bold">name</h2>
//         </div>
//         <div className="border border-gray-500 rounded-lg">
//           <div className="grid pt-3 pl-4 pr-4 pb-3">
//             <label htmlFor="username" className="text-xs text-purple-300">
//               username
//             </label>
//             <input
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="bg-zinc-900 border-none text-white mt-2"
//               readOnly={!isEditing}
//             />
//           </div>
//           <Separator className="bg-gray-500" />
//           <div className="grid pt-3 pl-4 pr-4 pb-3">
//             <label htmlFor="password" className="text-xs text-purple-300">
//               password
//             </label>
//             <input
//               id="password"
//               type={isEditing ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-zinc-900 border-none text-white mt-2"
//               readOnly={!isEditing}
//             />
//           </div>
//         </div>
//         <div className="space-y-2 grid">
//           <label htmlFor="website" className="text-xs text-purple-400">
//             website
//           </label>
//           <input
//             id="website"
//             value={website}
//             onChange={(e) => setWebsite(e.target.value)}
//             className="bg-zinc-900 border-none text-white"
//             readOnly={!isEditing}
//           />
//         </div>
//         {isEditing && (
//           <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
//             Save Changes
//           </Button>
//         )}
//       </CardContent>
//       <CardFooter>
//         <p className="text-xs text-gray-500">Last edited Friday, August 30, 2024 at 12:22:59 PM</p>
//       </CardFooter>
//     </div>
//   );
// };

'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Share, MoreVertical, Star, Trash2, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

interface PasswordComponentProps {
  onClose: () => void;
}

export default function PasswordComponent({ onClose }: PasswordComponentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState("Jeevan")
  const [password, setPassword] = useState("Jeevan@42003")
  const [website, setWebsite] = useState("https://instagram.com")

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the changes to your backend
  }

  return (
    <Card className="h-full bg-gray-900 text-white border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Owner</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-400">
            Personal
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 text-white">
              <DropdownMenuItem className="focus:bg-gray-700">
                <Star className="mr-2 h-4 w-4" />
                <span>Add to favorites</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-700">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="text-gray-400" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
            Logo
          </div>
          <h2 className="text-2xl font-bold">Instagram</h2>
        </div>
        <div className="border border-gray-800 rounded-lg">
          <div className="p-3">
            <label htmlFor="username" className="text-xs text-gray-400">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border-none text-white mt-1"
              readOnly={!isEditing}
            />
          </div>
          <Separator className="bg-gray-800" />
          <div className="p-3">
            <label htmlFor="password" className="text-xs text-gray-400">
              Password
            </label>
            <Input
              id="password"
              type={isEditing ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-none text-white mt-1"
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div>
          <label htmlFor="website" className="text-xs text-gray-400">
            Website
          </label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="bg-gray-800 border-none text-white mt-1"
            readOnly={!isEditing}
          />
        </div>
        {isEditing && (
          <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">Last edited Friday, August 30, 2024 at 12:22:59 PM</p>
      </CardFooter>
    </Card>
  );
};