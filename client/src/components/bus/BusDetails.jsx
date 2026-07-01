function BusDetails({ bus }) {
  if (!bus) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Bus Details
        </h2>

        <p className="text-slate-500 dark:text-slate-400">
          Select a bus from the list to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Bus Details
        </h2>

        <span className="text-xs px-3 py-1 rounded-full bg-green-500 text-white">
          Running
        </span>
      </div>

      <div className="space-y-2 text-sm">

        <p>
          <span className="text-slate-500 dark:text-slate-400">
            Bus Number:
          </span>{" "}
          <span className="font-medium">{bus.busNumber}</span>
        </p>

        <p>
          <span className="text-slate-500 dark:text-slate-400">
            Driver:
          </span>{" "}
          {bus.driverName}
        </p>

        <p>
          <span className="text-slate-500 dark:text-slate-400">
            Route:
          </span>{" "}
          {bus.route}
        </p>

        <p>
          <span className="text-slate-500 dark:text-slate-400">
            Fare:
          </span>{" "}
          ₹{bus.fare}
        </p>

        <p>
          <span className="text-slate-500 dark:text-slate-400">
            Capacity:
          </span>{" "}
          {bus.capacity}
        </p>

        <p>
          <span className="text-slate-500 dark:text-slate-400">
            Latitude:
          </span>{" "}
          {bus.currentLocation?.latitude ?? "N/A"}
        </p>

        <p>
          <span className="text-slate-500 dark:text-slate-400">
            Longitude:
          </span>{" "}
          {bus.currentLocation?.longitude ?? "N/A"}
        </p>

      </div>
    </div>
  );
}

export default BusDetails;