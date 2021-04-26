/* eslint-disable sonarjs/cognitive-complexity */
import React, { RefObject, useCallback, useRef, useState } from 'react';
import styles from './preview.module.scss';

interface ImagePreviewZoomProps {
  image: string;
}
const ImagePreviewZoom: React.FC<ImagePreviewZoomProps> = ({ image }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const handleZoom = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setVisible(true);
    if (e && ref) {
      const zoomer = ref.current;
      if (zoomer) {
        const x = (e.nativeEvent.offsetX / zoomer.offsetWidth) * 100;
        const y = (e.nativeEvent.offsetY / zoomer.offsetHeight) * 100;
        zoomer.style.background = `url('${image}')`;
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
      }
    }
  };

  return (
    <div className={styles.imgZoomContainer}>
      <img
        onMouseMove={handleZoom}
        onMouseLeave={() => setVisible(false)}
        id="myimage"
        src={image}
        width="300"
        height="300"
        alt="evaly"
        className={styles.mainImage}
      />

      {visible && <div ref={ref} className={styles.imgZoomResult} />}
    </div>
  );
};

export default React.memo(ImagePreviewZoom);
