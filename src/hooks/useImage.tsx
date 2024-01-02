import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props: any) => {
    const {alt = "", src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    return (
        <Image
            {...rest}
            src={imgSrc}
            alt={alt}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
};

export default ImageWithFallback;