import { useEffect, useState } from 'react';

import pubLogo from '../assets/PUB.svg';

const Carrusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const images = [
        pubLogo,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 mb-8">
            <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy to-brand-slate shadow-lg">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-full shrink-0">
                            <div className="relative h-[260px] sm:h-[360px] md:h-[440px]">
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="h-full w-full object-cover"
                                    draggable={false}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/35 via-transparent to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Slide anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ui-textInverse/75 p-2 text-brand-navy shadow-md backdrop-blur-sm transition hover:bg-ui-textInverse focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                >
                    <span className="text-2xl leading-none">‹</span>
                </button>

                <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Siguiente slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ui-textInverse/75 p-2 text-brand-navy shadow-md backdrop-blur-sm transition hover:bg-ui-textInverse focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                >
                    <span className="text-2xl leading-none">›</span>
                </button>

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ui-textInverse/65 px-3 py-2 backdrop-blur-sm">
                    {images.map((_, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Ir al slide ${index + 1}`}
                                onClick={() => goToSlide(index)}
                                className={
                                    "h-2.5 w-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-brand-cyan " +
                                    (isActive ? "bg-brand-cyan" : "bg-brand-slate/40 hover:bg-brand-slate/60")
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Carrusel;