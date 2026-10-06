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
import certificadoImg from "@/assets/certificado_modulo.jpg";

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
        backgroundColor: "#ffffff",
    },

    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },

    titulo: {
        position: "absolute",
        top: "31%",
        left: "10%",
        width: "80%",
        textAlign: "center",
        fontFamily: "CormorantSemiBold",
        fontSize: 30,
        color: COLORS.gold,
        letterSpacing: 1.3,
    },

    otorgado: {
        position: "absolute",
        top: "43%",
        left: "10%",
        width: "80%",
        textAlign: "center",
        fontFamily: "CormorantRegular",
        fontSize: 13,
        color: COLORS.text,
    },

    nombre: {
        position: "absolute",
        top: "48%",
        left: "5%",
        width: "90%",
        textAlign: "center",
        fontFamily: "GreatVibes",
        fontSize: 32,
        color: COLORS.text,
    },

    contenido: {
        position: "absolute",
        top: "56%",
        left: "15%",
        width: "70%",
        textAlign: "center",
        fontFamily: "CormorantRegular",
        fontSize: 13,
        lineHeight: 1.5,
        color: COLORS.text,
    },

    modulo: {
        fontFamily: "CormorantSemiBold",
        color: COLORS.gold,
        fontSize: 14,
    },

    fecha: {
        fontFamily: "CormorantSemiBold",
        color: COLORS.text,
    },
    qr: {
        position: "absolute",
        width: 60,
        height: 60,
        right: "10%",
        bottom: "8%",
    },
});

export default function CertificadoParticipacion({
    qrDataUrl,
}: {
    qrDataUrl: string;
}) {

    const certificado = {
        nombre: "Juan Pérez García",
        modulo: "Criolipólisis",
        fecha: "8 de noviembre de 2025",
    };

    return (
        <Document
            title={`Certificado de participación - ${certificado.nombre}`}
            author="Elaces"
            subject={`Participación en el módulo de ${certificado.modulo}`}
        >
            <Page
                size="LETTER"
                orientation="landscape"
                style={styles.page}
            >
                <Image
                    src={certificadoImg}
                    style={styles.background}
                />

                <Text style={styles.titulo}>
                    CERTIFICADO DE PARTICIPACIÓN
                </Text>

                <Text style={styles.otorgado}>
                    Se otorga a:
                </Text>

                <Text style={styles.nombre}>
                    {certificado.nombre}
                </Text>

                <Text style={styles.contenido}>
                    Se otorga este certificado de participación en el módulo de{" "}
                    <Text style={styles.modulo}>
                        "{certificado.modulo}"
                    </Text>
                    {"\n"}
                    finalizado el{" "}
                    <Text style={styles.fecha}>
                        {certificado.fecha}
                    </Text>
                </Text>
                <Image
                    src={qrDataUrl}
                    style={styles.qr}
                />
            </Page>
        </Document>
    );
}
