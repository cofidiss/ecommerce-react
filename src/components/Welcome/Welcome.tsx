import { Box, Typography } from '@mui/material';

const Welcome: React.FC = () => {

  return (
    <Box
      sx={{

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
        px: 3,
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
        Welcome to the E-Commerce Store
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640 }}>
        Discover the latest fashion, shoes, and accessories. Browse top deals on clothes, watches, and more.
      </Typography>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80"
        alt="Fashion shopping"
        sx={{
          width: '100%',
          maxWidth: 760,
          borderRadius: 4,
          boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
          mt: 4,
        }}
      />
    </Box>
  );
};

export default Welcome;
