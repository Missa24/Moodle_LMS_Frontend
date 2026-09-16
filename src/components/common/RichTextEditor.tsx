import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
    value: string;
    onChange?: (html: string) => void;
    onBlur?: (html: string) => void;
    minHeight?: string;
}

export function RichTextEditor({ value, onChange, onBlur, minHeight = "150px" }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: value || "",
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
        onBlur: ({ editor }) => onBlur?.(editor.getHTML()),
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none px-3 py-2 focus:outline-none",
                style: `min-height:${minHeight}`,
            },
        },
    });

    if (!editor) return null;

    const boton = (activo: boolean): "secondary" | "ghost" => (activo ? "secondary" : "ghost");

    return (
        <div className="rounded-md border">
            <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 p-1.5">
                <Button type="button" variant={boton(editor.isActive("bold"))} size="icon" className="h-7 w-7"
                    onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold className="h-3.5 w-3.5" />
                </Button>
                <Button type="button" variant={boton(editor.isActive("italic"))} size="icon" className="h-7 w-7"
                    onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic className="h-3.5 w-3.5" />
                </Button>
                <Button type="button" variant={boton(editor.isActive("underline"))} size="icon" className="h-7 w-7"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <UnderlineIcon className="h-3.5 w-3.5" />
                </Button>

                <div className="mx-1 h-4 w-px bg-border" />

                <Button type="button" variant={boton(editor.isActive("heading", { level: 2 }))} size="icon" className="h-7 w-7"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 className="h-3.5 w-3.5" />
                </Button>
                <Button type="button" variant={boton(editor.isActive("bulletList"))} size="icon" className="h-7 w-7"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List className="h-3.5 w-3.5" />
                </Button>
                <Button type="button" variant={boton(editor.isActive("orderedList"))} size="icon" className="h-7 w-7"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered className="h-3.5 w-3.5" />
                </Button>
            </div>

            <EditorContent editor={editor} className="rounded-md border bg-background text-foreground" />
        </div>
    );
}