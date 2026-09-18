const SITE_URL =
    process.env.SITE_URL ||
    "https://moodle-lms-frontend-eight.vercel.app";

const API_URL = process.env.API_URL;

const escapeXml = (value) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");

export default async function handler(req, res) {
    try {
        if (!API_URL) {
            throw new Error("API_URL no está configurado");
        }

        const cursos = [];
        let page = 1;
        let totalPages = 1;

        do {
            const response = await fetch(
                `${API_URL}/curso?page=${page}&limit=50`
            );

            if (!response.ok) {
                throw new Error("No se pudieron obtener los cursos");
            }

            const data = await response.json();

            cursos.push(...data.data);
            totalPages = data.meta.totalPages;
            page++;
        } while (page <= totalPages);

        const paginasEstaticas = [
            {
                url: "/",
                changefreq: "weekly",
                priority: "1.0",
            },
            {
                url: "/cursos",
                changefreq: "daily",
                priority: "0.9",
            },
            {
                url: "/politica-de-privacidad",
                changefreq: "yearly",
                priority: "0.3",
            },
        ];

        const paginasCursos = cursos
            .filter((curso) => curso.slug)
            .map((curso) => ({
                url: `/cursos/${curso.slug}`,
                changefreq: "weekly",
                priority: "0.8",
            }));

        const paginas = [
            ...paginasEstaticas,
            ...paginasCursos,
        ];

        const urls = paginas
            .map(
                (pagina) => `
    <url>
        <loc>${escapeXml(`${SITE_URL}${pagina.url}`)}</loc>
        <changefreq>${pagina.changefreq}</changefreq>
        <priority>${pagina.priority}</priority>
    </url>`
            )
            .join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=3600, stale-while-revalidate=86400"
        );

        return res.status(200).send(xml);
    } catch (error) {
        console.error(error);

        return res.status(500).send("Error generando sitemap");
    }
}