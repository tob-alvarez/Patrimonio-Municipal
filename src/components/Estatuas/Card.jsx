import Card from '@mui/material/Card';
import './Cards.css'
import image from '../../assets/sf.jpg'

export default function MediaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <img src={image} className='cards' />
        </Card>
    );
}