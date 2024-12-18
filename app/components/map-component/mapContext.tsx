'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type MapState = {
  center: [number, number];
  zoom: number;
};

type MapContextType = {
  mapState: MapState;
  setMapState: (state: MapState) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [mapState, setMapState] = useState<MapState>({
    center: [-0.09, 51.505], // Default position
    zoom: 14,
  });

  return (
    <MapContext.Provider value={{ mapState, setMapState }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) throw new Error('useMapContext must be used within a MapProvider');
  return context;
}
