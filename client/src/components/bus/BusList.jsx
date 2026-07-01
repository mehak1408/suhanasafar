function BusList({ buses, onSelectBus, selectedBus }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 h-[500px] overflow-y-auto shadow-sm">

      <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
        Active Buses
      </h2>

      {buses.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          No buses found.
        </p>
      ) : (
        <div className="space-y-3">
          {buses.map((bus) => {
            const isSelected = selectedBus?._id === bus._id;

            return (
              <button
                key={bus._id}
                onClick={() => onSelectBus(bus)}
                className={`w-full text-left p-4 rounded-lg border transition
                ${
                  isSelected
                    ? "bg-indigo-500 dark:bg-purple-700 border-indigo-500 dark:border-purple-400 text-white"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >

                <p className="font-semibold text-sm">
                  {bus.busNumber}
                </p>

                <p className="text-sm opacity-80">
                  {bus.route}
                </p>

                <div className="flex justify-between mt-2 text-xs opacity-70">
                  <span>Driver: {bus.driverName}</span>
                  <span>₹{bus.fare}</span>
                </div>

              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BusList;