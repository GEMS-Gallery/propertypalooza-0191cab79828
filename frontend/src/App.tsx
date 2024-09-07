import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

interface Listing {
  id: bigint;
  title: string;
  price: bigint;
  description: string;
  image: string;
}

const App: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const result = await backend.getListings();
      setListings(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setLoading(false);
    }
  };

  const addNewListing = async () => {
    setLoading(true);
    try {
      const newListing = {
        title: 'New Property',
        price: BigInt(Math.floor(Math.random() * 1000000) + 100000),
        description: 'This is a new property listing.',
        image: '/api/placeholder/400/300',
      };
      const result = await backend.addListing(
        newListing.title,
        newListing.price,
        newListing.description,
        newListing.image
      );
      if ('ok' in result) {
        await fetchListings();
      } else {
        console.error('Error adding new listing:', result.err);
      }
    } catch (error) {
      console.error('Error adding new listing:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        🏠 RealEstate v0 🏠
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the future of property listings! We're in beta, so expect some bugs (and maybe a few real ones in the properties).
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={Number(listing.id)}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={listing.image}
                  alt={listing.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {listing.title}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${Number(listing.price).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={addNewListing}
        disabled={loading}
        sx={{ mt: 4 }}
      >
        Add New Listing
      </Button>
    </Container>
  );
};

export default App;
