import React from 'react';
import ShopCard from './ShopCard';
import styles from './AvailableShops.module.scss';

const AvailableShops: React.FC<any> = ({ shops }) => {
  return (
    <div className={styles.availableShopWrapper}>
      <h3>Available shops</h3>
      <div className={styles.shopsCardWrapper}>
        {shops.map((shop: any, i: number) => (
          <ShopCard key={i} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default AvailableShops;
