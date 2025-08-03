"use client";

import { useAppSelector } from "../../../store/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TournamentDetails() {
  const selected = useAppSelector(
    (state) => state.tournament.selectedTournament
  );
  const router = useRouter();

  console.log(selected);

  useEffect(() => {
    if (!selected) {
      router.push("/tournaments"); // if someone visits directly, redirect
    }
  }, [selected, router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{selected?.tournamentName}</h1>
      <p>Prize Pool: ₹{selected?.prizePool}</p>
      <p>Entry Fees: ₹{selected?.entryFees}</p>
      <p>Start Date: {selected?.startDate}</p>
      <p>Spots: {selected?.spots}</p>
      {/* ...more fields */}
    </div>
  );
}
