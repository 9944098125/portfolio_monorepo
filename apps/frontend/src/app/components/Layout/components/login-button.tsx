import { Button } from "app/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginButton = () => {
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<Button
				onClick={() => navigate("/login")}
				variant="link"
				className="text-[1.2rem] font-poppins font-600">
				Login
			</Button>
		</React.Fragment>
	);
};
