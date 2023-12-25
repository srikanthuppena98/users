import React, {createContext, ReactNode, useContext, useState} from 'react';

export type UserData = {
    id: number;
    username: string;
    email: string;
    role: string;
};

type DataContextType = {
    userData: UserData[];
    updateUserData: (newUserData: UserData[]) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData[]>([]);

    const updateUserData = (newUserData: UserData[]) => {
        setUserData(newUserData);
    };


    return (
        <DataContext.Provider value={{ userData, updateUserData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
