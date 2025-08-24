import React, { useState } from "react";
import UpdataModal from "./components/UpdataModal";
import { ToastContainer } from "react-toastify";

function App() {
  const [modalStatus, setModalStatus] = useState(false);

  const closeModal = () => {
    setModalStatus(false);
  };
  return (
    <>
      {modalStatus && (
        <div>
          <UpdataModal modalStatus={modalStatus} closeModal={closeModal} />
          <ToastContainer />
        </div>
      )}
      <div className="min-h-screen flex justify-center items-center">
        <button
          onClick={() => setModalStatus(true)}
          className="bg-blue-600 text-white hover:bg-blue-700 p-3 rounded-lg transition cursor-pointer"
        >
          Upload Data
        </button>
      </div>
    </>
  );
}

export default App;
