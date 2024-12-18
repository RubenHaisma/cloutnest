import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signIn } from 'next-auth/react';

interface RoleSelectorProps {
  provider: string;
  className?: string;
}

export function RoleSelector({ provider, className = '' }: RoleSelectorProps) {
  const [role, setRole] = useState<string>('artist');

  const handleSignIn = () => {
    signIn(provider, { 
      callbackUrl: `/api/auth/callback/${provider}?role=${role}` 
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger>
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="artist">Music Artist</SelectItem>
          <SelectItem value="curator">Playlist Curator</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSignIn} className="w-full">
        Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </Button>
    </div>
  );
}
