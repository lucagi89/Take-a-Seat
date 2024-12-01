'use server';
import { User } from './definitions';
import { z } from 'zod';
import { createUser } from './data';

const UserFormSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  repeat_password: z.string(),
  phone: z.string(),
  address: z.string(),
})

const CreateUser = UserFormSchema.omit({id: true}).refine(
  (data) => data.password === data.repeat_password,
  {
    message: "Passwords must match",
    path: ["repeat_password"],
  }
);


export async function addUserData(formData: FormData) {

  const formObject = Object.fromEntries(formData.entries());

  const { first_name, last_name, email, password, repeat_password, phone, address } = CreateUser.parse({
    first_name: formObject.first_name,
    last_name: formObject.last_name,
    email: formObject.email,
    password: formObject.password,
    repeat_password: formObject.repeat_password,
    phone: formObject.phone,
    address: formObject.address,
  });

  await createUser({ first_name, last_name, email, password, repeat_password, phone, address  });
}
