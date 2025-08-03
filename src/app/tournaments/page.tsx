"use client";

import { useEffect, useState } from "react";
import TournamentCard from "./tournamentCard";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  setTournaments,
  Tournament,
} from "../../store/features/tournamentSlice";
import Modal from "../components/ui/tournamnetModal";

export default function TournamentPage() {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tournamentName: "",
    prizePool: 0,
    entryFees: 0,
    spots: 0,
    startDate: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTournament = async () => {
    try {
      const response = await fetch("http://localhost:4000/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      // const data: { data: Tournament } = await response.json();

      // dispatch(addTournament(data.data));
      setForm({
        tournamentName: "",
        prizePool: 0,
        entryFees: 0,
        spots: 0,
        startDate: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

  useEffect(() => {
    if (tournaments.length === 0) {
      fetchTournamentsFromBackend();
    }
  }, []);

  const fetchTournamentsFromBackend = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/tournaments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: { data: Tournament[] } = await response.json();
      console.log("[Fetched from backend]", data);
      dispatch(setTournaments(data.data));
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tournaments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Tournament
        </button>
      </div>

      {/* Tournament Grid */}
      <div className="grid grid-cols-4 gap-6 my-4">
        {tournaments.map((tournament: Tournament) => (
          <TournamentCard tournament={tournament} key={tournament._id} />
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3 className="text-lg font-semibold mb-4">Create New Tournament</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="tournamentName"
            placeholder="Tournament Name"
            value={form.tournamentName}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="prizePool"
            placeholder="Prize Pool"
            value={form.prizePool}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="entryFees"
            placeholder="Entry Fees"
            value={form.entryFees}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="spots"
            placeholder="Spots"
            value={form.spots}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />

          <button
            onClick={handleCreateTournament}
            className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}
