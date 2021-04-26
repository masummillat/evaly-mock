import React from 'react';
import { FaOpencart } from 'react-icons/fa';
import { BsChat, BsStar } from 'react-icons/bs';
import styles from './ShopCard.module.scss';

const ShopCard: React.FC<any> = ({ shop }) => {
  return (
    <div className={styles.shopCardWrapper}>
      <div className={styles.imgContainer}>
        <img src={shop.shop_image} alt="" />
      </div>

      <div className={styles.shopContent}>
        <h4>{shop.shop_name || ''}</h4>
        <div>
          {[1, 2, 3, 4, 5].map((star, i) => (
            <BsStar
              style={{ color: '#ed8935', margin: '5px 3px' }}
              key={star}
            />
          ))}
        </div>
        <div className={styles.price}>
          <del>{`৳ ${shop.price}`}</del>{' '}
          <span>{`৳ ${shop.discounted_price}`}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.chat}>
            <BsChat style={{ marginRight: 10 }} size={20} />
            Chat
          </button>
          <button className={styles.buy}>
            <FaOpencart style={{ marginRight: 10 }} size={20} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ShopCard);
