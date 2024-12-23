type User = {
  firstName: string;
    lastName: string;
    streetAddress: string;
    postcode: string;
    city: string;
    country: string;
    favouriteCuisine: string;
    secondFavouriteCuisine: string;
    phone: string;
}
type FieldProps = {
  completeUser: User;
  setCompleteUser: React.Dispatch<React.SetStateAction<User>>;
  field: {
    key: string;
    label: string;
    type: string;
  };
}



export default function GenericFormField(props: FieldProps) {
  const { completeUser, setCompleteUser, field } = props;
  return (
    <div key={field.key} className="relative z-0 w-80 my-5 group">
      <input
        type={field.type}
        name={field.key}
        id={field.key}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white-600 peer"
        placeholder=" "
        value={completeUser[field.key as keyof User]}
        onChange={(e) => setCompleteUser({ ...completeUser, [field.key]: e.target.value })}
        required
      />
      <label
        htmlFor={field.key}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white-600 peer-focus:dark:text-white-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {field.label}
      </label>
    </div>
  )
}
