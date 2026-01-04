import { useEffect, useState } from 'react';

import pubLogo from '../assets/banner1.png';

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
            <div className="relative w-full overflow-hidden rounded-2xl bg-primary-purple shadow-lg">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-full shrink-0 overflow-hidden">
                            {/* Ajuste de alturas responsivas según tu aspecto 2485x564 */}
                            <div className="relative h-[180px] sm:h-[280px] md:h-[350px] lg:h-[450px] xl:h-[564px]">
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    /* object-cover asegura que llene el espacio. 
                                       object-center mantiene el contenido centrado al recortar los lados en móvil.
                                    */
                                    className="h-full w-full object-cover object-center"
                                    draggable={false}
                                />

                                {/* Overlay optimizado */}
                                <div className="pointer-events-none absolute inset-0 bg-black/20" />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Slide anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ui-textInverse/75 p-2 text-primary-purple shadow-md backdrop-blur-sm transition hover:bg-ui-textInverse focus:outline-none focus:ring-2 focus:ring-primary-cyan"
                >
                    <span className="text-2xl leading-none">‹</span>
                </button>

                <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Siguiente slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ui-textInverse/75 p-2 text-primary-purple shadow-md backdrop-blur-sm transition hover:bg-ui-textInverse focus:outline-none focus:ring-2 focus:ring-primary-cyan"
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
                                    "h-2.5 w-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-primary-cyan " +
                                    (isActive ? "bg-primary-cyan" : "bg-primary-slate/40 hover:bg-primary-slate/60")
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