import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './Cart.module.css';

const Cart = () => {
    return (
        <Card className={styles.cart}>
            <Card.Header className={`${styles.cartHeader} px-4 py-3`} as="h5">Your shopping cart</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go To Checkout</Button>
            </Card.Body>
        </Card>
    );
}

export default Cart;