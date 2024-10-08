"use client";

import { useCart } from "@contexts/CartContext";
import { useWishlist } from "@contexts/WishlistContext";

import Typography from "@components/ui/typography";

import Section from "@components/layouts/section";
import Container from "@components/layouts/container";
import Box from "@components/layouts/box";
import { Grid, GridItem } from "@components/layouts/grid";

import WishlistCard from "@components/cards/wishlist-card";

export default function WishlistSection() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <Section id="wishlist">
      <Container>
        <Box className="mb-8 md:mb-12 lg:mb-16 xl:mb-20">
          <Typography type="h2">Wishlist</Typography>
        </Box>

        <Grid className="md:grid-cols-2 gap-4 sm:gap-8">
          {items <= 0 &&
            <GridItem>
              <Typography type="h6" className="text-muted-foreground">
                There is no products in the wishlist
              </Typography>
            </GridItem>
          }

          {items?.map((item) => (
            <GridItem key={item?.id} className="col-span-1">
              <WishlistCard
                id={item?.id}
                image={item?.image}
                name={item?.name}
                price={item?.price}
                addToCart={addToCart}
                removeFromWishlist={removeFromWishlist}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
