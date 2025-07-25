'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { RootState } from '../../store';
import { closeAllModals } from '../../store/slices/uiSlice';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';
import { UIState } from '../../types';

export function AuthModals() {
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.ui as UIState);
  const modals = uiState.modals;


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeAllModals());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  if (!modals.login && !modals.signup) {
    return null;
  }

  return (
    <>
      {(modals.login || modals.signup) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
              
              {modals.login && <LoginForm />}
              {modals.signup && <SignupForm />}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 