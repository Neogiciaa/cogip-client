'use client';
import { useState } from 'react';
import axios from 'axios';

import Dashboard_menu from '../../components/Dashboard_menu';
import Dashboard_header from '../../components/Dashboard_header';
import New_entry_form from '../../components/New_entry_form';

export default function Dashboard_companies() {
    const companyTypes: Record<string, number> = {
        'sarl': 1,
        'sa': 2,
        'auto-entrepreneur': 3,
        'association': 4,
        'startup': 5,
    };

    const [formData, setFormData] = useState({
        companyName: '',
        tva: '',
        country: '',
        type: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const typeId = companyTypes[formData.type];

        if (!typeId) {
            setErrorMessage('Please select a valid company type: SARL, SA, Auto-entrepreneur, Association, or Startup');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/company', {
                name: formData.companyName,
                tva: formData.tva,
                country: formData.country,
                type_id: typeId,
            });
            console.log('Company created :', response.data);
            setErrorMessage(''); // Clear error message on success
        } catch (error) {
            console.error('Error during creation:', error);
            setErrorMessage('Error during creation. Please try again.');
        }
    };

    return (
        <main className='h-screen'>
            <div className='flex h-full'>
                <Dashboard_menu />
                <div className='flex flex-col ml-[300px] w-full dashboard_background h-full justify-center '>
                    <Dashboard_header />
                    <New_entry_form
                        title='New Company'
                        fields={['companyName', 'tva', 'country', 'type']}
                        submitText='Create company'
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        placeholders={['Company name', 'TVA', 'Country', 'Type']}
                        errorMessage={errorMessage}
                    />
                </div>
            </div>
        </main>
    );
}