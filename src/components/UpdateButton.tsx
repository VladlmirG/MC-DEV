"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-button text-white p-2 rounded-md cursor-pointer disabled:bg-hovr disabled:cursor-not-allowed max-w-96 hover:bg-hovr transition duration-500"
    >
      {pending ? "Updating..." : "Actualizar Datos"}
    </button>
  );
};

export default UpdateButton;