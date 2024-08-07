import SignUpClient from "../signup/SignUpClient";
import Link from "next/link";

const SignUp = async () => {
    return (
        <div className="max-w-7xl m-auto 2xl:px-0 px-8 md:h-max md:bg-white my-12">
            <div className="flex flex-col items-center gap-y-4">
                <div className="font-semibold text-xl"> Sign Up</div>
                <div className="text-xs">Have an account?  <Link className="text-primary decoration-primary underline" href={"/login"}>Sign in here</Link></div>
                <SignUpClient />
            </div>
        </div>)
}

export default SignUp;