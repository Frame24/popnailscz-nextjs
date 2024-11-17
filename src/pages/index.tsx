// pages/index.tsx

import { GetStaticProps } from 'next';
import fetch from 'node-fetch';
import RootLayout from '../components/RootLayout';
import Page from './page';

// Основной компонент страницы
export default function IndexPage({
    heroSection,
    studioInfos,
    priceList,
    reviewSection,
    faq,
    blog,
    contact,
    bookingSection,
    socials,
    footer,
    navbar,
    heroImage,
    galleryImages,
    studioImages,
    seoData,
    strapiBaseUrl,
}) {
    return (
        <RootLayout seoData={seoData} strapiBaseUrl={strapiBaseUrl} heroImage={heroImage}>
            <Page
                heroSection={heroSection}
                studioInfos={studioInfos}
                priceList={priceList}
                reviewSection={reviewSection}
                faq={faq}
                blog={blog}
                contact={contact}
                bookingSection={bookingSection}
                socials={socials}
                footer={footer}
                navbar={navbar}
                heroImage={heroImage}
                galleryImages={galleryImages}
                studioImages={studioImages}
            />
        </RootLayout>
    );
}

// Функция для получения данных из Strapi
async function fetchData(endpoint: string): Promise<{ data: any[] }> {
    const url = `${process.env.STRAPI_BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Failed to fetch ${url}:`, response.statusText);
            return { data: [] };
        }

        const data = await response.json();
        return data && data.data ? data : { data: [] };
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return { data: [] };
    }
}

// Функция getStaticProps для предварительной генерации страницы
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const endpoints = [
        `/api/hero-sections?locale=${locale}&populate[0]=Button`,
        `/api/studio-infos?locale=${locale}&populate[0]=StudioComponents&populate[1]=StudioComponents.Icon`,
        `/api/price-lists?locale=${locale}&populate[0]=PriceList&populate[1]=ButtonOnline&populate[2]=ButtonWhatsAPP`,
        `/api/review-sections?locale=${locale}&populate[0]=Review&populate[1]=Button`,
        `/api/faqs?locale=${locale}&populate[0]=QA`,
        `/api/blog-sections?locale=${locale}&populate[0]=Blog`,
        `/api/contacts?locale=${locale}&populate[0]=Contact`,
        `/api/booking-sections?locale=${locale}&populate[0]=Button`,
        `/api/socials?locale=${locale}&populate=*`,
        `/api/footers?locale=${locale}`,
        `/api/navbars?locale=${locale}`,
        `/api/first-section-background?locale=${locale}&populate=*`,
        `/api/gallery-of-work?locale=${locale}&populate=*`,
        `/api/studio?locale=${locale}&populate=*`,
        `/api/seos?locale=${locale}&populate=*`,
    ];

    const results = await Promise.all(endpoints.map(fetchData));

    const [
        heroSection,
        studioInfos,
        priceList,
        reviewSection,
        faq,
        blog,
        contact,
        bookingSection,
        socials,
        footer,
        navbar,
        heroImage,
        galleryImages,
        studioImages,
        seoData,
    ] = results;

    return {
        props: {
            heroSection,
            studioInfos,
            priceList,
            reviewSection,
            faq,
            blog,
            contact,
            bookingSection,
            socials,
            footer,
            navbar,
            heroImage,
            galleryImages,
            studioImages,
            seoData,
            strapiBaseUrl: process.env.STRAPI_BASE_URL,
        },
        revalidate: 86400, // ISR: Обновление страницы
    };
};
