import useFetchData from "@/hooks/useFetchData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useToast from "@/hooks/useToast";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { showToast } = useToast();

  const userId = localStorage.getItem("userId");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("userId");
        showToast("Logout Successful!");
      })
      .catch((err) => {
        showToast(err.message);
      });
  };

  const {
    isLoading: customerInputLoading,
    data: customerInput,
    error: customerInputError,
  } = useFetchData({
    queryKey: "inputSubmitted",
    url: `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/customer/customerItem?customerId=${userId}&attributeToSearch=isSubmitted`,
    refetchInterval: user ? 1000 : false,
  });

  const {
    isLoading: customerConfigLoading,
    data: customerConfig,
    error: customerConfigError,
  } = useFetchData({
    queryKey: "configSubmitted",
    url: `https://zyv0q9hl1g.execute-api.us-east-2.amazonaws.com/config-stage/orderConfiguration?customerId=${userId}&attributeToSearch=isSubmitted`,
    refetchInterval: user && customerInput ? 1000 : false,
  });

  // navigation items for navbar
  const navItems = (
    <>
      {user && customerInputLoading && customerConfigLoading ? (
        <div className="lg:flex justify-between gap-5">
          <Skeleton className="w-[200px] lg:w-[70px]" />
          <Skeleton className="w-[200px] lg:w-[70px]" />
          <Skeleton className="w-[200px] lg:w-[70px]" />
          <Skeleton className="w-[200px] lg:w-[70px]" />
          <Skeleton className="w-[200px] lg:w-[70px]" />
          <Skeleton className="w-[200px] lg:w-[70px]" />
        </div>
      ) : (
        <>
          <Link to="/">Home</Link>

          {user && customerInput && customerConfig ? (
            <Link to="/trading-bot">Trading Bot</Link>
          ) : user && customerInput ? (
            <Link to="/trading-bot/customer-configuration">Trading Bot</Link>
          ) : user ? (
            <Link to="/trading-bot/customer-input">Trading Bot</Link>
          ) : (
            <></>
          )}

          <Link to="/market">Market</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact-us">Contact Us</Link>

          {user && (
            <Button onClick={handleLogout} variant="link" size="link">
              Signout
            </Button>
          )}
        </>
      )}
    </>
  );

  // stop scrolling when nav is open on small devices
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // for showing error whenever api request got failed
  if (customerInputError || customerConfigError) {
    return (
      <div className="shadow-md py-3 flex items-center justify-center">
        <p>
          An error has occurred:{" "}
          {customerInputError?.message || customerConfigError?.message}
        </p>
      </div>
    );
  }

  return (
    <nav className="shadow-md sticky top-0 z-10 bg-white">
      <div className="section-wrapper py-3 flex items-center justify-between">
        {/* left side */}
        <div className="flex items-center gap-3">
          {/* opening button */}
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
            <IoMenu className="size-6" />
          </button>

          {/* nav title */}
          <h4>Wealth Free Life</h4>

          {/* mobile navigation overlay */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "fixed top-0 left-0 w-full h-full bg-slate-300 bg-opacity-70 backdrop-blur-sm lg:hidden",
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )}
          ></div>

          {/* mobile navigation content */}
          <div
            className={cn(
              "absolute top-0 left-0 w-1/2 h-screen lg:hidden bg-white px-5 py-10 rounded transition-transform ease-in-out duration-300 z-50",
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            {/* closing button */}
            <div
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-end mb-5"
            >
              <button>
                <IoClose className="size-6" />
              </button>
            </div>

            {/* menu items */}
            <div
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-col gap-y-2 items-start"
            >
              {navItems}
            </div>
          </div>
        </div>
        {/* middle  */}
        <div className="max-lg:hidden lg:flex items-center gap-5">
          {navItems}
        </div>

        {!user && (
          <Link to="/signin">
            <Button className="rounded-full">Get Start</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
