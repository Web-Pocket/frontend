import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
	className?: string;
	onClick?: () => void;
}>;

const Card = ({ children, className, onClick }: CardProps) => (
	<div
		onClick={onClick}
		className={
			"rounded-xl border border-black/[.08] bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 " +
			(className ?? "")
		}
	>
		{children}
	</div>
);

export default Card;
