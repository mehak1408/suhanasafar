import { useEffect, useMemo, useState } from "react";
import MapView from "../components/bus/MapView";
import BusList from "../components/bus/BusList";
import SearchBar from "../components/bus/SearchBar";
import API from "../services/api";
import socket from "../services/socket";
import BusDetails from "../components/bus/BusDetails";

function BusLocation() {
    const [buses, setBuses] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedBus, setSelectedBus] = useState(null);
    const [isSimulating, setIsSimulating] = useState(false);

    const routePoints = [
        { latitude: 28.6139, longitude: 77.209 },
        { latitude: 28.6205, longitude: 77.2125 },
        { latitude: 28.6241, longitude: 77.2145 },
        { latitude: 28.6288, longitude: 77.2182 },
        { latitude: 28.635, longitude: 77.225 },
        { latitude: 28.6402, longitude: 77.2293 },
        { latitude: 28.6455, longitude: 77.2355 },
        { latitude: 28.651, longitude: 77.2405 },
    ];

    const fetchBuses = async () => {
        try {
            const res = await API.get("/buses");
            setBuses(res.data);
        } catch (error) {
            console.error("Failed to fetch buses:", error);
        }
    };

    const startSimulation = async () => {
        if (!selectedBus?._id) {
            alert("Please select a bus first.");
            return;
        }

        setIsSimulating(true);

        try {
            for (const point of routePoints) {
                await API.put(`/buses/${selectedBus._id}/location`, point);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        } catch (error) {
            console.error("Simulation failed", error);
        } finally {
            setIsSimulating(false);
        }
    };

    useEffect(() => {
        fetchBuses();

        socket.on("busLocationUpdate", (updatedBus) => {
            setBuses((prevBuses) =>
                prevBuses.map((bus) =>
                    bus._id === updatedBus._id ? updatedBus : bus
                )
            );

            setSelectedBus((prevSelected) =>
                prevSelected && prevSelected._id === updatedBus._id
                    ? updatedBus
                    : prevSelected
            );
        });

        return () => {
            socket.off("busLocationUpdate");
        };
    }, []);

    const filteredBuses = useMemo(() => {
        return buses.filter((bus) => {
            const text = search.toLowerCase();

            return (
                bus.busNumber?.toLowerCase().includes(text) ||
                bus.route?.toLowerCase().includes(text) ||
                bus.driverName?.toLowerCase().includes(text)
            );
        });
    }, [buses, search]);

    return (
        <div className="space-y-6 text-slate-900 dark:text-white">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Bus Location Tracking
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Track active buses in real time across routes.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg text-sm shadow-sm">
                    Active Buses:{" "}
                    <span className="text-indigo-600 dark:text-purple-400 font-semibold">
                        {filteredBuses.length}
                    </span>
                </div>
            </div>

            {/* Search */}
            <SearchBar search={search} setSearch={setSearch} />

            {/* Simulation Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">

                <div>
                    <h2 className="text-lg font-semibold">
                        Live Bus Simulation
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Simulate bus movement directly on the live map.
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    <div className="text-sm text-slate-600 dark:text-slate-300">
                        Selected Bus:{" "}
                        <span className="text-indigo-600 dark:text-purple-400 font-medium">
                            {selectedBus?.busNumber || "None"}
                        </span>
                    </div>

                    <button
                        onClick={startSimulation}
                        disabled={!selectedBus || isSimulating}
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-purple-600 dark:hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition"
                    >
                        {isSimulating ? "Simulating..." : "Start Simulation"}
                    </button>

                </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                <div className="xl:col-span-1">
                    <BusList
                        buses={filteredBuses}
                        onSelectBus={setSelectedBus}
                        selectedBus={selectedBus}
                    />
                </div>

                <div className="xl:col-span-2">
                    <MapView buses={filteredBuses} selectedBus={selectedBus} />
                </div>

                <div className="xl:col-span-1">
                    <BusDetails bus={selectedBus} />
                </div>

            </div>
        </div>
    );
}

export default BusLocation;