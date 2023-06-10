import { useSession } from 'src/sdk/session';
import { LoggedPopup } from './LoggedPopup';
import { LoginPopup } from './LoginPopup';

export const Auth = () => {
  const {
    session: { person },
  } = useSession();

  if (person) {
    return <LoggedPopup />;
  }

  return <LoginPopup />;
};
