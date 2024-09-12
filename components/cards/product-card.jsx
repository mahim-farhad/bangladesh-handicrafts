"use client";

import PropTypes from "prop-types";

import clsx from "clsx";

import { useCart } from "@contexts/CartContext";
import { useWishlist } from "@contexts/WishlistContext";

import Icon from "@components/ui/icon";
import Link from "@components/ui/link";
import Typography from "@components/ui/typography";
import Image from "@components/ui/image";
import Button from "@components/ui/button";

import Box from "@components/layouts/box";

export default function ProductCard({
  id,
  image,
  name,
  slug,
  description,
  category,
  vendor,
  price
}) {
  const { addToCart } = useCart();
  const { addToWishlist, items } = useWishlist();

  const isItemExist = items.find((item) => item.id === id)

  return (
    <Box
      className={clsx(
        "relative",
        "flex flex-col",
        "min-w-0",
        "overflow-hidden",
        "group",
      )}
    >
      <Box
        className={clsx(
          "relative",
          "overflow-hidden",
        )}
      >
        <Box
          className={clsx(
            "z-10 absolute",
            "top-2 sm:top-4 left-2 sm:left-4",
            "flex gap-2 items-center",
            "py-1 px-2",
            "font-serif text-sm font-semibold",
            "text-gray-400 bg-white dark:bg-white/5"
          )}
        >
          <span>4.5</span>
          <Icon
            name="Star"
            size="xs"
            className="text-primary"
          />
          {" "}{"|"}{" "}
          <span>99</span>
          <Icon
            name="MessageSquareDiff"
            size="xs"
            className="text-primary"
          />
        </Box>

        <Link
          href={`/shop/${slug}`}
          className={clsx(
            "overflow-hidden",
            "bg-gray-50 dark:bg-white/5"
          )}
        >
          <img
            src={image}
            alt={slug}
            className={clsx(
              "group-hover:scale-110",
              "transition-all duration-500 ease-in-out"
            )}
          />
        </Link>

        <Box
          className={clsx(
            "z-10 absolute top-4 -right-10",
            "flex flex-col gap-2",
            "group-hover:right-4",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <Button
            size="sm"
            color="white"
            iconOnly
            onClick={() => addToWishlist({ id, name, price })}
          >
            <Icon
              name="Heart"
              className={clsx(
                Boolean(isItemExist) &&
                "text-primary fill-primary"
              )}
            />
          </Button>

          <Button
            size="sm"
            color="white"
            iconOnly
            onClick={() => addToCart({ id, name, price })}
          >
            <Icon name="ShoppingBag" />
          </Button>

          <Button
            size="sm"
            color="white"
            iconOnly
          >
            <Icon name="MoveUpRight" />
          </Button>
        </Box>

        <Box
          className={clsx(
            "z-10 absolute bottom-2 sm:bottom-4",
            "right-2 sm:right-4",
            "sm:hidden",
          )}
        >
          <Button
            size="xs"
            color="black"
            iconOnly
            className="shadow-md"
          >
            <Icon name="Plus" />
          </Button>
        </Box>
      </Box>

      <Box
        className={clsx(
          "py-3",
          "px-2 sm:px-4",
        )}
      >
        <Link
          href={`/stores/${vendor?.attributes.vendorSlug}`}
          className={clsx(
            "text-sm leading-5 font-semibold",
            "uppercase",
            "text-primary",
          )}
        >
          {vendor?.attributes.vendorName}
        </Link>

        <Link
          href={`/store/${slug}`}
          className={clsx(
            "block",
            "my-1 sm:my-2",
            "text-xs sm:text-sm font-normal",
            "line-clamp-3",
            "text-foreground/75",
          )}
        >
          {description}
        </Link>

        <Box
          className={clsx(
            "flex gap-x-2 items-center",
          )}
        >
          <Typography
            className={clsx(
              "font-serif",
              "text-base font-semibold uppercase",
              "text-foreground",
            )}
          >
            TK.{price - (price * 45 / 100).toFixed(2)}
          </Typography>

          <Typography
            className={clsx(
              "font-serif text-base font-semibold",
              "uppercase line-through",
              "text-foreground/50",
            )}
          >
            {price.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number
};
