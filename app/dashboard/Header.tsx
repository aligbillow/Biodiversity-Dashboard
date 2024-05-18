"use client";

import React from 'react';
import {
    ResponsiveContainer
} from 'recharts';

const NavBar: React.FC = () => (
    <div className="nav">
        <ResponsiveContainer width="100%" height="100%">
            <h1>Hello DashBoard</h1>
        </ResponsiveContainer>
    </div>
);

export default NavBar;

