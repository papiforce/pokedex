import { useRef, useEffect } from "react";

const OutsideClickEffect = (ref, action) => {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				action();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, action]);
};

function OutsideClick(props) {
	const wrapperRef = useRef(null);
	OutsideClickEffect(wrapperRef, props.action, props.style);

	return (
		<div style={props.style} ref={wrapperRef}>
			{props.children}
		</div>
	);
}

export default OutsideClick;
