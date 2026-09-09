import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
    {
        title: "1. Responsable de la información",
        content: (
            <>
                <p>
                    La plataforma es administrada por <strong>Élite Academy</strong>,
                    con sede en La Paz, Bolivia.
                </p>

                <p className="mt-3">
                    Para consultas relacionadas con privacidad o tratamiento de
                    información personal, puedes comunicarte mediante nuestro
                    correo oficial.
                </p>
            </>
        ),
    },
    {
        title: "2. Información que recopilamos",
        content: (
            <p>
                Podemos recopilar información como nombre, apellidos, correo
                electrónico, teléfono, país, fotografía de perfil, información
                relacionada con cursos e inscripciones, progreso académico,
                evaluaciones y certificados, además de información técnica
                necesaria para el funcionamiento y seguridad de la plataforma.
            </p>
        ),
    },
    {
        title: "3. Inicio de sesión con Google",
        content: (
            <>
                <p>
                    Élite Academy permite utilizar Google como método de registro
                    o inicio de sesión.
                </p>

                <p className="mt-3">
                    Cuando utilizas esta opción, podemos recibir datos como tu
                    nombre, correo electrónico y fotografía de perfil, dependiendo
                    de los permisos autorizados. Élite Academy no recibe ni
                    almacena la contraseña de tu cuenta de Google.
                </p>
            </>
        ),
    },
    {
        title: "4. Uso de la información",
        content: (
            <p>
                Utilizamos la información para gestionar cuentas, permitir el
                acceso a la plataforma, administrar cursos e inscripciones,
                registrar el progreso académico, gestionar certificados, brindar
                soporte y mantener la seguridad y funcionamiento de nuestros
                servicios.
            </p>
        ),
    },
    {
        title: "5. Fotografías y archivos",
        content: (
            <p>
                Las fotografías de perfil u otros archivos permitidos pueden ser
                gestionados mediante proveedores tecnológicos externos, como
                Cloudinary. Estos servicios pueden procesar información desde
                infraestructura ubicada fuera de Bolivia conforme a sus propias
                políticas.
            </p>
        ),
    },
    {
        title: "6. Información académica",
        content: (
            <p>
                Podemos registrar cursos, módulos, lecciones, inscripciones,
                progreso, evaluaciones, estados de acceso y certificados con la
                finalidad de proporcionar y administrar nuestros servicios
                educativos.
            </p>
        ),
    },
    {
        title: "7. Pagos",
        content: (
            <p>
                Cuando se habiliten pagos en línea, podrán ser procesados mediante
                proveedores externos especializados. Élite Academy no almacenará
                directamente datos completos de tarjetas cuando estos sean
                procesados por el proveedor de pagos correspondiente.
            </p>
        ),
    },
    {
        title: "8. Compartición de información",
        content: (
            <p>
                Élite Academy no vende información personal. Los datos podrán ser
                compartidos únicamente con proveedores necesarios para operar la
                plataforma o cuando exista una obligación legal o requerimiento
                válido de una autoridad competente.
            </p>
        ),
    },
    {
        title: "9. Conservación de los datos",
        content: (
            <p>
                Conservamos la información durante el tiempo necesario para
                proporcionar nuestros servicios educativos y cumplir obligaciones
                académicas, administrativas o legales, incluyendo registros
                relacionados con certificaciones.
            </p>
        ),
    },
    {
        title: "10. Seguridad",
        content: (
            <p>
                Aplicamos medidas técnicas y administrativas destinadas a
                proteger la información frente a accesos no autorizados, pérdida,
                alteración o divulgación indebida. Sin embargo, ningún sistema
                conectado a Internet puede garantizar seguridad absoluta.
            </p>
        ),
    },
    {
        title: "11. Derechos del usuario",
        content: (
            <p>
                Puedes solicitar información sobre tus datos y, cuando
                corresponda, solicitar su actualización, corrección o eliminación.
                Algunas solicitudes podrán requerir una verificación previa de
                identidad y determinados registros podrán conservarse cuando
                existan obligaciones académicas, administrativas o legales.
            </p>
        ),
    },
    {
        title: "12. Servicios de terceros",
        content: (
            <p>
                La plataforma puede utilizar servicios externos como Google para
                autenticación, Cloudinary para gestión de imágenes y proveedores
                de alojamiento e infraestructura. Cada proveedor puede mantener
                sus propias políticas de privacidad.
            </p>
        ),
    },
    {
        title: "13. Cambios en esta política",
        content: (
            <p>
                Podemos actualizar esta Política de Privacidad cuando existan
                cambios en nuestros servicios o plataforma. La versión vigente
                indicará siempre la fecha de su última actualización.
            </p>
        ),
    },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14 lg:py-20">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Volver al inicio
                </Link>

                <header className="mt-10 border-b border-border pb-10">
                    <p className="text-sm font-medium text-primary">
                        Élite Academy
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
                        Política de Privacidad
                    </h1>

                    <p className="mt-4 text-sm text-muted-foreground">
                        Última actualización: 9 de septiembre de 2026
                    </p>

                    <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                        En Élite Academy valoramos la privacidad de nuestros
                        estudiantes y usuarios. Esta política explica cómo
                        recopilamos, utilizamos y protegemos la información
                        proporcionada al utilizar nuestra plataforma educativa.
                    </p>
                </header>

                <div className="divide-y divide-border">
                    {sections.map((section) => (
                        <section
                            key={section.title}
                            className="py-8 sm:py-10"
                        >
                            <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                                {section.title}
                            </h2>

                            <div className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                                {section.content}
                            </div>
                        </section>
                    ))}
                </div>

                <section className="border-t border-border pt-10">
                    <h2 className="text-lg font-semibold text-foreground">
                        Contacto
                    </h2>

                    <div className="mt-4 text-sm leading-7 text-muted-foreground">
                        <p>Élite Academy</p>
                        <p>La Paz, Bolivia</p>
                        <p>Correo: TU_CORREO@DOMINIO.COM</p>
                    </div>
                </section>
            </div>
        </main>
    );
}