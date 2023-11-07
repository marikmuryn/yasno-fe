import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

interface ArtistCardProps {
  text: string;
  imgSrc: string;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ text, imgSrc }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia component="img" height="140" image={imgSrc} alt={text} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {text}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
