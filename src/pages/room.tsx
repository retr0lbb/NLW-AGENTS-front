import { useParams, Navigate } from "react-router-dom";

type RoomParams = {
	roomId: string;
};

export function Room() {
	const params = useParams<RoomParams>();

	if (!params.roomId || params.roomId.length < 2) {
		return <Navigate replace to="/" />;
	}
	return <div>Hello Ima room with id: {params.roomId}</div>;
}
