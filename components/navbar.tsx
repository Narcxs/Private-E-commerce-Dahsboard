import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

const navbar = () => {
  return (
    <nav className="px-6 py-4 shadow flex items-center justify-between bg-white">
      <div>
        <p className="text-2xl font-bold">iDashBook</p>
      </div>

      {/* Desktop nav */}
      <ul className="hidden md:flex space-x-8 text-sm font-medium">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Pricing</li>
        <li className="cursor-pointer">Contact</li>
      </ul>

      {/* Desktop buttons */}
      <div className="hidden md:flex space-x-4">
        <Button variant="default">
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button variant="outline">
          <Link href="/sign-up">Signup</Link>
        </Button>
      </div>

      <div className="md:hidden text-sm text-gray-500">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu className="size-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <Link href="/">
                  <NavigationMenuLink>Home</NavigationMenuLink>
                </Link>
                <Link href="/pricing">
                  <NavigationMenuLink>Pricing</NavigationMenuLink>
                </Link>
                <Link href="/contact">
                  <NavigationMenuLink>Contact</NavigationMenuLink>
                </Link>
                <Link href="/sign-in">
                  <NavigationMenuLink>Login</NavigationMenuLink>
                </Link>
                <Link href="/sign-up">
                  <NavigationMenuLink>Signup</NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default navbar;
