import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials() {
	const testimonials = [
		{
			name: "Sarah Johnson",
			title: "USA",
			avatar: "",
			review:
				"StayGenius made my trip so easy! The AI search feature was a game-changer. I found exactly what I was looking for in minutes.",
			rating: 5,
		},
		{
			name: "Rajesh Kumar",
			title: "India",
			avatar: "",
			review:
				"I discovered a hidden gem in Bali thanks to StayGenius. It was the best vacation I’ve ever had!",
			rating: 4,
		},
		{
			name: "Alice Thompson",
			title: "UK",
			avatar: "",
			review:
				"Their customer service is excellent, and the hotel recommendations were perfect. I’ll definitely use StayGenius again!",
			rating: 5,
		},
		{
			name: "Liam O'Brien",
			title: "Australia",
			avatar: "",
			review:
				"I’ve traveled extensively, but StayGenius’s global reach and verified reviews gave me confidence in my choices. Highly recommended!",
			rating: 4,
		},
		{
			name: "Aya Nakamura",
			title: "Japan",
			avatar: "",
			review:
				"The seamless booking process made everything stress-free. StayGenius truly exceeded my expectations!",
			rating: 4,
		},
	];

	const plugin = React.useRef(
		Autoplay({ delay: 3000, stopOnInteraction: true })
	);

	return (
		<section className="container mx-auto px-8 py-20 md:py-24">
			<div className="space-y-3">
				<h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
					What Our Customers Say
				</h2>
				<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
					Hear from our satisfied customers about their experience with our
					products and services.
				</p>
			</div>
			<Carousel
				plugins={[plugin.current]}
				className="w-full relative mt-6"
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
				opts={{
					loop: true,
				}}
			>
				<CarouselContent>
					{testimonials.map((testimonial, index) => (
						<CarouselItem
							key={index}
							className="md:basis-2/3 lg:basis-1/3 xl:basis-1/3 pb-4 select-none"
						>
							<div className="p-1 flex h-full">
								<div
									key={index}
									className="flex flex-col gap-4 rounded-xl bg-background p-6 border shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
								>
									<div className="flex items-center gap-4">
										<Avatar className="h-12 w-12 border">
											<AvatarImage
												src={testimonial.avatar}
												alt={testimonial.name}
											/>
											<AvatarFallback>{testimonial.name[0]}</AvatarFallback>
										</Avatar>
										<div className="grid gap-0.5 text-left">
											<h4 className="text-lg font-semibold">
												{testimonial.name}
											</h4>
											<p className="text-sm text-muted-foreground">
												{testimonial.title}
											</p>
										</div>
									</div>
									<blockquote className="text-sm leading-relaxed text-muted-foreground">
										&ldquo;{testimonial.review}&rdquo;
									</blockquote>
									<div className="flex gap-1 align-end">
										{Array.from({ length: 5 }).map((_, index) => (
											<Star
												key={index}
												size={16}
												fill={
													index < testimonial.rating ? "#FFE234" : "transparent"
												}
												strokeWidth={index < testimonial.rating ? "0" : "2"}
												className="text-[#FFE234]"
											/>
										))}
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="container mx-auto grid max-w-5xl items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
				<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
			</div>
		</section>
	);
}
