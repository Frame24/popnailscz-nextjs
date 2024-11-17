type GoogleMapComponentProps = {
    src: string; // URL карты
    title?: string; // Название для iframe
    width?: string; // Ширина
    height?: string; // Высота
    className?: string; // Классы для кастомизации
};

export default function GoogleMapComponent({
    src,
    title = "Google Map",
    width = "100%",
    height = "500",
    className = "w-full h-96 lg:h-[600px] rounded-lg shadow-lg",
}: GoogleMapComponentProps) {
    return (
        <iframe
            title={title}
            src={src}
            width={width}
            height={height}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={className}
        ></iframe>
    );
}
