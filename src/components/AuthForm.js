import { useState } from 'react';
import { auth } from '@/utils/firebase'; // Adjust if needed
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const AuthForm = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle login/signup

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      setUser(userCredential.user);
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-md shadow-md">
      {user ? (
        <div className="text-center">
          <p className="text-lg">Welcome, {user.email}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold text-center">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded"
          >
            Sign in with Google
          </button>
          <p className="text-center">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
