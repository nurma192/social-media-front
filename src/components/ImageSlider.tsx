import React, {useEffect, useRef} from 'react';
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import type {Image} from "../types/Image";

interface Props {
    images: Image[] | null
}

function ImageSlider({images}: Props) {
    if (!images) {
        return null;
    }
    const [mainImageId, setMainImageId] = React.useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement | HTMLButtonElement>) => {
        if (event.key === "ArrowLeft" && mainImageId > 0) {
            setMainImageId(prevState => prevState - 1);
        }
        if (event.key === "ArrowRight" && mainImageId < images.length - 1) {
            setMainImageId(prevState => prevState + 1);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const imageWidth = container.offsetWidth;
            container.scrollTo({
                left: mainImageId * imageWidth,
                behavior: "smooth"
            });
        }
    }, [mainImageId]);

    return (
        <div
            className="w-full flex focus:outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className="w-full bg-transparent relative select-none">
                <button onClick={(e) => setMainImageId(prevState => prevState - 1)}
                        // disabled={images.length === 0 || mainImageId === 0}
                        className={`absolute h-[40px] m-auto cursor-pointer bottom-0 left-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden focus:outline-none`}>
                    {(images.length !== 0 && mainImageId !== 0) && <HiChevronLeft size="2rem" color={"white"}/>}
                </button>
                <button onClick={(e) => setMainImageId(prevState => prevState + 1)}
                        className={`absolute h-[40px] m-auto cursor-pointer bottom-0 right-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden focus:outline-none`}>
                    {images.length !== 0 && mainImageId !== images.length - 1 && <HiChevronRight size="2rem" color={'white'}/>}
                </button>

                <div className="flex items-center overflow-hidden" ref={containerRef}>
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                            <img className='w-full h-full object-scale-down rounded'
                                 src={`${image.url}`}
                                 alt="addPhoto-scelet.svg"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageSlider;