import * as React from "react"
import budynek from '../assets/help/budynki.png';
import budynekdodaj from '../assets/help/budynkidodaj.png';
import mieszkania from '../assets/help/mieszkania.png';
import mieszkaniedodaj from '../assets/help/mieszkaniadodaj.png';
import mieszkanie from '../assets/help/mieszkanie.png';
import mieszkanieedytuj from '../assets/help/mieszkanieedytuj.png';
import cennik from '../assets/help/cennik.png';
import cennikdodaj from '../assets/help/cennikdodaj.png';
import cennikedytuj from '../assets/help/cennikedytuj.png';
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Box, Container, Typography } from "@mui/material";

const Help = () => {

  const images = [
    { src: budynek, alt: 'Budynek', description: 'Widok budynków' },
    { src: budynekdodaj, alt: 'Dodawanie budynku', description: 'Formularz dodawania budynku' },
    { src: mieszkania, alt: 'Mieszkania', description: 'Widok mieszkań' },
    { src: mieszkaniedodaj, alt: 'Dodawanie mieszkania', description: 'Formularz dodawania mieszkania' },
    { src: mieszkanie, alt: 'Mieszkanie', description: 'Widok mieszkania' },
    { src: mieszkanieedytuj, alt: 'Edycja mieszkania', description: 'Formularz edycji mieszkania' },
    { src: cennik, alt: 'Cennik', description: 'Widok cennika' },
    { src: cennikdodaj, alt: 'Dodawanie cennika', description: 'Formularz dodawania cennika' },
    { src: cennikedytuj, alt: 'Edycja cennika', description: 'Formularz edycji cennika' },
  ];
 
  return (
    <Container sx={{ marginBottom: 8 }}>
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Typography variant="h3">{`Pomoc`}</Typography>
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h5">{`Poniżej przedstawiono jak efektywanie korzystać z systemu:`}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <Carousel className="max-w-full" style={{ width: 'auto', height: 'auto' }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1" style={{ display: 'inline-block' }}>
                  <Card style={{ display: 'inline-block', width: 'auto', height: 'auto' }}>
                    <CardContent
                      className="flex flex-col items-center justify-center p-6"
                      style={{ display: 'inline-block', width: 'auto', height: 'auto', padding: 0 }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{
                          display: 'block',
                          maxWidth: '100%',
                          height: 'auto',
                        }}
                      />
                      <Typography
                        variant="body1"
                        component="p"
                        sx={{
                          marginTop: 2,
                          textAlign: 'center',
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
    </Container>
  )
};

export default Help;
