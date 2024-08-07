import LoginForm from "./LoginForm";


const LoginClient = () => {
    return (
        <div className="flex flex-1 flex-col gap-8 my-4 w-full md:px-[20%]">
            <div className="flex flex-col flex-1 items-center">
                <LoginForm />
            </div>
        </div >)
}
export default LoginClient