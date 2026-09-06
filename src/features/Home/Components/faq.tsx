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
      id="faq"
      className={cn(
        "scroll-mt-28 bg-background",
        "py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-[50px]">
        <div
          className={cn(
            "mx-auto grid max-w-[1180px] gap-10",
            "md:gap-12",
            "lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16",
            "xl:gap-20",
            className2
          )}
        >
          {/* IZQUIERDA */}
          <div className="mx-auto w-full max-w-xl text-center lg:sticky lg:top-32 lg:mx-0 lg:max-w-[430px] lg:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
              FAQ
            </p>

            {headerTag === "h1" ? (
              <h1 className="mt-3 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-3xl lg:text-4xl">
                Preguntas frecuentes
              </h1>
            ) : (
              <h2 className="mt-3 text-2xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-3xl lg:text-4xl">
                Preguntas frecuentes
              </h2>
            )}

            <p className="mx-auto mt-4 max-w-md text-sm leading-[1.7] text-muted-foreground sm:text-base lg:mx-0">
              Todo lo que necesitas saber sobre nuestros cursos,
              la plataforma y tu experiencia de aprendizaje.
            </p>

            <p className="mx-auto mt-4 max-w-md text-xs leading-[1.7] text-muted-foreground sm:text-sm lg:mx-0">
              ¿Tienes otra consulta?{" "}
              <Link
                to="/contact"
                className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Contáctanos
              </Link>
              .
            </p>

            <div className="mx-auto mt-6 flex items-center justify-center gap-2 lg:mx-0 lg:justify-start">
              <span className="h-1 w-8 rounded-full bg-primary" />

              <span className="h-1 w-3 rounded-full bg-primary/30" />

              <span className="h-1 w-3 rounded-full bg-primary/15" />
            </div>
          </div>

          {/* DERECHA */}
          <div className="mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-none">
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {FAQS.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger
                    className="
                                            gap-4
                                            py-5
                                            text-left
                                            text-sm
                                            font-medium
                                            leading-[1.4]
                                            tracking-[-0.015em]
                                            text-foreground
                                            hover:no-underline
                                            sm:py-6
                                            sm:text-base
                                            lg:text-[17px]
                                        "
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/8 text-[9px] font-semibold text-primary sm:size-8 sm:text-[10px]">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span>
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pl-10 pr-3 sm:pb-6 sm:pl-12">
                    <p className="max-w-2xl text-xs leading-[1.75] text-muted-foreground sm:text-sm lg:text-[15px]">
                      {item.answer}
                    </p>
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