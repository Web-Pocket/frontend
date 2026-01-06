import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
	className?: string;
}>;

const Container = ({ children, className }: ContainerProps) => (
	<div className={"mx-auto w-full max-w-5xl px-4 sm:px-6 " + (className ?? "")}>
		{children}
	</div>
);

export default Container;
