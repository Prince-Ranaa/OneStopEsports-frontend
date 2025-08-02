"use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

export default function TournamentDetails() {
  //   const { id } = useParams();
  //   const [tournament, setTournament] = useState<any>(null);

  //   useEffect(() => {
  //     async function fetchTournament() {
  //       const res = await fetch(`http://localhost:4000/tournaments/${id}`);
  //       const data = await res.json();
  //       setTournament(data?.data);
  //     }
  //     if (id) fetchTournament();
  //   }, [id]);

  //   if (!tournament) return <p className="text-white">Loading...</p>;

  return (
    // <div className="text-white p-4 max-w-3xl mx-auto">
    //   <h1 className="text-3xl font-bold mb-4">{tournament.tournamentName}</h1>
    //   <img
    //     src={tournament.thumbnail || "/default-thumbnail.jpg"}
    //     alt="Tournament"
    //     className="w-full h-64 object-cover rounded-lg mb-4"
    //   />
    //   <p>
    //     <strong>Prize Pool:</strong> ₹{tournament.prizePool}
    //   </p>
    //   <p>
    //     <strong>Entry Fees:</strong> ₹{tournament.entryFees}
    //   </p>
    //   <p>
    //     <strong>Game:</strong> {tournament.game}
    //   </p>
    //   <p>
    //     <strong>Start Date:</strong>{" "}
    //     {new Date(tournament.startDate).toLocaleString()}
    //   </p>
    //   <div className="mt-4">
    //     <h2 className="text-xl font-semibold">How to Apply</h2>
    //     <p>{tournament.howToApply}</p>
    //   </div>
    //   <div className="mt-4">
    //     <h2 className="text-xl font-semibold">Rules</h2>
    //     <p>{tournament.rules}</p>
    //   </div>
    // </div>

    <h1>tournament details page</h1>
  );
}
