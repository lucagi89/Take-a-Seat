// export type Geolocation = {
//   latitude: number;
//   longitude: number;
// };

type Timestamp = {
  seconds: number;
  nanoseconds: number;
};


export type Restaurant = {
  id: string;
  id_owner: string;
  name: string;
  city: string;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;
  google_link: string;
  trip_advisor_link: string;
  description: string;
  cuisine_one: string;
  cuisine_two: string;
  cuisine_three: string;
  style: string;
  total_num_of_seats: number;
  num_of_taken_seats: number;
  first_opening_hour: string;
  first_closing_hour: string;
  second_opening_hour: string;
  second_closing_hour: string;
  menu: string;
  is_available: boolean;
  pictures: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};


export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  is_host: boolean;
  createdAt: Date;
  updatedAt: Date;
};
