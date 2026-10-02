import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    Font,
} from "@react-pdf/renderer";

import greatVibes from "@/assets/fonts/GreatVibes-Regular.ttf";
import cormorantRegular from "@/assets/fonts/CormorantGaramond-Regular.ttf";
import cormorantSemiBold from "@/assets/fonts/CormorantGaramond-SemiBold.ttf";
import certificadoImg from "@/assets/certificado_curso.jpg";

Font.register({
    family: "GreatVibes",
    src: greatVibes,
});

Font.register({
    family: "CormorantRegular",
    src: cormorantRegular,
});

Font.register({
    family: "CormorantSemiBold",
    src: cormorantSemiBold,
});

const COLORS = {
    text: "#171717",
    gold: "#A87524",
    muted: "#555555",
};

const styles = StyleSheet.create({
    page: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
    },

    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },

    codigo: {
        position: "absolute",
        top: "15%",
        left: "12.1%",
        fontFamily: "Helvetica-Oblique",
        fontSize: 15,
        color: COLORS.muted,
        letterSpacing: 0.5,
    },

    titulo: {
        position: "absolute",
        top: "30%",
        left: "8%",
        width: "84%",
        textAlign: "center",
        fontFamily: "CormorantSemiBold",
        fontSize: 26,
        color: COLORS.gold,
        letterSpacing: 1.2,
    },

    introduccion: {
        position: "absolute",
        top: "37%",
        left: "15%",
        width: "70%",
        textAlign: "center",
        fontFamily: "CormorantRegular",
        fontSize: 11.5,
        lineHeight: 1.5,
        color: COLORS.text,
    },

    academia: {
        fontFamily: "CormorantSemiBold",
        color: COLORS.gold,
    },

    curso: {
        position: "absolute",
        top: "45.5%",
        left: "8%",
        width: "84%",
        textAlign: "center",
        fontFamily: "CormorantSemiBold",
        fontSize: 22,
        color: COLORS.gold,
        letterSpacing: 0.8,
    },

    otorgado: {
        position: "absolute",
        top: "51.2%",
        left: "10%",
        width: "80%",
        textAlign: "center",
        fontFamily: "CormorantRegular",
        fontSize: 11.5,
        color: COLORS.text,
    },

    nombre: {
        position: "absolute",
        top: "53.7%",
        left: "5%",
        width: "90%",
        textAlign: "center",
        fontFamily: "GreatVibes",
        fontSize: 30,
        color: COLORS.text,
    },

    contenido: {
        position: "absolute",
        top: "61.2%",
        left: "17%",
        width: "66%",
        textAlign: "center",
        fontFamily: "CormorantRegular",
        fontSize: 11.5,
        lineHeight: 1.45,
        color: COLORS.text,
    },


    resumenTitulo: {
        fontFamily: "CormorantSemiBold",
        fontSize: 13,
        color: COLORS.gold,
    },

    resumen: {
        fontFamily: "CormorantRegular",
        fontSize: 11.5,
    },

    cargaHoraria: {
        fontFamily: "CormorantSemiBold",
        fontSize: 11.5,
    },

    fecha: {
        fontFamily: "CormorantSemiBold",
        fontSize: 11.5,
    },
});


export default function CertificadoParticipacion() {
    const certificado = {
        nombre: "Juan Pérez García",
        curso: "Criolipólisis",
        fecha: "8 de noviembre de 2025",
        cargaHoraria: "20 horas",
        codigo: "ABC123XYZ",
        resumen:
            "Este curso proporciona una comprensión completa de la criolipólisis, incluyendo teoría, técnicas y aplicaciones prácticas.",
    };

    return (
        <Document
            title={`Certificado de finalización - ${certificado.nombre}`}
            author="Elaces Latam"
            subject={`Certificación en ${certificado.curso}`}
        >
            <Page
                size="LETTER"
                orientation="portrait"
                style={styles.page}
            >
                <Image
                    src={certificadoImg}
                    style={styles.background}
                />

                <Text style={styles.codigo}>
                    {certificado.codigo}
                </Text>

                <Text style={styles.titulo}>
                    CERTIFICADO DE FINALIZACIÓN
                </Text>

                <Text style={styles.introduccion}>
                    <Text style={styles.academia}>
                        Elaces Latam
                    </Text>{" "}
                    formando profesionales en el área de la belleza,
                    se enorgullece en otorgar este certificado al
                    distinguido alumno por completar con éxito la
                    certificación en:
                </Text>

                <Text style={styles.curso}>
                    {certificado.curso}
                </Text>

                <Text style={styles.otorgado}>
                    Se otorga a:
                </Text>

                <Text style={styles.nombre}>
                    {certificado.nombre}
                </Text>

                <Text style={styles.contenido}>
                    <Text style={styles.resumenTitulo}>
                        Resumen del curso
                    </Text>

                    {"\n"}

                    <Text style={styles.resumen}>
                        {certificado.resumen}
                    </Text>

                    {"\n\n"}

                    <Text style={styles.cargaHoraria}>
                        Carga horaria: {certificado.cargaHoraria}
                    </Text>

                    {"\n"}

                    <Text style={styles.fecha}>
                        Finalizado el {certificado.fecha}
                    </Text>
                </Text>
            </Page>
        </Document>
    );
}