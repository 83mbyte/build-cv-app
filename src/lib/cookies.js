'use server'

import { cookies } from 'next/headers'

export async function cookieHandler(cookieName) {

    let date = new Date();
    // date.setTime(date.getTime() + (60 * 1000));
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));

    const cookieStore = await cookies();

    if (!cookieStore.has(cookieName)) {

        cookieStore.set({
            name: cookieName,
            value: 1,
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            expires: date
        });

        return 1
    }
    else {
        const count = cookieStore.get(cookieName);
        let newValue = Number(count.value) + 1;

        if (newValue <= 4) {
            cookieStore.set({
                name: cookieName,
                value: newValue,
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                expires: date
            });

            return newValue;
        }

        return count.value;
    }
}