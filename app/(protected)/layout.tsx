import { AuthProvider } from "@/lib/hooks/useAuthState";
import AuthListener from "../AuthListener";

const ProtectedLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AuthProvider>
            <AuthListener />
            {children}
        </AuthProvider>)
}

export default ProtectedLayout