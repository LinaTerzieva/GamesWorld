import { Link, useParams } from 'react-router-dom';
import styles from './ThankyouPage.module.css';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThankyouPage = (): JSX.Element => {

    const params = useParams();
    const orderId = params.orderId;

    return (
        <>
            <div className="main-wrapper">
                <div className="wrapper">
                    <div className={styles.thankyouWrapper}>
                        <FontAwesomeIcon className={styles.CheckIcon} icon={faCircleCheck} />
                        <div className={styles.thankyouHeader}>
                            Thank you for your order!
                        </div>
                        <div className={styles.thankyouDescr}>
                            Your order number is <span className={styles.order}>#{orderId}.</span>
                        </div>
                        <div className={styles.continueLinkWrapper}>
                            <Link to={"/catalog"} className={styles.continueLink}>Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ThankyouPage;