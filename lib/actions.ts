'use server';
import { User } from './definitions';
import { z } from 'zod';

const UserFormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
  phone: z.string(),
  address: z.string(),
});

const CreateUser = UserFormSchema.omit({id: true});


export async function addUserData(formData: FormData) {

  const formObject = Object.fromEntries(formData.entries());

  const { firstName, lastName, email, password, repeatPassword, phone, address } = CreateUser.parse({
    firstName: formObject.floating_first_name,
    lastName: formObject.floating_last_name,
    email: formObject.floating_email,
    password: formObject.floating_password,
    repeatPassword: formObject.repeat_password,
    phone: formObject.floating_phone,
    address: formObject.floating_address,
  });

  console.log(firstName, lastName, email, password, repeatPassword, phone, address);
}
