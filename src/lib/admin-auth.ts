'use server';

import { cookies } from 'next/headers';

// Admin credentials (in production, use environment variables and proper hashing)
const ADMIN_EMAIL = process.env.ADMIN_LOGIN_EMAIL || 'admin@shreeshyam.com';
const ADMIN_PASSWORD = process.env.ADMIN_LOGIN_PASSWORD || 'admin123';

// Session token (in production, use proper JWT or session management)
const SESSION_TOKEN_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface AuthResult {
  success: boolean;
  error?: string;
}

/**
 * Validates admin credentials and creates a session
 */
export async function loginAdmin(email: string, password: string): Promise<AuthResult> {
  // Validate credentials
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // Create session token (simple approach - in production use JWT)
  const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_TOKEN_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });

  return { success: true };
}

/**
 * Checks if admin is authenticated
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_NAME);
  
  if (!sessionToken?.value) {
    return false;
  }

  try {
    // Decode and validate token
    const decoded = Buffer.from(sessionToken.value, 'base64').toString('utf-8');
    const [email, timestamp] = decoded.split(':');
    
    // Check if email matches and session hasn't expired
    if (email !== ADMIN_EMAIL) {
      return false;
    }

    const sessionAge = Date.now() - parseInt(timestamp, 10);
    if (sessionAge > SESSION_DURATION) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Logs out the admin by clearing the session
 */
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN_NAME);
}

/**
 * Gets the admin email from session
 */
export async function getAdminEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_NAME);
  
  if (!sessionToken?.value) {
    return null;
  }

  try {
    const decoded = Buffer.from(sessionToken.value, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    return email;
  } catch {
    return null;
  }
}
