import { useRouter } from "next/router";
import { login, register } from "../services/auth.services";

function useAuth() {
  const router = useRouter();

  const registerFunction = async (data) => {
    let response = await register(data);
    console.log(response);
    //  router.push('/api/auth/logout')
  };
  const loginFunction = async (data) => {
    let response = await login(data);
    console.log(response);
    //  router.push('/api/auth/logout')
  };
  return {
    registerFunction,
    loginFunction,
  };
}

export default useAuth;
