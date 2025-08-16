"use client";

import React, { ReactNode } from "react";

interface StepProps {
  title: string;
  children: ReactNode;
}

interface StepperProps {
  children: React.ReactElement<StepProps>[];
  onSubmit?: () => void;
  showStepper: boolean;
  closeStepper: () => void;
  title: string;
  step: number;
  validateForm: any;
  setStep: any;
}

export function Step({ children }: StepProps) {
  return <>{children}</>;
}

export default function Stepper({
  showStepper,
  children,
  onSubmit,
  closeStepper,
  title,
  step,
  validateForm,
  setStep,
}: // setStep,
StepperProps) {
  const [isReviewed, setIsReviewed] = React.useState(false);
  const steps = React.Children.toArray(
    children
  ) as React.ReactElement<StepProps>[];

  if (!showStepper) return null;

  const currentStep = step;

  return (
    <div className="w-[100vw] h-[100vh] left-0 top-0 absolute z-50 bg-black/70">
      <div className="w-[740px] relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <span
            className="material-symbols-outlined cursor-pointer text-gray-600 hover:text-red-600 text-xl"
            style={{ fontSize: "24px" }}
            onClick={closeStepper}
          >
            close
          </span>
        </div>

        {/* Step Indicators */}
        <div className="relative mb-4">
          {/* Connectors */}
          <div className="absolute top-5 left-0 w-full flex justify-between px-5 -z-10">
            {steps.slice(0, -1).map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-[2px] ${
                  index < currentStep ||
                  (isReviewed && index === steps.length - 2)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Circles */}
          <div className="flex justify-between">
            {steps.map((_, index) => {
              const isActive = index === currentStep;
              const isCompleted =
                index < currentStep ||
                (isReviewed && index === steps.length - 1);

              return (
                <div
                  key={index}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium ${
                    isCompleted
                      ? "bg-green-500 text-white border-green-500"
                      : isActive
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-200 text-gray-500 border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">
          {steps[currentStep].props.title}
        </h2>

        {/* Step Content with Scroll */}
        <div className="bg-white min-h-[180px] max-h-[360px] overflow-y-auto pr-2">
          {steps[currentStep]}
        </div>

        {/* Review Checkbox */}
        {currentStep === steps.length - 1 && (
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isReviewed}
                onChange={(e) => setIsReviewed(e.target.checked)}
              />
              <span>I have reviewed all the information</span>
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {currentStep !== 0 ? (
            <button
              className="px-4 py-2 rounded-lg bg-gray-300"
              onClick={() => {
                console.log("prev");

                setStep(step - 1);
                setIsReviewed(false);
              }}
            >
              Previous
            </button>
          ) : (
            <div className="px-4 py-2 invisible">Placeholder</div>
          )}

          <button
            className={`px-4 py-2 rounded-lg justify-end ${
              currentStep === steps.length - 1
                ? isReviewed
                  ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => {
              if (currentStep === steps.length - 1 && isReviewed) {
                onSubmit?.();
              } else {
                // setStep(currentStep + 1);
                validateForm();
              }
            }}
            disabled={currentStep === steps.length - 1 && !isReviewed}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
