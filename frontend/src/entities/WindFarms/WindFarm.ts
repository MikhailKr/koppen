export interface Location {
  id: string;
  latitude: string;
  longitude: string;
}

export interface WindFarm {
  id: string;
  user_id: string;
  location_id: string;
  name: string;
  description: string;
  location: Location;
}
