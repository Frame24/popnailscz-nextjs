"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {
    faTimes,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import dynamic from 'next/dynamic';

export default function Home({
    heroSection = { data: [] },
    studioInfos = { data: [] },
    priceList = { data: [] },
    reviewSection = { data: [] },
    faq = { data: [] },
    blog = { data: [] },
    contact = { data: [] },
    bookingSection = { data: [] },
    socials = { data: [] },
    footer = { data: [] },
    navbar = { data: [] },
    heroImage = { data: null },
    galleryImages = { data: [] },
    studioImages = { data: [] },
}: {
    heroSection?: { data: any },
    studioInfos?: { data: any },
    priceList?: { data: any },
    reviewSection?: { data: any },
    faq?: { data: any },
    blog?: { data: any },
    contact?: { data: any },
    bookingSection?: { data: any },
    socials?: { data: any },
    footer?: { data: any },
    navbar?: { data: any },
    heroImage?: { data: any },
    galleryImages?: { data: any },
    studioImages?: { data: any },
}) {

    const strapiBaseUrl = process.env.STRAPI_BASE_URL;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const changeLanguage = (locale: string) => {
        router.push(router.pathname, router.asPath, { locale });
    };
    // Устанавливаем фиксированный порядок элементов навбара
    const navbarOrder = ["About", "Services", "FAQ", "Blog", "Contacts"];

    // Сортируем элементы навбара в соответствии с заданным порядком
    const orderedNavbarItems = navbarOrder.map(name =>
        navbar?.data?.find((item: any) => item?.Name === name)
    ).filter((item: any) => item); // Фильтруем элементы, которые не найдены

    const GoogleMap = dynamic(() => import('../components/GoogleMapComponent'), {
        ssr: false,
    });

    return (
        <div>
            {/* Header / Навигационное меню */}
            <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                    <a href='#' className='text-xl sm:text-2xl font-bold text-gray-900'>
                        Popnailscz
                    </a>
                    <button
                        className='sm:hidden text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md'
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        aria-label='Toggle menu'
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <FontAwesomeIcon icon={faTimes} className='w-6 h-6' />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className='w-6 h-6' />
                        )}
                    </button>
                    <nav
                        className={`${isMenuOpen ? 'block' : 'hidden'} sm:block absolute top-full left-0 w-full bg-white sm:relative sm:w-auto sm:flex sm:items-center sm:space-x-4 p-0 sm:p-0 sm:shadow-none border-t border-gray-200 sm:border-0`}
                    >
                        <ul className='flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6'>
                            {orderedNavbarItems.map((item, index) => (
                                <li key={index} className='pl-4 sm:pl-0'> {/* Отступ слева для каждого элемента */}
                                    <a href={`#${item?.Name.toLowerCase()}`} className='block text-lg sm:text-base text-gray-700 hover:text-pink-500 p-2'>
                                        {item?.Text}
                                    </a>
                                </li>
                            ))}

                            {/* Social Media Icons */}
                            <li className='flex space-x-6 mt-4 sm:mt-0 pl-4 sm:pl-0'> {/* Добавлен отступ слева */}
                                {socials?.data?.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social?.Url}
                                        className={`text-gray-600 hover:${social?.SocialName === 'WhatsApp'
                                            ? 'text-green-500'
                                            : social?.SocialName === 'Instagram'
                                                ? 'text-purple-500'
                                                : 'text-blue-500'
                                            }`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        {social?.SocialName === 'WhatsApp' && <FontAwesomeIcon icon={faWhatsapp} className='w-6 h-6' />}
                                        {social?.SocialName === 'Facebook' && <FontAwesomeIcon icon={faFacebookF} className='w-6 h-6' />}
                                        {social?.SocialName === 'Instagram' && <FontAwesomeIcon icon={faInstagram} className='w-6 h-6' />}
                                    </a>
                                ))}
                            </li>
                            {/* Language Switch Buttons */}
                            <li className='flex space-x-4 mt-4 sm:mt-0 pl-4 sm:pl-0'> {/* Добавлен отступ слева */}
                                <button onClick={() => changeLanguage('cs-CZ')} className={`text-gray-700 ${router.locale === 'cs-CZ' ? 'font-bold' : ''} hover:text-pink-500`}>CZ</button>
                                <button onClick={() => changeLanguage('en')} className={`text-gray-700 ${router.locale === 'en' ? 'font-bold' : ''} hover:text-pink-500`}>EN</button>
                                <button onClick={() => changeLanguage('ru')} className={`text-gray-700 ${router.locale === 'ru' ? 'font-bold' : ''} hover:text-pink-500`}>RU</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {/* Hero секция */}
            <section className="flex flex-col items-center justify-between min-h-screen bg-center relative text-white">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={`/api/image-proxy?url=${encodeURIComponent(`${strapiBaseUrl}${heroImage.data?.Image?.url}`)}`}
                        alt={heroImage.data?.Image?.alternativeText || `Image ${heroImage.data?.Image?.name}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        className="opacity-50"
                    />
                </div>
                {/* Контент */}
                <div className='flex flex-col items-center justify-center flex-grow text-center px-4 sm:px-8 pt-24  z-10'>
                    <h1 className='text-5xl sm:text-7xl font-bold mb-4 text-shadow'>
                        {heroSection?.data[0]?.Title || "Popnailscz — Manikúra a Pedikúra v Praze"}
                    </h1>

                    <p className='mt-8 text-xl sm:text-5xl mb-10 text-shadow'>
                        {heroSection?.data[0]?.Description || "Vaše spokojenost, naše mise"}
                    </p>
                </div>
                <div className='flex justify-center w-full pb-28 z-10'>
                    <a
                        href={heroSection?.data[0]?.Button[0]?.ButtonLink || "https://n995838.alteg.io"}
                        className='px-28 py-8 sm:px-32 sm:py-10 bg-pink-500 text-white text-2xl sm:text-3xl font-semibold rounded-full shadow-lg hover:bg-pink-700'
                    >
                        {heroSection?.data[0]?.Button[0]?.ButtonText || "Objednat se online"}
                    </a>
                </div>
            </section>
            {/* О нас секция */}
            <section id='about' className='py-12 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100'>
                <h2 className='text-5xl font-extrabold text-center text-pink-700 mb-8 font-serif tracking-wide'>
                    {studioInfos?.data?.[0]?.Title || "Naše Studio"}
                </h2>
                <div className='container mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24'>
                    <div className='w-full lg:w-1/2 grid grid-cols-1 gap-8'>
                        {studioInfos?.data?.[0]?.StudioComponents?.map((component, index) => (
                            <div
                                key={index}
                                className='bg-white p-6 rounded-xl shadow-lg flex items-start transition hover:shadow-2xl transform hover:scale-105'
                            >
                                {component?.Icon && (
                                    <Image
                                        src={`/api/image-proxy?url=${encodeURIComponent(`${strapiBaseUrl}${component?.Icon?.url || component?.Icon?.formats?.thumbnail?.url}`)}`}
                                        alt={component?.Title || "Icon"}
                                        width={48} // Укажите ширину изображения
                                        height={48} // Укажите высоту изображения
                                        className='w-12 h-12 mr-4 self-start' // Добавлено 'self-start' для выравнивания по верхнему краю
                                    />
                                )}
                                <div className='flex-grow'>
                                    <h4 className='text-2xl font-bold text-gray-800 mb-2'>{component?.Title}</h4>
                                    <p className='text-lg text-gray-700'>{component?.Description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Слайдер с изображениями студии */}
                    <div className='w-full lg:w-1/2'>
                        {studioImages?.data?.Images?.length > 0 ? (
                            <div className='relative w-full max-w-lg mx-auto'>
                                <Swiper
                                    effect='fade'
                                    navigation
                                    pagination={{ clickable: true }}
                                    modules={[EffectFade, Navigation, Pagination]}
                                    className='w-full h-[500px] flex items-center justify-center overflow-hidden'
                                >
                                    {studioImages.data?.Images.map((image, index) => (

                                        <SwiperSlide key={index}>
                                            <div className="relative w-full h-full"> {/* Контейнер с фиксированной высотой */}
                                                <Image
                                                    src={`/api/image-proxy?url=${encodeURIComponent(`${strapiBaseUrl}${image?.url}`)}`}
                                                    alt={`Studio Popnailscz v Praze na adrese Kovářská 549/12, Praha 9 — snímek ${index + 1}`}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    className="rounded-lg shadow-xl"
                                                    loading="lazy"
                                                    unselectable="on"
                                                    onMouseDown={e => e.preventDefault()}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        ) : (
                            <p>Nejsou dostupné žádné obrázky studia.</p>
                        )}
                    </div>

                </div>
            </section>

            {/* Временная белая полоса */}
            <section className='py-6 sm:py-12 bg-gray-100 text-center'></section>

            {/* Секция с ценами */}
            <section id='services' className='py-12 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100'>
                <h2 className='text-5xl font-extrabold text-center text-pink-700 mb-8 font-serif tracking-wide'>
                    {priceList?.data[0]?.Title || "Ceník našich služeb"}
                </h2>
                {/* Hlavní kontejner s flex pro zarovnání do řady */}
                <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-24'>
                    {/* Galerie prací */}
                    <div className='w-full lg:w-1/3 flex flex-col items-center'>
                        <h3 className='text-3xl font-bold text-center mb-4 text-pink-800'>
                            {priceList?.data[0]?.GalleryTitle || "Galerie prací"}
                        </h3>
                        {galleryImages?.data?.Images?.length > 0 ? (
                            <div className='relative w-full max-w-lg'>
                                <Swiper
                                    effect='fade'
                                    navigation
                                    pagination={{ clickable: true }}
                                    modules={[EffectFade, Navigation, Pagination]}
                                    className='w-full h-80 flex items-center justify-center overflow-hidden'
                                >
                                    {galleryImages.data?.Images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="w-full h-80 relative">
                                                <Image
                                                    src={`/api/image-proxy?url=${encodeURIComponent(`${strapiBaseUrl}${image?.url}`)}`}
                                                    alt={`Práce v Popnailscz na adrese Kovářská 549/12, Praha 9 — ukázka ${index + 1}`}
                                                    fill
                                                    className="object-cover rounded-lg shadow-xl"
                                                    loading="lazy"
                                                    unselectable="on"
                                                    onMouseDown={(e) => e.preventDefault()}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Кнопки для записи */}
                                <div className='flex flex-col items-center mt-4 space-y-2'>
                                    <a
                                        href={priceList?.data[0]?.ButtonOnline[0]?.ButtonLink || "https://n995838.alteg.io"}
                                        className='px-8 py-3 bg-pink-100 text-pink-700 font-semibold rounded-full border-2 border-pink-700 hover:bg-pink-700 hover:text-white transition'
                                    >
                                        {priceList?.data[0]?.ButtonOnline[0]?.ButtonText || "Objednat se online"}
                                    </a>
                                    <a
                                        href={priceList?.data[0]?.ButtonWhatsAPP[0]?.ButtonLink || "https://wa.me/message/4KCKSARUH5V4G1"}
                                        className='px-8 py-3 bg-pink-700 text-white font-semibold rounded-full shadow-lg hover:bg-pink-800 hover:scale-105 transition'
                                    >
                                        {priceList?.data[0]?.ButtonWhatsAPP[0]?.ButtonText || "Objednat se WhatsApp"}
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p>Nejsou dostupné žádné obrázky.</p>
                        )}
                    </div>

                    {/* Таблица услуг и цен */}
                    <div className='w-full lg:w-2/3 bg-white p-10 rounded-xl shadow-xl'>
                        <table className='w-full table-auto font-serif text-lg' aria-label="Ceník služeb Popnailscz">
                            <thead>
                                <tr>
                                    <th className='text-left text-pink-700 pb-4'>{priceList?.data[0]?.header1 || "SLUŽBA"}</th>
                                    <th className='text-left text-pink-700 pb-4'>{priceList?.data[0]?.header2 || "TRVÁNÍ"}</th>
                                    <th className='text-left text-pink-700 pb-4'>{priceList?.data[0]?.header3 || "CENA"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceList?.data[0]?.PriceList?.map((service, index) => (
                                    <tr key={index} className='bg-pink-50 hover:bg-pink-100'>
                                        <td className='p-4 border-b text-gray-700'>
                                            {service?.name}
                                        </td>
                                        <td className='p-4 border-b text-gray-700'>
                                            {service?.duration}
                                        </td>
                                        <td className='p-4 border-b text-gray-700'>
                                            {service?.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Секция с отзывами */}
            <section id='reviews' className='py-6 sm:py-12 bg-gray-100 text-center'>
                <h2 className='text-4xl font-extrabold text-gray-800 mb-6'>
                    {reviewSection?.data[0]?.Title || "Recenze"}
                </h2>
                <div className='flex flex-col items-center justify-center'>
                    <div className='swiper-container max-w-lg md:max-w-4xl mx-auto'>
                        <div className='swiper-wrapper flex flex-wrap space-y-2'>
                            {reviewSection?.data[0]?.Review?.map((review, index) => (
                                <div key={index} className='swiper-slide p-4 bg-white rounded-lg shadow-md'>
                                    <p className='text-gray-600 text-sm md:text-base'>
                                        &quot;{review?.ReviewText}&quot;
                                    </p>
                                    <p className='mt-4 text-right text-gray-800 font-semibold'>
                                        — {review?.ReviewerName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <a
                        href={reviewSection?.data[0]?.Button?.ButtonLink || "https://g.page/r/CSsdh2Z8qCl1EBE/review"}
                        className='mt-6 inline-block px-8 py-3 bg-pink-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105'
                    >
                        {reviewSection?.data[0]?.Button?.ButtonText || "Zanechte recenzi"}
                    </a>
                </div>
            </section>

            {/* Секция с FAQ */}
            <section id='faq' className='py-8 sm:py-16 bg-white text-center'>
                <h2 className='text-5xl font-extrabold text-gray-800 mb-8'>{faq?.data[0]?.Title || "Často kladené otázky"}</h2>
                <div className='mt-8 max-w-3xl mx-auto text-left px-4 sm:px-8'>
                    {faq?.data[0]?.QA?.map((item, index) => (
                        <details key={index} className='mb-4 border-b border-gray-300 pb-4'>
                            <summary className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700 cursor-pointer'>
                                {item?.Question}
                            </summary>
                            <p className='mt-2 text-gray-600'>
                                {item?.Answer}
                            </p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Секция блога */}
            <section id='blog' className='py-8 sm:py-16 bg-gray-100 text-center'>
                <h2 className='text-5xl font-extrabold text-gray-800 mb-8'>
                    {blog?.data[0]?.Title || "Blog"}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
                    {blog?.data[0]?.Blog?.map((post, index) => (
                        <div key={index} className='bg-gray-100 p-6 rounded-lg shadow-lg'>
                            <h3 className='text-lg sm:text-xl sm:text-2xl font-bold text-gray-700'>
                                {post?.Title}
                            </h3>
                            <p className='mt-4 text-gray-600'>
                                {post?.BlogText}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Секция контактов */}
            <section id='contacts' className='py-6 sm:py-12 bg-pink-100 text-center'>
                <h2 className='text-4xl font-extrabold text-gray-800 mb-6 text-center'>
                    {contact?.data[0]?.Title || "Kontakty"}
                </h2>

                <div className='flex justify-center mb-6'>
                    <div className='w-full max-w-xl'>
                        {contact?.data[0]?.Contact?.map((contactInfo, index) => (
                            <div key={index} className='mb-4'>
                                {contactInfo?.ContactTitle && (
                                    <h3 className='text-xl font-bold text-gray-800 mb-2'>{contactInfo.ContactTitle}</h3>
                                )}
                                {contactInfo?.ContactText?.map((block, blockIndex) => (
                                    <p key={blockIndex} className='text-lg text-gray-600'>
                                        {block?.children[0]?.text}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <GoogleMap
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1150.8866804480301!2d14.49033183444746!3d50.10688399427101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bed0c618eb39d%3A0x7529a87c66871d2b!2sPopnailscz!5e0!3m2!1scs!2sus!4v1726827052128!5m2!1scs!2sus"
                        title="Popnails Location"
                    />
                </div>
            </section>

            {/* Секция booking */}
            <section className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 text-center py-16'>
                <h2 className='text-5xl sm:text-6xl font-extrabold text-gray-800 mb-6 drop-shadow-lg'>
                    {bookingSection?.data[0]?.Title || "Chcete se objednat hned teď?"}
                </h2>
                <p className='text-gray-700 text-xl sm:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md'>
                    {bookingSection?.data[0]?.Subtitle || "Rezervujte si termín manikúry nebo pedikúry v Popnailscz právě teď!"}
                </p>
                {bookingSection?.data[0]?.Button?.map((button, index) => (
                    <a
                        key={index}
                        href={button?.ButtonLink || "https://n995838.alteg.io"}
                        className='px-12 py-4 sm:px-24 sm:py-6 bg-pink-500 text-white text-lg sm:text-2xl font-semibold rounded-full shadow-xl hover:bg-pink-700 transition-transform transform hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-md mx-auto'
                    >
                        {button?.ButtonText || "Objednat se online"}
                    </a>
                ))}
            </section>

            {/* Footer */}
            <footer className='py-2 sm:py-4 bg-gray-900 text-white'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left'>
                    {/* Динамический текст футера */}
                    <p className='mb-4 sm:mb-0'>{footer?.data[0]?.Text || "© 2024 Popnailscz. Všechna práva vyhrazena."}</p>
                    {/* Иконки социальных сетей */}
                    <div className='flex justify-center sm:justify-start space-x-6'>
                        {socials?.data?.map((social, index) => (
                            <a
                                key={index}
                                href={social?.Url}
                                className={`text-white hover:${social?.SocialName === 'WhatsApp' ? 'text-green-500' :
                                    social?.SocialName === 'Instagram' ? 'text-purple-500' :
                                        'text-blue-500'
                                    }`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {social?.SocialName === 'WhatsApp' && <FontAwesomeIcon icon={faWhatsapp} className='w-5 h-5' />}
                                {social?.SocialName === 'Facebook' && <FontAwesomeIcon icon={faFacebookF} className='w-5 h-5' />}
                                {social?.SocialName === 'Instagram' && <FontAwesomeIcon icon={faInstagram} className='w-5 h-5' />}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}