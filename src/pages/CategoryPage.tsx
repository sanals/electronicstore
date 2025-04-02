import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Box,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { filteredProducts, setFilter } = useProducts();

  React.useEffect(() => {
    if (category) {
      setFilter(category);
    }
  }, [category, setFilter]);

  return (
    <Container maxWidth="lg" sx={{ 
      px: { xs: 1, sm: 2, md: 3 },
      mx: 'auto'
    }}>
      <Box sx={{ my: { xs: 2, sm: 3, md: 4 } }}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">{category}</Typography>
        </Breadcrumbs>
      </Box>

      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: { xs: 2, md: 4 },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
        }}
      >
        {category}
      </Typography>

      <Grid 
        container 
        spacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        {filteredProducts.map((product) => (
          <Grid 
            item 
            key={product.id} 
            xs={12} 
            sm={6} 
            md={4}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
          No products found in this category.
        </Typography>
      )}
    </Container>
  );
};

export default CategoryPage; 