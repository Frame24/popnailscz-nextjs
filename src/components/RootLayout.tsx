"use client"; // Указываем, что это клиентский компонент

import Head from "next/head";
import localFont from "next/font/local";
import React, { useEffect } from "react";

// Подключаем шрифты
const geistSans = localFont({
    src: "/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// SEO компонент для работы с мета-данными
function SEO({
    title = "Default Title",
    description = "Default description",
    keywords = "default, keywords",
    ogImage = "/default-og-image.jpg",
    ogUrl = "https://popnailscz.cz",
}: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
}) {
    return (
        <>
            {/* SEO мета-теги */}
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />

            {/* Open Graph мета-теги для соцсетей */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={ogUrl} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Hreflang теги для локализаций */}
            <link rel="alternate" href="https://popnails.cz/" hrefLang="cs-CZ" />
            <link rel="alternate" href="https://popnails.cz/en" hrefLang="en" />
            <link rel="alternate" href="https://popnails.cz/ru" hrefLang="ru" />

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        name: "Popnailscz",
                        image: ogImage,
                        url: ogUrl,
                        telephone: "+420123456789",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "Praha 1, Náměstí",
                            addressLocality: "Praha",
                            postalCode: "11000",
                            addressCountry: "CZ",
                        },
                        openingHours: "Mo,Tu,We,Th,Fr 09:00-19:00",
                        priceRange: "$$",
                    }),
                }}
            />
        </>
    );
}

export default function RootLayout({
    children,
    seoData = { data: [] },
    strapiBaseUrl = "",
    heroImage = {},
}: {
    children: React.ReactNode;
    seoData?: { data: any };
    strapiBaseUrl?: string;
    heroImage?: any;
}) {
    // Обработка SEO данных
    const seoContent = seoData?.data?.[0] || {};
    const ogImageUrl = seoContent?.ogImage?.[0]?.url
        ? `/api/image-proxy?url=${encodeURIComponent(`${strapiBaseUrl}${seoContent.ogImage[0].url}`)}`
        : "/default-og-image.jpg";

    // Обработка изображения героя
    const heroImageUrl = heroImage?.data?.Image?.url
        ? `/api/image-proxy?url=${encodeURIComponent(`${strapiBaseUrl}${heroImage.data.Image.url}`)}`
        : "/default-hero-image.jpg";

    // Пассивный прослушиватель
    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                console.log("Scroll event detected");
            };
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);


    return (
        <>
            <Head>
                <title>{seoContent?.Title || "Default Title"}</title>
                <SEO
                    title={seoContent?.Title || "Default Title"}
                    description={seoContent?.Description || "Default description"}
                    keywords={seoContent?.Keywords || "default, keywords"}
                    ogImage={ogImageUrl}
                    ogUrl={seoContent?.ogUrl || "https://popnailscz.cz"}
                />

                {/* Предзагрузка изображений */}
                <link rel="preload" href={heroImageUrl} as="image" />
                <link
                    rel="preload"
                    href="/fonts/GeistVF.woff"
                    as="font"
                    type="font/woff"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/GeistMonoVF.woff"
                    as="font"
                    type="font/woff"
                    crossOrigin="anonymous"
                />
            </Head>
            <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </div>
        </>
    );
}
