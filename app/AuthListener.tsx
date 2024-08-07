'use client'
import { CLEAR_AUTH_STATE, SET_USER_PROFILE, useAuthState } from "@/lib/hooks/useAuthState";
import { createClientComponentClient } from "@/lib/utils/createClientComponentClient";
import { useEffect } from "react";

const AuthListener = () => {
    const { authDispatch } = useAuthState();
    useEffect(() => {
        const supabaseAuthListener = async () => {
            const supabase = createClientComponentClient();
            supabase.auth.onAuthStateChange(async (event, session) => {
                if (event == 'SIGNED_IN' && session?.user) {
                    setTimeout(async () => {
                        const user = session.user;
                        authDispatch({
                            type: SET_USER_PROFILE, payload: {
                                email: user.email,
                                uid: user.id,
                            }
                        })
                    }, 1000);
                }
                if (event == 'SIGNED_OUT') {
                    authDispatch({ type: CLEAR_AUTH_STATE });
                }
            })
        }
        supabaseAuthListener();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>
}

export default AuthListener;