import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminUserProfilePage } from './AdminUserProfilePage';
import { AdminUserDepositHistoryPage } from './AdminUserDepositHistoryPage';
import { AdminUserWithdrawHistoryPage } from './AdminUserWithdrawHistoryPage';
import { NavBar } from '../../../components/Admin/NavBar';

export const AdminUserNavigationPage = () => {

    const TABS = {
        'profile': <AdminUserProfilePage />,
        'deposit': <AdminUserDepositHistoryPage />,
        'withdraw': <AdminUserWithdrawHistoryPage />
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