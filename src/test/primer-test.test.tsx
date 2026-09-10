import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Configuración de Testing Library", () => {
    it("renderiza un botón correctamente", () => {
        render(
            <button>
                Iniciar curso
            </button>
        );

        expect(
            screen.getByRole("button", {
                name: "Iniciar curso",
            })
        ).toBeInTheDocument();
    });
});