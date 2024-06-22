import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselImages } from "@/types/CarouselImages";

import { Box, Typography } from "@mui/material";

interface HelpCarouselProps {
  carouselDescription: string;
  carouselImages: CarouselImages[];
}

export default function HelpCarousel({
  carouselDescription,
  carouselImages,
}: HelpCarouselProps) {
  return (
    <>
      <div>
        <h6>{carouselDescription}</h6>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <Carousel
          className="max-w-full"
          style={{ width: "auto", height: "auto" }}
        >
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1" style={{ display: "inline-block" }}>
                  <Card
                    style={{
                      display: "inline-block",
                      width: "auto",
                      height: "auto",
                    }}
                  >
                    <CardContent
                      className="flex flex-col items-center justify-center p-6"
                      style={{
                        display: "inline-block",
                        width: "auto",
                        height: "auto",
                        padding: 0,
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{
                          display: "block",
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />
                      <Typography
                        variant="body1"
                        component="p"
                        sx={{
                          marginTop: 2,
                          textAlign: "center",
                        }}
                      >
                        {image.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Box>
    </>
  );
}
