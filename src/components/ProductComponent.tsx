import { GetProduct } from '@/types/productTypes';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const ProductComponent = ({
  brand,
  images,
  price,
  title,
}: Omit<GetProduct, 'id'>) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component='img'
        height='180'
        image={images?.[0] || '/placeholder.jpg'}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h6' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Бренд: {brand}
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold' mt={1}>
          Ціна: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Детальніше</Button>
        <Button size='small' color='primary'>
          Купити
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductComponent;
