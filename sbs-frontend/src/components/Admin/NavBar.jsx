import React from 'react';

export const NavBar = ({ setSelectedTab }) => {
    return (
        <div style={styles.container}>
            <div style={styles.tab} onClick={() => setSelectedTab('profile')}>Profile</div>
            <div style={styles.tab} onClick={() => setSelectedTab('deposit')}>Deposit History</div>
            <div style={styles.tab} onClick={() => setSelectedTab('withdraw')}>Withdraw History</div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    tab: {
        padding: '10px 20px',
        margin: '0 10px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
