import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import image from '../../assets/sf.jpg'

export default function MediaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <img src={image} style={{objectFit: 'contain', height: '300px'}} />
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}