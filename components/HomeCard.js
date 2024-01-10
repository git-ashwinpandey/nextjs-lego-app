import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HomeCard(src) {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Img variant="top" src={src.src} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;