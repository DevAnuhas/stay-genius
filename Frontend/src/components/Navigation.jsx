import { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useTheme } from "@/components/ui/theme-provider";
import {
	SignedIn,
	SignInButton,
	UserButton,
	SignedOut,
} from "@clerk/clerk-react";
import { Link } from "react-router";
import { CircleUser, Menu, X } from "lucide-react";

const navigationItems = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Explore Hotels",
		path: "/hotels",
	},
	{
		title: "About Us",
		path: "/about",
	},
	{
		title: "Contact Us",
		path: "/contact",
	},
];

function Navigation() {
	const { theme } = useTheme();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useLayoutEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1024) {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isMenuOpen]);

	return (
		<header className="fixed z-50 top-0 w-full bg-background">
			{/* Desktop Navigation */}
			<div className="flex-no-wrap overflow-y-hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 lg:flex-wrap border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
				<Link
					to="/"
					className="text-2xl font-serif font-bold flex items-center gap-2"
					asChild
				>
					<img
						src={
							theme === "dark"
								? "./assets/staygenius-logo-white.png"
								: "./assets/staygenius-logo.png"
						}
						alt="StayGenius Logo"
						className="h-8"
					/>
					StayGenius
				</Link>

				<nav className="relative hidden lg:flex items-center space-x-2 mx-auto">
					{navigationItems.map((item, index) => {
						return (
							<Link key={index} to={item.path} asChild>
								<Button
									variant="ghost"
									size="sm"
									className="text-foreground/70 hover:text-foreground transition-colors justify-center hover:bg-popover"
								>
									{item.title}
								</Button>
							</Link>
						);
					})}
				</nav>

				<div className="relative hidden lg:flex space-x-6">
					<ModeToggle />
					<SignedOut>
						<SignInButton mode="modal">
							<Button>Sign In</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
						<Button asChild>
							<Link to="/account">
								<CircleUser />
								My Account
							</Link>
						</Button>
					</SignedIn>
				</div>

				{/* Mobile menu button */}
				<div className="lg:hidden flex gap-4 items-center">
					{isMenuOpen && <ModeToggle />}
					<Button
						className={`relative p-2 text-foreground transition-transform duration-300 ease-in-out transform ${
							isMenuOpen ? "rotate-90" : "rotate-0"
						}`}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						variant="outline"
						size="icon"
					>
						{isMenuOpen ? <X size={32} /> : <Menu size={32} />}
					</Button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<nav
				className={`fixed -z-1 overflow-y-auto overflow-x-hidden h-fit p-8 pt-24 mb-8 inset-0 bg-popover border-b transition-all duration-300 ease-in-out ${
					isMenuOpen
						? "opacity-100 translate-y-0"
						: "opacity-50 -translate-y-[100%] pointer-events-none"
				}`}
			>
				<div
					className="flex flex-col space-y-6 text-md font-medium transition-all duration-300 ease-in-out"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{navigationItems.map((item, index) => {
						return (
							<Link
								key={index}
								to={item.path}
								className="text-foreground/70 hover:text-foreground transition-colors justify-center"
								asChild
							>
								<Button variant="ghost" size="sm">
									{item.title}
								</Button>
							</Link>
						);
					})}
					<SignedOut>
						<SignInButton mode="modal">
							<Button>Sign In</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<Button asChild>
							<Link to="/account">
								<CircleUser />
								My Account
							</Link>
						</Button>
					</SignedIn>
				</div>
			</nav>
		</header>
	);
}

export default Navigation;
