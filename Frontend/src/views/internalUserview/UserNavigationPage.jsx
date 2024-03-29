import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfilePage from './UserProfile';
import UserDepositHistory from './UserDepositHistory';
import UserWithdrawHistory from './UserWithdrawHistory';
import NavBar from './NavBar';

const UserNavigationPage = () => {
    
    const TABS = {
        'profile': <UserProfilePage />,
        'deposit': <UserDepositHistory />,
        'withdraw': <UserWithdrawHistory />
      }
    
    const { userId } = useParams(); // Retrieve user ID from URL parameters
    const [selectedTab, setSelectedTab] = useState('profile');

    return (
        <div className="container mx-auto py-8">
            <div>
                <NavBar setSelectedTab={setSelectedTab} />
                {React.cloneElement(TABS[selectedTab], { userId })} {/* Pass userId as prop */}
            </div>
        </div>     
    );
};

export default UserNavigationPage;
