import { useEffect, useMemo, useState } from 'react';
import { FALLBACK_HOTEL_IMAGE } from '../../utils/hotelImages';

function HotelImage({ alt, sources = [], ...props }) {
  const sourceKey = Array.isArray(sources) ? sources.filter(Boolean).join('|') : sources || '';
  const imageSources = useMemo(
    () => [...new Set([...(Array.isArray(sources) ? sources : [sources]), FALLBACK_HOTEL_IMAGE].filter(Boolean))],
    [sourceKey],
  );
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [sourceKey]);

  const handleError = () => {
    setImageIndex((currentIndex) =>
      currentIndex < imageSources.length - 1 ? currentIndex + 1 : currentIndex,
    );
  };

  return <img alt={alt} src={imageSources[imageIndex]} onError={handleError} {...props} />;
}

export default HotelImage;
