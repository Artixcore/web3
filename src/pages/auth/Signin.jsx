import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useToast from "@/hooks/useToast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/lib/utils";

const Signin = () => {
  const { signIn, loading, setLoading } = useContext(AuthContext);
  const { showToast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((res) => {
        localStorage.setItem("userId", res?.user?.uid);

        setLoading(false);
        navigate(from, { replace: true });
        showToast("SignIn successful!");
        reset();
      })
      .catch((err) => {
        setLoading(false);
        showToast(err.message);
        console.error(err);
      });
  };

  return (
    <main className="min-h-dvh flex items-center justify-center">
      <div className="p-10 rounded-md shadow-md border space-y-5  w-[80%] max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-1">
          <h3>Signin</h3>
          <p>Enter your signin credentials</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="outline-none border-b border-black"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <span className="text-red-500  text-sm">Email is required</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="outline-none border-b border-black"
              {...register("password", { required: true })}
            />

            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          <Button
            type="submit"
            className={cn(
              "w-full rounded-full",
              loading && buttonVariants({ variant: "loading" })
            )}
          >
            {loading ? <LoadingSpinner /> : "Signin"}
          </Button>
        </form>

        <p>
          Don&apos;t have an account yet?{" "}
          <Link
            className="text-blue-500 hover:underline underline-offset-4"
            to="/signup"
          >
            Signup
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signin;
