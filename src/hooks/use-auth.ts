import {useMutation} from '@tanstack/react-query'
import { me, signIn, signUp } from '../services/authService'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useSignIn = () => { 
    const navigation = useRouter();
    return useMutation({
      mutationFn: signIn,
      onSuccess: (res) => {
        toast.success("User Sign In Successfully");
        const data = res.data
        localStorage.setItem("token", data.token    )
        navigation.push("/chat");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Unexpected Error");
        }
      },
    });
}

export const useSignUp = () => {
    const navigation = useRouter();
    return useMutation ({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success("User Sign Up Successfully")
            navigation.push("/auth/sign-in");
        },
        onError: (error) => {
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message)
            }else {
                toast.error("Unexpected Error")
            }
        }
    })
}

export const useMe = () => {
    return useMutation({
        mutationFn: me
    })
}