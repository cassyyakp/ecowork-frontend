import { useState } from "react";
import Login from "./login";
import RegisterForm from "./register";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#e8f5f3] flex items-start justify-center px-6 py-10">
      {/* Cercles sur la PAGE - visibles uniquement sur mobile */}
      <div className="lg:hidden absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#3dbdb5]" />
      <div className="lg:hidden absolute -top-8 -right-8 w-44 h-44 rounded-full bg-[#B2F7EF]" />
      <div className="lg:hidden absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#3dbdb5]" />
      <div className="lg:hidden absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-[#B2F7EF]" />

      <div className="flex w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden bg-white min-h-[480px] relative z-10">
        {/* LEFT - FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-sm">
            {isLogin ? (
              <Login onSwitch={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitch={() => setIsLogin(true)} />
            )}
          </div>
        </div>

        {/* RIGHT - ILLUSTRATION */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-[#7BDFF2]">
          {/* Cercle angle haut droite */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#3dbdb5]" />
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-[#B2F7EF]" />

          {/* Cercle angle bas gauche */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#3dbdb5]" />
          <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-[#B2F7EF]" />

          {/* Grand cercle central derrière le laptop */}
          <div className="absolute w-72 h-72 rounded-full bg-[#3dbdb5]" />

          {/* Image laptop */}
          <img
            src="/images/111.svg"
            alt="Illustration"
            className="relative z-10 w-4/5 object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
