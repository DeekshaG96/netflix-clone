import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/lib/firebase';
import { ChevronRight } from 'lucide-react';

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/profiles');
    } catch (err: any) {
      console.error(err);
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please sign in instead.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password. If you haven\'t created an account, click "Sign up now" below.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0741f90210c1/a3f0d661-0559-4024-8d9e-97e542405b37/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg")' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black" />

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
          className="w-32 md:w-44"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 md:p-16 bg-black/75 rounded-md">
        <h1 className="text-3xl font-bold text-white mb-8">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        
        {error && (
          <div className="bg-[#e87c03] text-white p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#333] text-white px-5 py-3 rounded outline-none focus:bg-[#454545]"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#333] text-white px-5 py-3 rounded outline-none focus:bg-[#454545]"
            required
          />
          <button 
            type="submit"
            className="bg-[#e50914] text-white py-3 rounded font-bold mt-4 hover:bg-[#c11119] transition-colors"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-12 text-gray-500">
          <p>
            {isSignIn ? 'New to Netflix?' : 'Already have an account?'}
            <button 
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-white ml-2 hover:underline"
            >
              {isSignIn ? 'Sign up now.' : 'Sign in now.'}
            </button>
          </p>
          <p className="text-xs mt-4">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <span className="text-blue-600 hover:underline cursor-pointer ml-1">Learn more.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
