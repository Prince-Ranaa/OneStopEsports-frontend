"use client";

import { useAppSelector, useAppDispatch } from "../../../store/hook";
import { setSelectedTournament } from "../../../store/features/tournamentSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputField from "../../components/ui/Input";

export default function TournamentDetails() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const initialFormData: any = {
    teamName: "",
    player1: { name: "", gameId: "" },
    player2: { name: "", gameId: "" },
    player3: { name: "", gameId: "" },
    player4: { name: "", gameId: "" },
    player5: { name: "", gameId: "" },
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const [formErrors, setFormErrors] = useState<any>({});

  const selectedTournament = useAppSelector(
    (state) => state.tournament.selectedTournament
  );
  const router = useRouter();

  useEffect(() => {
    if (!selectedTournament) {
      router.push("/tournaments");
    }
  }, [selectedTournament, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev: any) => {
      const updated = { ...prev };
      if (keys.length === 1) {
        updated[name] = value;
      } else if (keys.length === 2) {
        const [parent, child] = keys;
        updated[parent] = { ...updated[parent], [child]: value };
      }
      return updated;
    });

    setFormErrors((prev: any) => {
      const copy = { ...prev };
      delete copy[name]; // remove error when user starts typing
      return copy;
    });
  };

  async function handleSubmit() {
    const errors: any = {};

    if (!formData.teamName.trim()) {
      errors.teamName = true;
    }

    for (let i = 1; i <= 5; i++) {
      if (!formData[`player${i}`].name.trim()) {
        errors[`player${i}.name`] = true;
      }
      if (!formData[`player${i}`].gameId.trim()) {
        errors[`player${i}.gameId`] = true;
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const response = await fetch(
      `http://localhost:4000/tournaments/${selectedTournament?._id}/register`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.success) {
      dispatch(setSelectedTournament(data.tournament));
    }

    setFormData(initialFormData);
    setShowRegistrationModal(false);
  }

  console.log(selectedTournament);
  console.log(user);

  return (
    <>
      {/* Tournament Info Box */}
      <div className="p-4 mt-3 border-red-500 border-4">
        <h1 className="text-2xl font-bold">
          {selectedTournament?.tournamentName}
        </h1>
        <p>Prize Pool: ₹{selectedTournament?.prizePool}</p>
        <p>Entry Fees: ₹{selectedTournament?.entryFees}</p>
        <p>Start Date: {selectedTournament?.startDate}</p>
        <p>
          Spots: {selectedTournament?.totalTeamRegistered} /{" "}
          {selectedTournament?.spots}
        </p>

        {selectedTournament?.registeredTeams[user!._id] ? (
          <span>Registered</span>
        ) : (
          <button
            className="p-4 mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition cursor-pointer"
            onClick={async () => {
              const res = await fetch("http://localhost:4000/checkToken", {
                method: "GET",
                credentials: "include",
              });

              if (res.ok) {
                const data = await res.json();
                console.log("Authenticated user:", data.user);
                setShowRegistrationModal(true);

                return true;
              } else {
                console.log("Not authenticated");
                router.push("/auth/login");
                return false;
              }
            }}
          >
            Register Now
          </button>
        )}
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0  z-50 flex items-center justify-center border-4 bg-black/70">
          <div className="bg-white rounded-xl shadow-lg w-[740px] h-[680px] p-6 overflow-auto">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Apple
              </h1>

              <span
                className="material-symbols-outlined cursor-pointer"
                style={{ fontSize: "32px" }}
                onClick={() => {
                  setShowRegistrationModal(false);
                  setFormData(initialFormData);
                  setFormErrors({});
                }}
              >
                close
              </span>
            </div>

            <InputField
              label="Team Name"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="Enter your team name"
              required
              error={formErrors.teamName}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="contents">
                  <InputField
                    label={`Player ${num} Name`}
                    name={`player${num}.name`}
                    value={formData[`player${num}`].name}
                    onChange={handleChange}
                    placeholder={`Enter player ${num} name`}
                    required
                    error={formErrors[`player${num}.name`]}
                  />
                  <InputField
                    label={`Player ${num} Game ID`}
                    name={`player${num}.gameId`}
                    value={formData[`player${num}`].gameId}
                    onChange={handleChange}
                    placeholder={`Enter player ${num} game ID`}
                    required
                    error={formErrors[`player${num}.gameId`]}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="cursor-pointer w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
}
