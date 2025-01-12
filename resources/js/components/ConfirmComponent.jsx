// components/ConfirmComponent.js

export default function ConfirmComponent({ isModalOpen, onConfirm, onCancel }) {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <p>Sei sicuro di voler eliminare questo timer?</p>
                <div className="flex gap-4 mt-4">
                    <button
                        className="bg-red-500 text-white btn"
                        onClick={onConfirm} 
                    >
                        Conferma
                    </button>
                    <button
                        className="bg-gray-500 text-white btn"
                        onClick={onCancel} 
                    >
                        Annulla
                    </button>
                </div>
            </div>
        </div>
    );
}
