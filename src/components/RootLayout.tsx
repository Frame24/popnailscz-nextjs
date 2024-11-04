// components/RootLayout.tsx

"use client";  // Указываем, что это клиентский компонент

import Head from 'next/head';
import localFont from 'next/font/local';
import React from 'react';

// Подключаем шрифты
const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

// SEO компонент для работы с мета-данными
function SEO({
    title,
    description,
    keywords,
    ogImage = "https://popnailscz.example.com/og-image.jpg",
    ogUrl = "https://popnailscz.cz",
}: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
    ogUrl?: string;
}) {
    return (<Head>
        {/* SEO мета-теги */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

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
        <link rel="alternate" href="https://popnailscz.netlify.app/" hrefLang="cs-CZ" />
        <link rel="alternate" href="https://popnailscz.netlify.app/en" hrefLang="en" />
        <link rel="alternate" href="https://popnailscz.netlify.app/ru" hrefLang="ru" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
            {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Popnailscz",
                "image": ogImage,
                "url": ogUrl,
                "telephone": "+420123456789",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Praha 1, Náměstí",
                    "addressLocality": "Praha",
                    "postalCode": "11000",
                    "addressCountry": "CZ"
                },
                "openingHours": "Mo,Tu,We,Th,Fr 09:00-19:00",
                "priceRange": "$$"
            })}
        </script>
    </Head>

    );
}

export default function RootLayout({
    children,
    seoData = { data: [] },
    strapiBaseUrl,
}: Readonly<{
    children: React.ReactNode;
    seoData?: { data: any };
    strapiBaseUrl: string;
}>) {
    const seoContent = seoData?.data[0];
    const ogImageUrl = `${strapiBaseUrl}${seoContent?.ogImage[0]?.url || ""}`;
    // console.log(`${strapiBaseUrl} ${ogImageUrl}`)

    return (
        <>
            <SEO
                title={seoContent?.Title}
                description={seoContent?.Description}
                keywords={seoContent?.Keywords}
                ogImage={ogImageUrl}
                ogUrl={seoContent?.ogUrl}
            />
            <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </div>
        </>
    );
}
