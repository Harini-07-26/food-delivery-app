import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Restaurant } from "../../../types";
import { RatingBadge } from "../../ui/rating-badge";
import { Clock, CircleDollarSign } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link 
      href={`/restaurants/${restaurant.id}`} 
      className="group relative flex flex-col rounded-3xl border border-border bg-card p-4 shadow-xs hover:shadow-premium-hover transition-all duration-300 hover:scale-[1.01] cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-foreground/5 dark:bg-foreground/10">
        <Image
        height={'100'}
        width={'100'}
          src={restaurant.image}
          alt={restaurant.name}
          // fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 flex-grow">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-black tracking-tight group-hover:text-brand-500 transition-colors truncate">
            {restaurant.name}
          </h3>
          <RatingBadge rating={restaurant.rating} />
        </div>
        <p className="text-xs text-foreground/50 font-semibold truncate leading-tight">
          {restaurant.cuisines.join(" • ")}
        </p>
        <div className="mt-auto pt-3.5 border-t border-border flex items-center justify-between text-xs text-foreground/55 font-bold">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-foreground/30" /> 
            {restaurant.deliveryTime} mins
          </span>
          <span className="flex items-center gap-1">
            <CircleDollarSign className="w-3.5 h-3.5 text-foreground/30" /> 
            ${restaurant.averageCost} for two
          </span>
        </div>
      </div>
    </Link>
  );
};
