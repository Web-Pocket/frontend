import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;
type TextareaProps = ComponentProps<"textarea">;

export const Input = ({ className, ...props }: InputProps) => (
	<input
		{...props}
		className={
			"h-11 w-full rounded-lg border border-black/[.08] bg-white px-4 text-sm outline-none placeholder:text-zinc-400 focus:border-sky-400 transition-all duration-200 focus:shadow-sm " +
			(className ?? "")
		}
	/>
);

export const Textarea = ({ className, ...props }: TextareaProps) => (
	<textarea
		{...props}
		className={
			"min-h-28 w-full rounded-lg border border-black/[.08] bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-sky-400 transition-all duration-200 focus:shadow-sm " +
			(className ?? "")
		}
	/>
);
