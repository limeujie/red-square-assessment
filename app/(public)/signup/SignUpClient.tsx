import SignUpForm from "./SignUpForm";



const SignUpClient = () => {
    return (
        <div className="flex flex-1 md:flex-row flex-col gap-x-8 my-4 w-full md:px-[20%]">
            <div className="flex flex-col flex-1 items-center">
                <SignUpForm />
            </div>
        </div >)
}
export default SignUpClient