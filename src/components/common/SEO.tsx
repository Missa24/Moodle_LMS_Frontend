import { Helmet } from "react-helmet-async";

type StructuredData = Record<string, unknown> | Record<string, unknown>[];

interface SEOProps {
    title: string;
    description: string;
    url?: string;
    image?: string;
    noindex?: boolean;
    structuredData?: StructuredData;
}

const SITE_NAME = "Elite Academy";

const SITE_URL = (
    import.meta.env.VITE_SITE_URL ||
    "https://moodle-lms-frontend-eight.vercel.app"
).replace(/\/$/, "");

const getAbsoluteUrl = (value: string) => {
    if (/^https?:\/\//i.test(value)) return value;
    return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

export function SEO({
    title,
    description,
    url = "/",
    image,
    noindex = false,
    structuredData,
}: SEOProps) {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonical = getAbsoluteUrl(url);
    const imageUrl = image ? getAbsoluteUrl(image) : undefined;

    return (
        <Helmet>
            <title>{fullTitle}</title>

            <meta name="description" content={description} />
            <meta
                name="robots"
                content={noindex ? "noindex, nofollow" : "index, follow"}
            />

            <link rel="canonical" href={canonical} />

            <meta property="og:type" content="website" />
            <meta property="og:locale" content="es_BO" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />

            {imageUrl && <meta property="og:image" content={imageUrl} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />

            {imageUrl && <meta name="twitter:image" content={imageUrl} />}

            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}