import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleGroupCreateEvent } from './service';
import { chatsSlice } from './store';

export const useGroupCreateHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { addChat } = chatsSlice.actions;

    return handleGroupCreateEvent((data) => {
      dispatch(
        addChat({
          id: data.id,
          members: data.members,
        })
      );
    });
  }, []);
};
