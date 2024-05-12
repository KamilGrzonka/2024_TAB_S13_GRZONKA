import { Typography } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface PersonData {
    pesel: number;
    imieINazwisko: string;
    najmujacy: boolean;
}

export default function DisplayPerson() {
    const [user, setUser] = useState<PersonData | null>(null);
    const navigate = useNavigate();
    const location  = useLocation();

    useEffect(() => {
        async function fetchUser() {
            const osoba: PersonData = await (await fetch(
                `http://localhost:8080/api/osoby/${window.location.href.split('/osoby/')[1]}`,
            )).json();

            setUser(osoba);
        }

        fetchUser();
    }, []);

    return (
        <>
            <div className="mt-8 mx-auto max-w-md">
                <Typography variant="h3">{user?.imieINazwisko}</Typography>
                <p>PESEL: {user?.pesel}</p>
                <p>Najemca: {user?.najmujacy ? "Tak" : "Nie"} </p>
                <div id="buttons" className="mt-4">
                    <button className="edit-btn bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => 
                        navigate(`${location.pathname}/edytuj`, { state: { data: user } })
                    }>
                        Edytuj dane
                    </button>
                    {/* <button className="delete-btn bg-red-500 text-white px-4 py-2 rounded">
                        Usuń dane
                    </button> */}
                </div>
            </div></>
    )
}