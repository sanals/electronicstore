import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Box, 
  CardMedia,
  IconButton,
  Paper
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight,
  Download,
  LocationOn
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { useProducts } from '../context/ProductContext';
import Button from '../components/Button';
import { locations } from '../data/locations';

// Category images mapping
const categoryImages: Record<string, string> = {
  'Fans': 'https://picsum.photos/800/600?random=10',
  'Lighting': 'https://picsum.photos/800/600?random=11',
  'Electrical Supplies': 'https://picsum.photos/800/600?random=12',
  'Tools': 'https://picsum.photos/800/600?random=13'
};

const AUTOPLAY_DELAY = 5000; // 5 seconds

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 5); // Get first 5 products as featured
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => 
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const states = Object.keys(locations);
  const cities = selectedState ? Object.keys(locations[selectedState as keyof typeof locations]) : [];
  const localities = selectedState && selectedCity ? 
    locations[selectedState as keyof typeof locations][selectedCity] : [];

  return (
    <Container maxWidth="lg" sx={{ 
      px: { xs: 1, sm: 2, md: 3 },
      mx: 'auto'
    }}>
      {/* Featured Products Slider */}
      <Box sx={{ 
        position: 'relative',
        mb: 6,
        mt: 2,
        height: { xs: '200px', sm: '300px', md: '400px' }
      }}>
        <Paper 
          elevation={3}
          sx={{ 
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          {featuredProducts.map((product, index) => (
            <Box
              key={product.id}
              component={Link}
              to={`/product/${product.id}`}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <CardMedia
                component="img"
                image={product.images[0]}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                p: 2,
                color: 'white'
              }}>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1">
                  {product.description}
                </Typography>
              </Box>
            </Box>
          ))}
          
          <IconButton
            onClick={handlePrevSlide}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
          >
            <ChevronLeft />
          </IconButton>
          
          <IconButton
            onClick={handleNextSlide}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
          >
            <ChevronRight />
          </IconButton>

          {/* Dot indicators */}
          <Box sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1
          }}>
            {featuredProducts.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                  transition: 'background-color 0.3s'
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Store Message Section */}
      <Box sx={{ 
        textAlign: 'center', 
        my: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 }
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            mb: 3,
            fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' }
          }}
        >
          WE LIVE IN A WORLD OF
          <Box component="span" display="block">
            ENDLESS POSSIBILITIES
          </Box>
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            mb: 3,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            color: 'text.secondary'
          }}
        >
          Every creation has its own ripple effect. At Elegant Electrics, 
          every idea arises to establish a sustainable business environment and make 
          a positive difference to every life it touches.
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem' },
            color: 'text.secondary'
          }}
        >
          Relentlessly spearing ahead with passion and innovation, all our endeavours 
          reflect the enduring bond of trust that we share with our consumers time and again, 
          the pursuit of excellence drives us to work towards creating a smarter world and 
          POWER MORE POSSIBILITIES.
        </Typography>
      </Box>

      {/* Categories Grid - remove the Categories header */}
      <Grid 
        container 
        spacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        {categories.map((category) => (
          <Grid item key={category.name} xs={12} sm={6} md={4}>
            <Card 
              component={Link}
              to={`/category/${category.name}`}
              sx={{ 
                height: '100%',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Box sx={{ 
                position: 'relative',
                paddingTop: '60%', // 5:3 aspect ratio
                overflow: 'hidden'
              }}>
                <CardMedia
                  component="img"
                  image={categoryImages[category.name]}
                  alt={category.name}
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  color="primary"
                >
                  {category.name}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {category.subCategories.map((subCategory) => (
                    <Typography 
                      key={subCategory} 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      • {subCategory}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Download Catalog Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: { xs: 6, md: 8 },
        mb: { xs: 4, md: 6 },
        py: 6,
        bgcolor: 'grey.100',
        borderRadius: 2
      }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            mb: 1
          }}
        >
          DOWNLOAD PRODUCTS CATALOGUE
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'primary.main',
            mb: 3
          }}
        >
          Check our brochures for more information
        </Typography>
        <Button
          variant="contained"
          startIcon={<Download />}
          size="large"
          onClick={() => window.open('/catalog.pdf', '_blank')}
        >
          EXPLORE MORE
        </Button>
      </Box>

      {/* Locate Office Section */}
      <Box sx={{ 
        textAlign: 'center', 
        my: { xs: 4, md: 6 },
        py: 6,
        bgcolor: 'grey.100',
        borderRadius: 2
      }}>
        <LocationOn sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            mb: 3
          }}
        >
          LOCATE OUR NEAREST OFFICE
        </Typography>
        <Grid container spacing={2} maxWidth="md" sx={{ mx: 'auto', px: 2 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ width: '100%' }}>
              <select 
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
                style={{ 
                  width: '100%', 
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ width: '100%' }}>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                style={{ 
                  width: '100%', 
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: !selectedState ? '#f5f5f5' : 'white'
                }}
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ width: '100%' }}>
              <select 
                disabled={!selectedCity}
                style={{ 
                  width: '100%', 
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: !selectedCity ? '#f5f5f5' : 'white'
                }}
              >
                <option value="">Select Locality</option>
                {localities.map(locality => (
                  <option key={locality} value={locality}>
                    {locality}
                  </option>
                ))}
              </select>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage; 