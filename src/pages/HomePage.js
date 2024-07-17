import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const reports = useData();

    return (
        <div>
            <h1>Welcome to BringMeBackApp</h1>
            <HomeComponent />
        </div>
    );
};

export default HomePage;
