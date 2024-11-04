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
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={ogUrl} />
            <meta name="twitter:card" content="summary_large_image" />
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
    console.log(`${strapiBaseUrl} ${ogImageUrl}`)

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
