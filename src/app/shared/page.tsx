
"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import moment from "moment";
import ShareduserPasswordComponent from "@/components/ui/shareduserpassword";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Password {
  id: number;
  name: string;
  username: string;
  created_at: string;
  updated_at: string;
  encrypted_data?: string;
  iv?: string;
  permission: string;
}

type ShareType = "by-you" | "to-you";

export default function Shared() {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const [selectedPasswordId, setSelectedPasswordId] = useState<number | null>(null);
  const [selectedPasswordData, setSelectedPasswordData] = useState<Password | null>(null);
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNoSecrets, setIsNoSecrets] = useState(true);
  const [shareType, setShareType] = useState<ShareType>("by-you");

  useEffect(() => {
    const fetchpasswords = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const endpoint = shareType === "by-you" 
          ? "/v1/secrets/sharedby/user" 
          : "/v1/secrets/sharedto/user";

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch data from the user endpoint");

        const data = await response.json();
        setPasswords(data.data || []);
        setIsNoSecrets(!data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchpasswords();
  }, [router, refresh, shareType]);

  const handlePasswordClick = (password: Password) => {
    setSelectedPasswordId(password.id);
    setSelectedPasswordData(password);
  };

  const handleClosePasswordComponent = () => {
    setSelectedPasswordId(null);
    setSelectedPasswordData(null);
  };

  const handleShareTypeChange = (value: string) => {
    setShareType(value as ShareType);
    setSelectedPasswordId(null);
    setSelectedPasswordData(null);
    setIsLoading(true);
  };

  const filteredPasswords = passwords.filter((password) =>
    password.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 overflow-auto">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col space-y-6 mb-6">
              {/* Share Type Toggle */}
              {/* Search Bar */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search secrets..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <Card className="bg-gray-900 border border-gray-800">
            <CardHeader className="flex flex-row items-center relative justify-between space-y-0 pb-2 border-b border-gray-800">
                <CardTitle className="text-2xl font-bold text-white">
                  {shareType === "by-you" ? "Secrets You've Shared" : "Secrets Shared with You"}
                </CardTitle>
                
                <div className="absolute pb-2 right-0">
                  <Tabs 
                    value={shareType} 
                    onValueChange={handleShareTypeChange}
                    className="w-[400px]">
                    <TabsList className="grid w-[80%] grid-cols-2 bg-gray-800">
                      <TabsTrigger 
                        value="by-you"
                        className="text-white data-[state=active]:bg-blue-600 ">
                        Shared by You
                      </TabsTrigger>
                      <TabsTrigger 
                        value="to-you"
                        className="text-white data-[state=active]:bg-blue-600">
                        Shared to You
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="pt-4 overflow-y-auto h-[calc(100vh-350px)]">
                {filteredPasswords.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPasswords.map((password) => (
                      <div
                        key={password.id}
                        className={`cursor-pointer p-4 transition-colors duration-200 rounded-md ${
                          selectedPasswordId === password.id
                            ? "bg-gray-700"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                        onClick={() => handlePasswordClick(password)}
                      >
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-semibold text-white">{password.name}</h2>
                          <h2 className="text-sm text-gray-400">{password.permission}</h2>
                          <span className="text-sm text-gray-400">
                            {moment(password.created_at).format("h:mm A MMM DD, YYYY")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-gray-400">
                      {shareType === "by-you" 
                        ? "You haven't shared any secrets yet" 
                        : "No secrets have been shared with you"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>

        {selectedPasswordData && (
          <div className="w-[38%] border-l border-gray-900 overflow-y-auto">
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
    </Layout>
  );
}