"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Users, Key, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface GroupInfoProps {
  group_name: string;
  groupId: number;
  onClose: () => void;
}

export default function GroupInfo({ group_name, onClose }: GroupInfoProps) {
  const [activeTab, setActiveTab] = useState("passwords");
  const router = useRouter();

  // Define initial state correctly
  const [info, setInfo] = useState<{ secrets: { name: string }[]; users: { email: string }[] }>({
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

        // Use backticks for template literals
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

  return (
    <Card className="h-full bg-slate-950 border-none text-white">
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
            className="p-4 bg-gray-800 border border-gray-800 rounded-lg mt-8 text-white min-h-[400px]">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shared Passwords</h3>
              {info && info.secrets && info.secrets.length > 0 ? (
                info.secrets.map((secret, index) => (
                  <div key={index} className="text-gray-300">
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
            className="p-4 bg-gray-800 mt-8 text-white min-h-[400px]">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Group Members</h3>
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
      </CardContent>
    </Card>
  );
}