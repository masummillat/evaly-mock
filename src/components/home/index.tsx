import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeComponent: React.FC<any> = () => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`https://api-dev.evaly.com.bd/go-catalog/api/v1/public/products`)
      .then(function (response: any) {
        console.log(response);
        setProducts(response.data.data);
      })
      .catch(function (err: any) {
        console.log(err.response.data);
      });
  }, []);
  return (
    <div>
      <h1>Prodcuts</h1>
      <ul>
        <li key={'Bangladesh cricket jersey from evaly'}>
          <Link to="/product-details/bangladesh-cricket-jersey-from-evaly-6bad62271">
            Bangladesh cricket jersey from evaly
          </Link>
        </li>
        {products.map((product: any) => (
          <li key={product.slug}>
            <Link to={`/product-details/${product.slug}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeComponent;
