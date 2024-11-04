// pages/index.tsx

import { GetStaticProps } from 'next';
import RootLayout from '../components/RootLayout';
import Page from './page';

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
        <RootLayout seoData={seoData} strapiBaseUrl={strapiBaseUrl}>
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
    try {
        const response = await fetch(`${process.env.STRAPI_BASE_URL}${endpoint}`);

        if (!response.ok) {
            return { data: [] };
        }

        const data = (await response.json()) as { data: any[] };
        return data && data.data ? data : { data: [] };
    } catch (error) {
        return { data: [] };
    }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const heroSection = await fetchData(`/api/hero-sections?locale=${locale}&populate[0]=Button`);
    const studioInfos = await fetchData(`/api/studio-infos?locale=${locale}&populate[0]=StudioComponents&populate[1]=StudioComponents.Icon`);
    const priceList = await fetchData(`/api/price-lists?locale=${locale}&populate[0]=PriceList&populate[1]=ButtonOnline&populate[2]=ButtonWhatsAPP`);
    const reviewSection = await fetchData(`/api/review-sections?locale=${locale}&populate[0]=Review&populate[1]=Button`);
    const faq = await fetchData(`/api/faqs?locale=${locale}&populate[0]=QA`);
    const blog = await fetchData(`/api/blog-sections?locale=${locale}&populate[0]=Blog`);
    const contact = await fetchData(`/api/contacts?locale=${locale}&populate[0]=Contact`);
    const bookingSection = await fetchData(`/api/booking-sections?locale=${locale}&populate[0]=Button`);
    const socials = await fetchData(`/api/socials?locale=${locale}&populate=*`);
    const footer = await fetchData(`/api/footers?locale=${locale}`);
    const navbar = await fetchData(`/api/navbars?locale=${locale}`);
    const heroImage = await fetchData(`/api/first-section-background?locale=${locale}&populate=*`);
    const galleryImages = await fetchData(`/api/gallery-of-work?locale=${locale}&populate=*`);
    const studioImages = await fetchData(`/api/studio?locale=${locale}&populate=*`);

    // Получаем данные SEO для текущей локализации
    const seoData = await fetchData(`/api/seos?locale=${locale}&populate=*`);
    const strapiBaseUrl = process.env.STRAPI_BASE_URL;

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
            strapiBaseUrl,
        },
    };
};
