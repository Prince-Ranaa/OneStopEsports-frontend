"use client";

import { useEffect, useState } from "react";
import TournamentCard from "./tournamentCard";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  setTournaments,
  Tournament,
  addTournament,
} from "../../store/features/tournamentSlice";
import Modal from "../components/ui/PopupModal";
import InputField from "../components/ui/Input";
import Stepper, { Step } from "../components/ui/stepper";

export default function TournamentPage() {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector((state) => state.tournament.tournaments);
  const user = useAppSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const [initialformData, setInitialformData] = useState({
    tournamentName: "",
    prizePool: "",
    thumbnail: "",
    entryFees: "",
    howToApply: "",
    rules: "",
    spots: "",
    startDate: "",
    status: "",
    game: "",
    createdBy: "",
  });

  const [formData, setFormData] = useState(initialformData);
  const [formErrors, setFormErrors] = useState<any>({});
  const [step, setStep] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev: any) => ({
      ...prev,
      [name]: value ? false : prev[name],
    }));
  };

  const handleSubmit = async () => {
    try {
      formData.createdBy = user!._id;

      const response = await fetch("http://localhost:4000/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // read response first

      if (!response.ok) {
        // show backend error if provided
        console.error(
          "Failed to create tournament:",
          data.message || "Unknown error"
        );
        return;
      }

      console.log(data);

      if (data.success) {
        const createdTournament = data.tournament;
        dispatch(addTournament(createdTournament));
      }

      setFormData(initialformData);
      setShowStepper(false);
      setStep(0);
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

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
      dispatch(setTournaments(data.data));
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tournaments.length === 0) {
      fetchTournamentsFromBackend();
    }
  }, []);

  const isPrivileged = user?.role === "admin" || user?.role === "staff";

  function closeStepper() {
    setShowStepper(false);
  }

  const stepFields: Record<number, string[]> = {
    0: [
      "tournamentName",
      "game",
      "prizePool",
      "entryFees",
      "spots",
      "startDate",
    ],
    1: ["howToApply", "rules"],
  };

  function validateForm() {
    const errors: any = {};
    const fields = stepFields[step];

    fields.forEach((field) => {
      const key = field as keyof typeof formData;
      if (!formData[key]) errors[key] = true;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors((prev: any) => ({
        ...prev,
        ...errors,
      }));
    }

    console.log(formErrors);

    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
    }
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tournaments</h2>
        {isPrivileged && (
          <button
            onClick={() => {
              setShowStepper(true);
              setFormErrors({});
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Create Tournament
          </button>
        )}
      </div>

      {/* Tournament Grid */}
      <div className="grid grid-cols-4 gap-6 my-4">
        {tournaments.map((tournament: Tournament) => (
          <TournamentCard tournament={tournament} key={tournament._id} />
        ))}
      </div>

      {/* Modal */}
      {isPrivileged && (
        <Stepper
          showStepper={showStepper}
          onSubmit={handleSubmit}
          closeStepper={closeStepper}
          title={"Create Tournament"}
          step={step}
          validateForm={validateForm}
          setStep={setStep}
        >
          <Step title="Tournament Details">
            <div className="space-y-4 grid grid-cols-2 gap-4">
              <InputField
                label="Tournament Name"
                type="text"
                name="tournamentName"
                value={formData.tournamentName}
                onChange={handleChange}
                placeholder="Tournament Name"
                required
                error={formErrors.tournamentName}
              />

              <InputField
                type="text"
                name="game"
                value={formData.game}
                onChange={handleChange}
                placeholder="Game Name"
                label="Game Name"
                required
                error={formErrors.game}
              />

              <InputField
                type="number"
                name="prizePool"
                value={formData.prizePool}
                onChange={handleChange}
                placeholder="Enter Total Prize Pool"
                label="Total Prize Pool"
                required
                error={formErrors.prizePool}
              />

              <InputField
                type="number"
                name="entryFees"
                value={formData.entryFees}
                onChange={handleChange}
                placeholder="Enter Entry Fees"
                label="Entry Fees"
                required
                error={formErrors.entryFees}
              />

              <InputField
                type="number"
                name="spots"
                value={formData.spots}
                onChange={handleChange}
                placeholder="Enter Total Spots"
                label="Total Spots"
                required
                error={formErrors.spots}
              />

              <InputField
                type="text"
                variant="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Start Date"
                label="Start Date"
                required
                error={formErrors.startDate}
              />
            </div>
          </Step>

          <Step title="Rules and Regulations">
            <div className="space-y-4">
              <InputField
                type="text"
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="Rules "
                required
                variant="textarea"
                label="Rules of the tournament"
                error={formErrors.rules}
              />
              <InputField
                type="text"
                name="howToApply"
                value={formData.howToApply}
                onChange={handleChange}
                placeholder="How To Apply"
                required
                variant="textarea"
                label="How To Apply"
                error={formErrors.howToApply}
              />
            </div>
          </Step>

          <Step title="Review Details">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <p>Tournament Name:</p>
                <p> {formData.tournamentName}</p>
              </div>

              <div>
                <p>Game Name:</p>
                <p> {formData.game}</p>
              </div>

              <div>
                <p>Entry Fees:</p>
                <p> {formData.entryFees}</p>
              </div>

              <div>
                <p>Prize Pool:</p>
                <p> {formData.prizePool}</p>
              </div>

              <div>
                <p>Total Spots:</p>
                <p> {formData.spots}</p>
              </div>

              <div>
                <p>Start Date:</p>
                <p> {formData.startDate}</p>
              </div>
            </div>

            <div className="mb-2">
              <p>Rules And Regulations:</p>
              <p> {formData.rules}</p>
            </div>

            <div>
              <p>How To Apply:</p>
              <p> {formData.howToApply}</p>
            </div>
          </Step>
        </Stepper>
      )}
    </div>
  );
}
