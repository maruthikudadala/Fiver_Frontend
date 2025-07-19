import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/apiPath";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${API_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.user.role);

      if (result.user.role === "freelancer") {
        navigate("/freelancer/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    } else {
      alert(result.msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[600px] bg-white border border-gray-300 rounded-lg shadow-lg p-10 flex flex-col items-center">
        <h2 className="text-[28px] font-medium text-gray-800 mb-6 text-center">
          Welcome back!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
          {/* Email */}
          <div className="mb-[10px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-[20px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col items-center mt-4">
            <button
              type="submit"
              className="btn text-white bg-[#28a745] hover:bg-green-600 text-[18px] leading-[26px] font-semibold rounded-[8px] py-[10px] px-[20px] w-full max-w-[480px]"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
