"use client"
import { AlertTriangle } from "lucide-react"

function DeleteConfirmDialog({ productName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 to-amber-400 p-5 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-black">Are you sure?</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-6 text-sm">
            This will permanently delete <span className="font-semibold">{productName}</span> from your inventory. 
            <br />
            <span className="text-red-500 font-semibold">This action cannot be undone.</span>
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmDialog
