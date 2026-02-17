// TODO rewrite function to only update metadata when needed based on existing user in Convex DB

// "use server";

// import React from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { useConvexAuth, useMutation } from "convex/react";
// import { useNavigate } from "react-router";
// import { api } from "../../../convex/_generated/api";

// export default function Metadata() {
// 	const { userId } = useAuth();
// 	const { isAuthenticated } = useConvexAuth();
// 	const navigate = useNavigate();
// 	const updateMetadata = useMutation(api.mutations.updateMetadata)

// 	React.useEffect(() => {
// 		if (!userId || !isAuthenticated) {
// 			return;
// 		}

// 		updateMetadata({ userId });
// 		navigate('/playercreate', { replace: true });
		

// 	}, [isAuthenticated, navigate, updateMetadata, userId]);

// 	return <div>Initializing...</div>;
// }