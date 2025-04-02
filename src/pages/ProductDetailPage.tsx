import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  IconButton,
  Link as MuiLink,
  Breadcrumbs,
  Divider,
  CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useProducts } from '../context/ProductContext';
import { formatPrice } from '../utils/helpers';
import ImageModal from '../components/ImageModal';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageSwitch = () => {
    setIsLoading(true);
  };

  React.useEffect(() => {
    handleImageSwitch();
  }, [currentImageIndex]);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" color="error">Product not found</Typography>
      </Container>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ 
      px: { xs: 1, sm: 2, md: 3 },
      mx: 'auto'
    }}>
      <Box sx={{ my: { xs: 2, sm: 3, md: 4 } }}>
        <Breadcrumbs 
          aria-label="breadcrumb"
          sx={{ 
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          <MuiLink component={Link} to="/" color="inherit">
            Home
          </MuiLink>
          <MuiLink 
            component={Link} 
            to={`/category/${product.category}`} 
            color="inherit"
          >
            {product.category}
          </MuiLink>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid 
        container 
        spacing={{ xs: 1, sm: 2, md: 4 }} 
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            position: 'relative',
            paddingTop: '75%',
            backgroundColor: 'grey.100',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {isLoading && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }}>
                <CircularProgress />
              </Box>
            )}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            >
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - view ${currentImageIndex + 1}`}
                onLoad={handleImageLoad}
                style={{ 
                  // width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  cursor: 'pointer',
                  opacity: isLoading ? 0.5 : 1,
                  transition: 'opacity 0.3s'
                }}
                onClick={handleImageClick}
              />
            </Box>
            {product.images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 0.5, sm: 1 }, 
            mt: { xs: 1, sm: 2 }, 
            justifyContent: 'center' 
          }}>
            {product.images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: index === currentImageIndex ? 'primary.main' : 'grey.300',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
              mt: { xs: 2, md: 0 }
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {formatPrice(product.price)}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography 
            component={Link} 
            to={`/category/${product.category}`}
            color="primary"
            sx={{ 
              display: 'block', 
              mb: 2,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Browse more {product.category}
          </Typography>
          <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, mt: { xs: 1, sm: 2 } }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Specifications</Typography>
                <List>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemText primary={key} secondary={value} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Categories</Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Category"
                      secondary={
                        <Typography
                          component={Link}
                          to={`/category/${product.category}`}
                          color="primary"
                          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          {product.category}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Sub Category" 
                      secondary={product.subCategory} 
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <ImageModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product.images}
        currentIndex={currentImageIndex}
        onPrevious={handlePrevImage}
        onNext={handleNextImage}
      />
    </Container>
  );
};

export default ProductDetailPage; 