import { createContext, useContext, useState, useCallback } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [shouldReloadProfile, setShouldReloadProfile] = useState(false);

  const triggerProfileReload = useCallback(() => {
    setShouldReloadProfile((prev) => !prev); // 상태 변경
  }, []);

  return (
    <ProfileContext.Provider value={{ shouldReloadProfile, triggerProfileReload }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
