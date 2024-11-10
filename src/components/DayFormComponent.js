import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'; // Import Supabase
import './DayFormComponent.css';

const supabaseUrl = 'https://frzuszxndrfvqcffvzta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenVzenhuZHJmdnFjZmZ2enRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MjQxODMsImV4cCI6MjA0NjMwMDE4M30.9VRG6CmrrctgzYBh5_plBq_2ehGXW8GyVUfQt0vTrJA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function FormPage() {
  const [formData, setFormData] = useState({
    army_no: '',
    arms_unique_code: '',
    purpose: '',
    date: '',
    time: '',
    index_no: '',
    admin_pin: '',
    army_rank: '',
  });

  const [error, setError] = useState(''); // State to hold error messages

  // Function to update the date and time fields
  const updateDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
    const time = now.toTimeString().slice(0, 5); // Formats time as HH:MM
    setFormData((prevData) => ({
      ...prevData,
      date,
      time,
    }));
  };

  // Run updateDateTime once on component mount and set an interval to update time every minute
  useEffect(() => {
    updateDateTime(); // Set initial date and time
    const interval = setInterval(updateDateTime, 60000); // Update time every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if admin_pin is correct
    if (formData.admin_pin !== '12345') {
      setError('Incorrect Admin Pin. Please try again.');
      return;
    }

    setError(''); // Clear any existing errors

    // Insert data into Supabase database
    const { data, error: insertError } = await supabase
      .from('issued-day-to-day') // Replace with your table name
      .insert([
        {
          army_no: formData.army_no,
          arms_unique_code: formData.arms_unique_code,
          purpose: formData.purpose,
          date: formData.date,
          time: formData.time,
          index_no: formData.index_no,
          // admin_pin: formData.admin_pin, // Consider removing or encrypting admin_pin if not needed in the database
          army_rank: formData.army_rank,
        },
      ]);

    if (insertError) {
      setError('Error submitting data: ' + insertError.message);
      console.log(insertError);
      alert("Error in Issuing, Try Again");
      return ;
    } else {
      console.log('Form Data Submitted:', data);
      alert("Item Issued Sucessfully");
      // Optionally reset the form or show a success message
    }

    // Reset form data only if submission is successful
    setFormData({
      army_no: '',
      arms_unique_code: '',
      army_rank: '',
      purpose: '',
      date: '',
      time: '',
      index_no: '',
      admin_pin: '', // reset the admin pin field as well
    });

  };

  return (
    <div className="form-container">
      <h1 className="form-title">Day-to-Day Issued</h1>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* The Form */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group left">
          <label htmlFor="army_no">Army No (6 characters only)</label>
          <input
            type="text"
            id="army_no"
            name="army_no"
            maxLength="6"
            value={formData.army_no}
            onChange={handleChange}
            required
          />

          <label htmlFor="army_rank">Army Rank</label>
          <select
            id="army_rank"
            name="army_rank"
            value={formData.army_rank}
            onChange={handleChange}
            required
          >
            <option value="">Select Rank</option>
            <option value="SEP">SEP</option>
            <option value="L/NK">L/NK</option>
            <option value="HAV">HAV</option>
            <option value="NK">NK</option>
          </select>

          <label htmlFor="purpose">Purpose</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          >
            <option value="">Select Purpose</option>
            <option value="Night Duty">Night Duty</option>
            <option value="RP Duty">RP Duty</option>
            <option value="Main Gate Duty">Main Gate Duty</option>
            <option value="MT Duty">MT Duty</option>
          </select>

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div className="form-group right">
          <label htmlFor="arms_unique_code">Arms Unique Code</label>
          <input
            type="text"
            id="arms_unique_code"
            name="arms_unique_code"
            value={formData.arms_unique_code}
            onChange={handleChange}
            required
          />

          <label htmlFor="index_no">Index No (6 characters only)</label>
          <input
            type="text"
            id="index_no"
            name="index_no"
            maxLength="6"
            value={formData.index_no}
            onChange={handleChange}
            required
          />

          <label htmlFor="admin_pin">Admin Pin</label>
          <input
            type="password"
            id="admin_pin"
            name="admin_pin"
            value={formData.admin_pin}
            onChange={handleChange}
            required
          />
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        <div className="submit-container">
          <button type="submit">Submit</button>
        </div>

 
        
      </form>
    </div>
  );
}

export default FormPage;
