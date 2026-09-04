import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "¿Qué es Élite Academy?",
    answer:
      "Élite Academy es una plataforma de formación donde puedes acceder a cursos, contenidos académicos y recursos diseñados para acompañar tu aprendizaje y desarrollo profesional.",
  },
  {
    question: "¿Cómo puedo acceder a mis cursos?",
    answer:
      "Una vez que estés registrado e inscrito en un curso, podrás iniciar sesión en la plataforma y encontrarlo dentro de la sección “Mis cursos”. Desde ahí podrás acceder a sus módulos, lecciones y recursos disponibles.",
  },
  {
    question: "¿Puedo estudiar desde mi celular?",
    answer:
      "Sí. La plataforma está diseñada para adaptarse a computadoras, tablets y dispositivos móviles, permitiéndote continuar tu aprendizaje desde donde te encuentres.",
  },
  {
    question: "¿Cómo están organizados los cursos?",
    answer:
      "Cada curso está organizado por módulos y lecciones para que puedas avanzar de manera clara y progresiva. Dependiendo del programa, también podrás encontrar recursos complementarios y actividades de aprendizaje.",
  },
  {
    question: "¿Puedo continuar un curso donde lo dejé?",
    answer:
      "Sí. Desde tu cuenta puedes volver a ingresar a tus cursos y continuar revisando los contenidos disponibles de acuerdo con tu avance.",
  },
  {
    question: "¿Recibiré un certificado?",
    answer:
      "Los cursos o programas que incluyen certificación permiten acceder al certificado correspondiente una vez que se hayan cumplido los requisitos académicos establecidos.",
  },
  {
    question: "¿Dónde puedo encontrar mis certificados?",
    answer:
      "Cuando un certificado haya sido habilitado para tu cuenta, podrás encontrarlo en la sección “Mis certificados”, desde donde podrás consultarlo y descargarlo.",
  },
  {
    question: "¿Qué hago si tengo problemas para ingresar a mi cuenta?",
    answer:
      "Si tienes dificultades para iniciar sesión o acceder a algún contenido, puedes comunicarte con el equipo de soporte de Élite Academy para recibir asistencia.",
  },
];

type FAQProps = {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
};

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: FAQProps) => {
  return (
    <section
      className={cn(
        "py-28 lg:py-32",
        className
      )}
    >
      <div className="container max-w-5xl">
        <div
          className={cn(
            "mx-auto grid gap-16 lg:grid-cols-2",
            className2
          )}
        >
          {/* Encabezado */}
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              FAQ
            </p>

            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Preguntas Frecuentes
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Preguntas Frecuentes
              </h2>
            )}

            <p className="max-w-md leading-snug text-muted-foreground lg:mx-auto">
              Todo lo que necesitas saber
              sobre nuestros cursos.{" "}

              <Link
                to="/contact"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Contáctanos
              </Link>{" "}

              si tienes otra duda.
            </p>
          </div>

          {/* Preguntas */}
          <div className="text-start">
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {FAQS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`${index}`}
                >
                  <AccordionTrigger>
                    {item.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
