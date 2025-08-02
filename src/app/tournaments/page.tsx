"use client";

import { useEffect, useState } from "react";
import TournamentCard from "./tournamentCard";

export default function TournamentPage() {
  const [allTournaments, setAllTournaments] = useState([]);
  useEffect(() => {
    getTournaments();
  }, []);

  async function getTournaments() {
    const response = await fetch("http://localhost:4000/tournaments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // only needed if using cookies
    });

    const allTournaments = await response.json();
    console.log(allTournaments);
    setAllTournaments(allTournaments.data);
  }
  return (
    <div className="grid grid-cols-4 gap-6 my-4 ">
      {allTournaments.map((tournament: any, index: number) => (
        <TournamentCard tournament={tournament} key={index} />
      ))}
    </div>
  );
}
