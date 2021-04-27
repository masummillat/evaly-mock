/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-identical-functions */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './productDetail.scss';
import SizeComponent from './SizeComponent';
import ColorComponent from './ColorComponent';
import { Option } from '../../lib/SelectComponent';
import { FaOpencart } from 'react-icons/fa';
import AvailableShops from '../shops/AvailableShops';
import ImagePreviewZoom from './preview';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const ProductDetails: React.FC<any> = () => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [availableShops, setAvailableShops] = useState<any>(null);
  const [currentColor, setCurrentColor] = useState<Option | null>(null);
  const [currentSize, setCurrentSize] = useState<Option | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams<any>();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      axios
        .get(
          `https://api-dev.evaly.com.bd/go-catalog/api/v1/public/products/${slug}`,
        )
        .then(function (response) {
          setProductDetails(response.data.data);
          setSelectedProduct(response.data.data.product_variants[0]);
          setLoading(false);
        })
        .catch(function (err) {
          setError(err.response.data.message);
          setLoading(false);
        });
    }
  }, [slug]);

  const handleColorChange = useCallback(
    (option: Option) => {
      setCurrentColor(option);
    },
    [setCurrentColor],
  );

  const handleSizeChange = useCallback(
    (option: Option) => {
      setCurrentSize(option);
    },
    [setCurrentSize],
  );

  const handleAvailableShop = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `https://api-dev.evaly.com.bd/go-catalog/api/v1/public/shop-items/shops/${selectedProduct.variant_id}`,
      )
      .then(function (response) {
        setAvailableShops(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, [setAvailableShops, selectedProduct]);

  const handleSelectProducVariant = useCallback(
    (variant) => {
      setSelectedProduct(variant);
    },
    [setSelectedProduct],
  );

  useEffect(() => {
    if (currentColor && currentSize) {
      setSelectedProduct(
        productDetails.product_variants.find(
          (variant: any) =>
            variant.attribute_values.includes(currentColor.key) &&
            variant.attribute_values.includes(currentSize.key),
        ),
      );
    }
  }, [currentColor, currentSize]);

  useEffect(() => {
    if (selectedProduct) handleAvailableShop();
  }, [selectedProduct]);

  if (error) {
    return (
      <div className="errorWrapper">
        <h1>{error}</h1>
        <br />
        <Link to="/">Go to home</Link>
      </div>
    );
  }

  if (selectedProduct && productDetails) {
    return (
      <div>
        <div className="flex-container">
          <div className="flex-item-left">
            <div>
              {productDetails && (
                <ImagePreviewZoom image={selectedProduct.product_images[0]} />
              )}
            </div>
            <div className="product_variants_img_container">
              {productDetails.product_variants.map((variant: any) => (
                <img
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelectProducVariant(variant)}
                  key={variant.variant_id}
                  src={variant.product_images[0]}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="flex-item-right">
            <div>
              <div>
                <h2>{selectedProduct.product_name}</h2>
                <p>{selectedProduct.product_description}</p>
                <p className="sku">SKU: {selectedProduct.sku}</p>
                <div>
                  <div className="product-info">
                    BRAND:{' '}
                    <Link to="/">{`  ${selectedProduct.brand_name}`}</Link>
                    <p style={{ margin: 'auto 5px' }}>{' | '}</p>
                    <Link to="/">{`More ${selectedProduct.category_name}`}</Link>
                  </div>
                </div>
              </div>

              {productDetails.attributes.length === 2 && (
                <div className="attribute-wrapper">
                  <ColorComponent
                    colors={productDetails.attributes.find(
                      (att: any) => att.attribute_name === 'color',
                    )}
                    onChange={handleColorChange}
                  />
                  <SizeComponent
                    sizes={productDetails.attributes.find(
                      (att: any) => att.attribute_name === 'size',
                    )}
                    onChange={handleSizeChange}
                  />
                </div>
              )}
              <button
                onClick={handleAvailableShop}
                className="avaialablity-button"
              >
                <FaOpencart style={{ marginRight: 10 }} size={25} />
                {loading ? 'Loading...' : 'Check Available Shop'}
              </button>
            </div>
          </div>
        </div>
        <div>{availableShops && <AvailableShops shops={availableShops} />}</div>
      </div>
    );
  }
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Evaly loading ...</h1>
    </div>
  );
};

export default ProductDetails;
