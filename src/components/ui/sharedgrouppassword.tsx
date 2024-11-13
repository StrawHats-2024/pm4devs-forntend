// "use client";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState, useEffect } from "react";
// import { Users, Key, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import ShareduserPasswordComponent from "./shareduserpassword";

// interface GroupInfoProps {
//   group_name: string;
//   groupId: number;
//   onClose: () => void;
// }
// interface Secret {
//   id: number;
//   name: string;
//   username: string;
//   created_at: string;
//   updated_at: string;
//   encrypted_data?: string;
//   iv?: string;
//   permission: string;
// }

// export default function GroupInfo({ group_name, onClose }: GroupInfoProps) {
//   const [activeTab, setActiveTab] = useState("passwords");
//   const [selectedPasswordId, setSelectedPasswordId] = useState<number | null>(null)
//   const [selectedPasswordData, setSelectedPasswordData] = useState<Secret | null>(null);
//   const router = useRouter();

//   // Define initial state correctly
//   const [info, setInfo] = useState<{ secrets: Secret[]; users: { email: string }[] }>({
//     secrets: [],
//     users: [],
//   });
//   const [, setIsLoading] = useState(true);
//   const [, setNoInfo] = useState(true);

//   useEffect(() => {
//     const fetchPasswords = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           router.push("/login");
//           return;
//         }

//         // Use backticks for template literals
//         const response = await fetch(`/v1/ops/group?group_name=${encodeURIComponent(group_name)}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.status === 401) {
//           router.push("/login");
//           return;
//         }

//         if (!response.ok) {
//           throw new Error("Failed to fetch passwords.");
//         }

//         const data = await response.json();
//         setInfo(data.data || { secrets: [], users: [] });
//         setNoInfo(!data.data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching passwords:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPasswords();
//   }, [group_name, router]);

//   const handlePasswordClick = (secret: Secret) => {
//     setSelectedPasswordId(secret.id);
//     setSelectedPasswordData(secret);
//   };

//   const handleClosePasswordComponent = () => {
//     setSelectedPasswordId(null);
//     setSelectedPasswordData(null);
//   };

//   return (
//     <div>
//     <Card className="h-full bg-slate-950 border-none text-white">
//       <CardHeader className="border-b pt-4 border-gray-800">
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-2xl font-bold text-white">{group_name}</CardTitle>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-800 rounded-full transition-colors duration-200"
//             aria-label="Close panel"
//           >
//             <X className="h-5 w-5 text-gray-400 hover:text-white" />
//           </button>
//         </div>
//       </CardHeader>
//       <CardContent className="pt-14">
//         <Tabs
//           defaultValue="passwords"
//           value={activeTab}
//           onValueChange={setActiveTab}
//           className="w-full"
//         >
//           <TabsList className="w-full border-b border-gray-800 rounded-none bg-transparent">
//             <TabsTrigger
//               value="passwords"
//               className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:bg-transparent ${
//                 activeTab === "passwords"
//                   ? "text-blue-500 border-b-2 border-blue-500"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               <Key className="w-4 h-4 mr-2" />
//               Passwords
//             </TabsTrigger>
//             <TabsTrigger
//               value="members"
//               className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:bg-transparent ${
//                 activeTab === "members"
//                   ? "text-blue-500 border-b-2 border-blue-500"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               <Users className="w-4 h-4 mr-2" />
//               Members
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent
//             value="passwords"
//             className="p-4 bg-gray-800 border border-gray-800 rounded-lg mt-8 text-white min-h-[400px]">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Shared Passwords</h3>
//               {info && info.secrets && info.secrets.length > 0 ? (
//                 info.secrets.map((secret) => (
//                   <div key={secret.id} onClick={() => handlePasswordClick(secret)} className="text-gray-300">
//                     {secret.name || "Unnamed password"}
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-gray-400">No passwords available</div>
//               )}
//             </div>
//           </TabsContent>

//           <TabsContent
//             value="members"
//             className="p-4 bg-gray-800 mt-8 text-white min-h-[400px]">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Group Members</h3>
//               {info.users.length > 0 ? (
//                 info.users.map((user, index) => (
//                   <div key={index} className="text-gray-300">
//                     {user.email || "Unknown member"}
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-gray-400">No members available</div>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//     <div>
//     {selectedPasswordData && (
//       <div className="w-[38%] border-l border-gray-900 overflow-y-auto">
//         <ShareduserPasswordComponent
//           onClose={handleClosePasswordComponent}
//           encrypted_data={selectedPasswordData.encrypted_data || ""}
//           iv={selectedPasswordData.iv || ""}
//           name={selectedPasswordData.name}
//           secret_id={selectedPasswordData.id}
//           createdAt={selectedPasswordData.created_at}
//           updatedAt={selectedPasswordData.updated_at}
//           permission={selectedPasswordData.permission}
//         />
//         </div>
//         )}
//     </div>

//   </div>
//   );
//}

"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Users, Key, X , Plus} from "lucide-react";
import { useRouter } from "next/navigation";
import ShareduserPasswordComponent from "./shareduserpassword";

import { Button } from "./button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./alert-dialog";
import { Label } from "@/components/ui/label"
import { Input } from "./input";

interface GroupInfoProps {
  group_name: string;
  groupId: number;
  onClose: () => void;
}

interface Secret {
  id: number;
  name: string;
  username: string;
  created_at: string;
  updated_at: string;
  encrypted_data?: string;
  iv?: string;
  permission: string;
}

export default function GroupInfo({ group_name, onClose }: GroupInfoProps) {
  const [activeTab, setActiveTab] = useState("passwords");
  const [, setSelectedPasswordId] = useState<number | null>(null);
  const [IsAddNewOpen, setIsAddNewOpen] = useState(false);
  const [selectedPasswordData, setSelectedPasswordData] = useState<Secret | null>(null);
  const [user_email,setUserEmail] = useState("")
  const router = useRouter();


  const [info, setInfo] = useState<{ secrets: Secret[]; users: { email: string }[] }>({
    secrets: [],
    users: [],
  });
  const [, setIsLoading] = useState(true);
  const [, setNoInfo] = useState(true);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(`/v1/ops/group?group_name=${encodeURIComponent(group_name)}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch passwords.");
        }

        const data = await response.json();
        setInfo(data.data || { secrets: [], users: [] });
        setNoInfo(!data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPasswords();
  }, [group_name, router]);

  const handleAddUser = async() =>{
    try {

      const body = JSON.stringify({group_name,user_email})

      const token = localStorage.getItem('token')

      const response = await fetch('/v1/groups/add_user',{
        method: "Post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body:body
      })

      if (!response.ok) {
        throw new Error("You are not authorized to add members");
      }

      const data = await response.json();
      console.log(data);

    }catch(error){
      console.error("error in Adding member",error)

    }
  }

  const handlePasswordClick = (secret: Secret) => {
    setSelectedPasswordId(secret.id);
    setSelectedPasswordData(secret);
  };

  const handleClosePasswordComponent = () => {
    setSelectedPasswordId(null);
    setSelectedPasswordData(null);
  };

  return (
    // <div className="flex h-full bg-slate-950 border-none text-white">
      // <div className="flex-1 ">
        <Card className="bg-slate-950 h-full mt-0 pt-0 border-none text-white ">
          <CardHeader className="border-b pt-4 border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-white">{group_name}</CardTitle>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors duration-200"
                aria-label="Close panel"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-14">
            <Tabs
              defaultValue="passwords"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full border-b border-gray-800 rounded-none bg-transparent">
                <TabsTrigger
                  value="passwords"
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:bg-transparent ${
                    activeTab === "passwords"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Passwords
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:bg-transparent ${
                    activeTab === "members"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Members
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="passwords"
                className="p-4 bg-gray-800 border border-gray-800 rounded-lg mt-8 text-white min-h-[400px]"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Shared Passwords</h3>
                  {info && info.secrets && info.secrets.length > 0 ? (
                    info.secrets.map((secret) => (
                      <div
                        key={secret.id}
                        onClick={() => handlePasswordClick(secret)}
                        className="p-3 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-200 text-gray-300"
                      >
                        {secret.name || "Unnamed password"}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">No passwords available</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="members"
                className="p-4 bg-gray-800 mt-8 text-white min-h-[400px]"
              >
                <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">Group Members</h3>
                          <div className="flex justify-end">
                            <Button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddNewOpen(true)}>
                              <Plus className="mr-2 h-4 w-4" /> Add Member
                            </Button>
                          </div>
                      </div>
                    <AlertDialog open={IsAddNewOpen} onOpenChange={setIsAddNewOpen}>
                        <AlertDialogContent className="bg-gray-900 border border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Add a member</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              Enter the details to add a member
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="user_email" className="text-white">User Email</Label>
                              <Input
                                id="user_email"
                                value={user_email}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Enter user_email"
                                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel 
                              onClick={() => {
                                setUserEmail("")
                                setIsAddNewOpen(false)
                              }}
                              className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleAddUser}
                              className="bg-blue-600 text-white hover:bg-blue-700"
                            >
                              Add
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      {info.users.length > 0 ? (
                        info.users.map((user, index) => (
                          <div key={index} className="text-gray-300">
                            {user.email || "Unknown member"}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400">No members available</div>
                      )}
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-0 pt-0">
            {selectedPasswordData && (
        <div className=" w-[38%] fixed right-0 top-0 border-l ml-0 pl-0 border-gray-900 bottom-0 p-4">
          <ShareduserPasswordComponent
            onClose={handleClosePasswordComponent}
            encrypted_data={selectedPasswordData.encrypted_data || ""}
            iv={selectedPasswordData.iv || ""}
            name={selectedPasswordData.name}
            secret_id={selectedPasswordData.id}
            createdAt={selectedPasswordData.created_at}
            updatedAt={selectedPasswordData.updated_at}
            permission={selectedPasswordData.permission}
          />
        </div>
      )}
      </div>
          </CardContent>
    </Card>
  );
}

