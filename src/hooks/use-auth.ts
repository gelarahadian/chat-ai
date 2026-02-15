import { useMutation, useQuery } from "@tanstack/react-query";
import { me, signIn, signOut, signUp } from "../services/authService";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const navigation = useRouter();
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("User Sign In Successfully");
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
};

export const useSignUp = () => {
  const navigation = useRouter();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("User Sign Up Successfully");
      navigation.push("/auth/sign-in");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected Error");
      }
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success("User Sign Out Successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Unexpected Error");
      }
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: me,
  });
};
