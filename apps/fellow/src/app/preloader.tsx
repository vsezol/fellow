import { useEffect, useState } from 'react';
import { selectAlwaysShowLogoAnimation } from '../entities/user-settings';
import { Storage } from '../shared';
import { useAppSelector } from '../store';
import './preloader.css';

const STORAGE_KEY = 'PRELOADER_SHOWN';
const hasShown = Storage.get(STORAGE_KEY);
if (!hasShown) {
  Storage.set(STORAGE_KEY, Date.now());
}

export const Preloader = () => {
  const showAnimation = useAppSelector(selectAlwaysShowLogoAnimation);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(showAnimation || !hasShown);
  }, []);

  return (
    isVisible && (
      <div className="preloader h-full w-full absolute bg-base-300 z-40 flex items-center justify-center">
        <div className="font-mono text-7xl font-bold text-primary relative contents">
          <div className="slide bg-base-300 slide-left-long font-logo">f</div>
          <div className="slide bg-base-300 slide-left-short font-logo">e</div>
          <div className="slide bg-base-300 rotate-left font-logo">
            <div className="rotate-left-inner">l</div>
          </div>
          <div className="slide bg-base-300 rotate-right font-logo">
            <div className="rotate-right-inner">l</div>
          </div>
          <div className="slide bg-base-300 slide-right-short font-logo">o</div>
          <div className="slide bg-base-300 slide-right-long font-logo">w</div>
        </div>
      </div>
    )
  );
};
