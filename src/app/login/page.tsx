"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();
  
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Inicia sesión"
      : mode === MODE.REGISTER
      ? "Crea una cuenta"
      : mode === MODE.RESET_PASSWORD
      ? "Restablecer su contraseña"
      : "Verifica tu correo electrónico";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Iniciar sesión"
      : mode === MODE.REGISTER
      ? "Crear"
      : mode === MODE.RESET_PASSWORD
      ? "Restaurar"
      : "Verificar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      let response;
      const timeoutDuration = 3 * 60 * 1000; // Increase timeout to 3 minutes (3 * 60 * 1000 milliseconds)

      // Start the timeout after initiating the OAuth flow
      let timeoutId = setTimeout(() => {
        console.error('OAuth flow timed out');
        setError("OAuth flow timed out");
        setIsLoading(false); // Make sure loading indicator stops
      }, timeoutDuration);

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Correo electrónico de restablecimiento de contraseña enviado. Por favor revise su correo electrónico.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      // Clear the timeout after completing the OAuth flow
      clearTimeout(timeoutId);

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("¡Inicio de sesión exitoso! Usted está siendo redirigido a la tienda.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("¡Correo electrónico o contraseña no válidos!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("¡Esta cuenta ya existe");
          } else if (response.errorCode === "resetPassword") {
            setError("¡Necesitas restablecer tu contraseña!");
          } else {
            setError("¡Algo salió mal!");
          }
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          break;
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Su cuenta está pendiente de aprobación");
          break;
        default:
          setError("¡Algo salió mal!");
          break;
      }
    } catch (err) {
      console.error(err);
      setError("¡Algo salió mal!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-50px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center ">
      <form className="flex flex-col gap-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-8 rounded-lg" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Código de verificación</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Ingrese código"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            ¿Olvidó su contraseña?
          </div>
        )}
        <button
          className="bg-button text-white p-2 rounded-md disabled:bg-black disabled:cursor-not-allowed hover:bg-hovr transition duration-500"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"No"} tiene una cuenta?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
           tiene una cuenta?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Iniciar sesión
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;

