// app/actions/logout.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token'); // Replace 'authToken' with your actual cookie name
  cookieStore.delete('user_data'); // Replace 'authToken' with your actual cookie name
  redirect('/');
}
