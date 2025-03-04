import { NextResponse } from 'next/server';
import { authenticate } from '../model';
import { UserSession } from '../types';
import { withSession } from './session.api';

export const POST = withSession(async (request) => {
  const { username, password } = await request.json();

  try {
    const user = await authenticate({ username, password });

    if (!user || !user?.token) {
      throw new Error('نام کاربری یا رمز عبور اشتباه است.');
    }

    const userSession: UserSession = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      },
    };
    request.session.user = userSession.user;
    await request.session.save();

    return NextResponse.json(
      { message: 'ورود موفقیت‌آمیز بود!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
});

export const GET = withSession((request) => {
  const user = request.session.user;

  if (!user || !user.token) {
    return NextResponse.json(
      { message: 'شما وارد نشده‌اید!' },
      { status: 403 }
    );
  }

  return NextResponse.json(user);
});

export const DELETE = withSession((request) => {
  request.session.destroy();

  return NextResponse.json(
    { message: 'خروج موفقیت‌آمیز بود!' },
    { status: 200 }
  );
});
