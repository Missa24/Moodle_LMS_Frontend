import {
  useRef,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import { cn } from "@/lib/utils";

type StickyScrollContent = {
  title: string;
  description: string;
  content?: ReactNode;
};

type StickyScrollProps = {
  content: StickyScrollContent[];
  contentClassName?: string;
};

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const ref =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    activeCard,
    setActiveCard,
  ] = useState(0);

  const { scrollYProgress } =
    useScroll({
      target: ref,
      offset: [
        "start start",
        "end end",
      ],
    });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      if (
        content.length === 0
      ) {
        return;
      }

      const nextIndex =
        Math.min(
          content.length - 1,
          Math.floor(
            latest *
            content.length
          )
        );

      setActiveCard(
        nextIndex
      );
    }
  );

  if (content.length === 0) {
    return null;
  }

  const activeItem =
    content[activeCard];

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        height: `${content.length * 100
          }vh`,
      }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="grid w-full grid-cols-[minmax(0,0.8fr)_minmax(420px,1.2fr)] items-center gap-10 lg:gap-14 xl:grid-cols-[minmax(0,0.75fr)_minmax(520px,1.25fr)] xl:gap-20">
          <div className="relative min-h-[360px]">
            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={
                  activeCard
                }
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.45,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {String(
                      activeCard +
                      1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div className="h-px w-20 bg-primary" />
                </div>

                <h2 className="mt-7 max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-foreground lg:text-5xl xl:text-6xl">
                  {
                    activeItem.title
                  }
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-[1.75] text-muted-foreground lg:text-base xl:text-lg">
                  {
                    activeItem.description
                  }
                </p>

                <div className="mt-8 flex items-center gap-2">
                  {content.map(
                    (
                      _,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
                        className={cn(
                          "h-1 rounded-full transition-all duration-500",
                          index ===
                            activeCard
                            ? "w-10 bg-primary"
                            : "w-4 bg-muted"
                        )}
                      />
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className={cn(
              "relative h-[68vh] min-h-[480px] max-h-[650px]",
              contentClassName
            )}
          >
            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={
                  activeCard
                }
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  y: -12,
                }}
                transition={{
                  duration: 0.5,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute inset-0"
              >
                {
                  activeItem.content
                }
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};