import { AuthProvider } from "@/lib/hooks/useAuthState";
import AuthListener from "../AuthListener";
import LogoutButton from "./LogoutButton";

const ProtectedLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AuthProvider>
            <AuthListener />
            <div className="relative h-full w-full">
                <div className="z-0">{children}</div>
                <LogoutButton />
            </div>
        </AuthProvider>)
}

export default ProtectedLayout