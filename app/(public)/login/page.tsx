import Link from "next/link"
import LoginClient from "./LoginClient"

const LoginPage = () => {
    return (
        <div className="w-full bg-white py-12">
            <div className="max-w-7xl m-auto 2xl:px-0 px-8  md:h-max md:bg-white">
                <div className="flex flex-col items-center gap-y-4">
                    <div className="font-semibold text-3xl text-center">Sign In</div>
                    <div className="text-xs">No account yet? Sign Up <Link className="text-primary decoration-primary underline" href={"/signup"}>Here</Link></div>
                    <LoginClient />
                </div>
            </div>
        </div>
    )
}
export default LoginPage;