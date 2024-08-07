'use client'

import { createClientComponentClient } from "@/lib/utils/createClientComponentClient"
import { LogoutOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
    const router = useRouter();
    const onLogout = async () => {
        const supabase = createClientComponentClient();
        await supabase.auth.signOut();
        router.replace('/login')
    }
    return (
        <div className="z-[999] sticky flex justify-end md:bottom-10 mr-10">
            <Button className="!rounded-full !p-6 !bg-black" onClick={onLogout}>
                <LogoutOutlined className="!text-white" />
            </Button>
        </div>)
}
export default LogoutButton