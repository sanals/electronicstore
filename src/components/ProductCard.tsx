import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { formatPrice } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      width: {
        xs: '100%',
        sm: '100%',
        md: 345
      }
    }}>
      <Box
        component={Link}
        to={`/product/${product.id}`}
        sx={{ 
          textDecoration: 'none',
          '&:hover': { opacity: 0.9 },
          // Fixed aspect ratio container
          position: 'relative',
          paddingTop: '75%', // 4:3 aspect ratio
          overflow: 'hidden'
        }}
      >
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.name}
          sx={{ 
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        p: { xs: 1, sm: 2 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              height: { xs: 'auto', sm: '3rem' },
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis'
            }}
          >
            {product.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            {formatPrice(product.price)}
          </Typography>
        </Box>
      </CardContent>
      <Button
        component={Link}
        to={`/product/${product.id}`}
        variant="contained"
        color="primary"
        sx={{ 
          m: { xs: 1, sm: 2 },
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard; 