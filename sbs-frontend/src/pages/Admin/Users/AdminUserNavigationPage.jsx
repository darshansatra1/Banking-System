import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminUserProfilePage } from './AdminUserProfilePage';
import { AdminUserDepositHistoryPage } from './AdminUserDepositHistoryPage';
import { AdminUserWithdrawHistoryPage } from './AdminUserWithdrawHistoryPage';
import { NavBar } from '../../../components/Admin/NavBar';

export const AdminUserNavigationPage = () => {

    const CUSTOMER_TABS = {
        'profile': <AdminUserProfilePage />,
        'deposit': <AdminUserDepositHistoryPage />,
        'withdraw': <AdminUserWithdrawHistoryPage />
    }

    const { userId, userRole } = useParams(); // Retrieve user ID from URL parameters
    const [selectedTab, setSelectedTab] = useState('profile');

    return (
        <div className="container mx-auto py-8">  
        {userRole === "customer" ? (
                <div>
                <NavBar setSelectedTab={setSelectedTab}/>
                {React.cloneElement(CUSTOMER_TABS[selectedTab], { userId })} {/* Pass userId as prop */}
            </div>
        ) : (
  
            <AdminUserProfilePage/>
        )}
        </div>
        
    );
};