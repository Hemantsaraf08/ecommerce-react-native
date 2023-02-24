import {useState, useEffect} from 'react'
import NetInfo from '@react-native-community/netinfo';

function useOnlineStatus() {
    const [isOffline, setisOffline] = useState<boolean>(false);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setisOffline(offline);
          });
        
        
          return () => removeNetInfoSubscription();
      }, []);
    
      return isOffline;
}

export default useOnlineStatus