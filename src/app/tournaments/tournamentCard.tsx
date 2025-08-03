import {
  setSelectedTournament,
  Tournament,
} from "../../store/features/tournamentSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";

type Props = {
  tournament: Tournament;
};

import { useRouter } from "next/navigation";

export default function TournamentCard({ tournament }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function showTournamentDetails() {
    dispatch(setSelectedTournament(tournament));
    router.push(`/tournaments/${tournament._id}`); // route to detail page
  }

  return (
    <div
      className="w-full bg-[#1e1e2f] text-white rounded-2xl shadow-lg overflow-hidden  cursor-pointer"
      onClick={showTournamentDetails}
    >
      {/* Thumbnail */}
      <div
        className="w-full h-[220px] bg-cover bg-center border-b border-gray-700"
        style={{
          backgroundImage: `url(${
            tournament.thumbnail || "/default-thumbnail.jpg"
          })`,
        }}
      ></div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-lg font-bold text-yellow-400">
          {tournament.tournamentName}
        </p>
        <p className="text-sm text-gray-300">
          🎁 Prize Pool:{" "}
          <span className="text-white font-semibold">
            ₹{tournament.prizePool}
          </span>
        </p>
        <p className="text-sm text-gray-300">
          💰 Entry Fees:{" "}
          <span className="text-white font-semibold">
            ₹{tournament.entryFees}
          </span>
        </p>
        <p className="text-sm text-gray-300">
          🎮 Game:{" "}
          <span className="text-white font-semibold uppercase">
            {tournament.game || "MLBB"}
          </span>
        </p>

        {/* Register Button */}
        <button className="mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition">
          Register Now
        </button>
      </div>
    </div>
  );
}
