import { useEffect, useRef } from 'react';
import Layout from '../app/layout';
import congratsAudioSrc from '../assets/congrats.mp3';
import { selectUserReputation, userSlice } from '../entities/user';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import { useAppDispatch, useAppSelector } from '../store';
import { ClickablePanel } from '../widgets/clickable-panel';
import { Navbar } from '../widgets/navbar';

export const Component = () => {
  const dispatch = useAppDispatch();
  const reputation = useAppSelector(selectUserReputation);
  const animeMode = useAppSelector(selectAnimeModeEnabled);
  const congratsAudio = useRef<HTMLAudioElement>(new Audio(congratsAudioSrc));

  useEffect(() => {
    if (animeMode && reputation % 100 === 0) {
      congratsAudio.current?.play();
    }
  }, [reputation, animeMode]);

  const addReputation = () => {
    dispatch(userSlice.actions.addReputation(1));
  };

  return (
    <>
      <div className="absolute h-full w-full">
        <ClickablePanel onClick={addReputation} />
      </div>

      <div className="absolute z-10 h-full w-full">
        <Layout>
          <div className="overflow-hidden flex-1 flex-grow flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold font-logo select-none">
              Ваша репутация
            </h1>
            <div className="text-8xl font-bold font-logo select-none">
              {reputation}
            </div>
          </div>

          <Navbar />
        </Layout>
      </div>
    </>
  );
};
