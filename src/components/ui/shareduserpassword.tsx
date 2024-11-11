'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Edit, X, Copy, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface PasswordComponentProps {
  onClose: () => void;
  encrypted_data: string;
  iv: string;
  name: string;
  secret_id: number;
  permission: string;
  createdAt: string;
  updatedAt: string;
}

// Convert Base64 string to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Import the key from Base64 input
async function importKeyFromBase64(base64Key: string) {
  const rawKey = base64ToArrayBuffer(base64Key);
  return await window.crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}

function base64ToUtf8(base64String: string) {
  const byteString = atob(base64String);
  return decodeURIComponent(
    Array.from(byteString).map(byte => '%' + ('00' + byte.charCodeAt(0).toString(16)).slice(-2)).join('')
  );
}

// Decrypt data using AES-GCM
async function decryptAESGCM(encrypted_data: string, iv: string, key: string) {
  const decoder = new TextDecoder();
  const converted_data = base64ToUtf8(encrypted_data);
  const converted_iv = base64ToUtf8(iv);
  const encodedKey = await importKeyFromBase64(key);

  const decodedIv = Uint8Array.from(atob(converted_iv), c => c.charCodeAt(0));
  const decodedEncryptedData = Uint8Array.from(atob(converted_data), c => c.charCodeAt(0));

  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(decodedIv) },
    encodedKey,
    new Uint8Array(decodedEncryptedData)
  );

  return decoder.decode(decrypted);
}

const ShareduserPasswordComponent: React.FC<PasswordComponentProps> = ({
  onClose,
  encrypted_data,
  iv,
  name,
  permission,
  createdAt,
  updatedAt
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [copiedUsername, setCopiedUsername] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [Name, setName] = useState(name);

  useEffect(() => {
    const decryptData = async () => {
      try {
        const decryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
        if (!decryptionKey) {
          throw new Error("Decryption key not found.");
        }

        const decryptedData = await decryptAESGCM(encrypted_data, iv, decryptionKey);
        const { username, password } = JSON.parse(decryptedData);
        setUsername(username);
        setPassword(password);
      } catch (error) {
        console.error("Failed to decrypt data:", error);
        toast({
          title: "Error",
          description: "Failed to decrypt data",
          variant: "destructive",
        });
      }
    };

    decryptData();
  }, [encrypted_data, iv]);

  const handleEdit = () => setIsEditing(permission === "read-write");

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Changes saved successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(name);
  };

  const copyToClipboard = async (text: string, field: 'username' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      if (field === 'username') {
        setCopiedUsername(true);
        setTimeout(() => setCopiedUsername(false), 2000);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${field} copied to clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-full bg-slate-950 border-none text-white">
      <CardHeader className="flex flex-row justify-between items-center p-4">
      <div className="flex items-center space-x-4">
        {isEditing ? (
            <Input
              id="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-none text-white flex-grow"
            />
          ) : (
            <h2 className="text-xl font-semibold">{Name}</h2>
          )}
        </div>
        <div>
        <Button className = " mr-4" variant="ghost" size="icon" onClick={handleEdit}>
          <Edit className="h-4 w-4 text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4  text-gray-400" />
        </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">

        <div className="border border-gray-800 rounded-lg p-3">
          <label htmlFor="username" className="text-xs text-gray-400">Username</label>
          <div className="flex items-center mt-1">
            
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border-none text-white flex-grow"
              readOnly={!isEditing}
            />
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(username, 'username')}>
              {copiedUsername ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 text-gray-400" />}
            </Button>
          </div>
        </div>
        <Separator className="bg-gray-800" />
        <div className="border border-gray-800 rounded-lg p-3">
          <label htmlFor="password" className="text-xs text-gray-400">Password</label>
          <div className="flex items-center mt-1">
            <Input
              id="password"
              type={isEditing ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-none text-white flex-grow"
              readOnly={!isEditing}
            />
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(password, 'password')}>
              {copiedPassword ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 text-gray-400" />}
            </Button>
          </div>
        </div>
        {isEditing && (
          <div className="flex space-x-2">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-1">
        <p className="text-xs text-gray-500">Created at: {createdAt}</p>
        <p className="text-xs text-gray-500">Last updated: {updatedAt}</p>
      </CardFooter>
    </Card>
  );
};

export default ShareduserPasswordComponent;