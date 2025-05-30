import { Link } from "@heroui/link";
import { siteConfig } from "@/config/siteAdmin";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserData } from "@/api/interface";

export const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user_data = localStorage.getItem("user_data");

  useEffect(() => {
    try {
      // Check kalau dapet data (biar ga null)
      if (user_data) {
        // Fetch (parse) data from json
        const user_data_object: UserData = JSON.parse(user_data);

        // Set value to useState
        setEmail(user_data_object.UserEmail);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Unexpected Error");
    }
  }, []);

  const renderDropdownItems = () => {
    if (isLoggedIn) {
      return (
        <>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{email}</p>
          </DropdownItem>
          <DropdownItem key="my-profile" onClick={() => navigate("/profile")}>
            Profile
          </DropdownItem>
          <DropdownItem
            key="Back to Dashboard"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={async () => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Log Out
          </DropdownItem>
        </>
      );
    } else {
      return (
        <DropdownItem key="login" onClick={() => navigate("/login")}>
          <p className="font-semibold">Login</p>
          <p className="text-sm">You are not logged in</p>
        </DropdownItem>
      );
    }
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent
        className="flex lg:hidden basis-1 pl-4 -mr-12"
        justify="start"
      >
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="mx-auto gap-3 max-w-fit" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/admin"
          >
            <Logo />
            <p className="font-bold text-inherit">Webinar UKDC</p>
          </Link>
        </NavbarBrand>
        {isLoggedIn && (
          <NavbarItem className="hidden lg:flex">
            <Link href="/admin" color="foreground">
              Dashboard
            </Link>
          </NavbarItem>
        )}
        {isLoggedIn && (
          <NavbarItem className="hidden lg:flex">
            <Link href="/admin/user" color="foreground">
              User
            </Link>
          </NavbarItem>
        )}
        {isLoggedIn && (
          <NavbarItem className="hidden lg:flex">
            <Link href="/admin/webinar" color="foreground">
              Webinar
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="items-center gap-4" justify="end">
        {isLoggedIn && <NavbarItem className="hidden lg:flex"></NavbarItem>}
        <ThemeSwitch className="hidden lg:block" />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={isLoggedIn ? email : "Guest"}
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {renderDropdownItems()}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <ThemeSwitch />
          {isLoggedIn
            ? siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link color="foreground" href={item.href} size="lg">
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))
            : null}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
