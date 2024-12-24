import React, { useState, useEffect } from 'react';
import Interests from './Interests';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User() {
  const { name } = useParams();  // Correctly getting 'name' from the URL
  const [user, setUser] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedStrengths, setSelectedStrengths] = useState([]);
  const [selectedWeaknesses, setSelectedWeaknesses] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const interests = ['Music', 'Art', 'Technology', 'Sports', 'Photography'];
  const strengths = ['Leadership', 'Problem Solving', 'Creativity', 'Communication', 'Teamwork'];
  const weaknesses = ['Procrastination', 'Perfectionism', 'Impatience', 'Lack of Focus'];
  const preferences = ['Remote Work', 'Flexible Hours', 'High Salary', 'Growth Opportunities'];

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://maargway-backend.onrender.com/findStudent/${name}`);
        const studentData = response.data;
        setStudent(studentData);
        setUser(studentData.name);

        console.log(studentData.name); 

        setSelectedInterests(studentData.interests || []);
        setSelectedStrengths(studentData.strengths || []);
        setSelectedWeaknesses(studentData.weaknesses || []);
        setSelectedPreferences(studentData.preferences || []);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [name]);  // Use 'name' as dependency, not 'id'

  // Save user data
  const saveData = async () => {
    try {
      const response = await axios.post(`https://maargway-backend.onrender.com/updateStudent/${student._id}`, {
        interests: selectedInterests.filter(interest => interest.trim() !== "").join(','),
        strengths: selectedStrengths.filter(strength => strength.trim() !== "").join(','),
        weaknesses: selectedWeaknesses.filter(weakness => weakness.trim() !== "").join(','),
        preferences: selectedPreferences.filter(preference => preference.trim() !== "").join(','),
      });
      navigate(`/MaargWay/Recommendations/${name}`);  // Use 'name' here as well
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="bg-zinc-950 h-fit w-screen text-white">
      <div className="text-6xl font-semibold text-center pt-10 bg-gradient-to-r from-zinc-200 via-emerald-300 to-emerald-900 bg-clip-text text-transparent">
        Hi There <p className="text-7xl bg-gradient-to-r from-zinc-50 via-zinc-300 to-zinc-900 bg-clip-text text-transparent">{user}</p>
      </div>
      <hr className="w-2/3 md:w-2/3 mx-auto rounded-lg mt-3 opacity-55" />
      <br />

      {/* Interests Section */}
      <div className="text-5xl md:text-7xl p-4">Your Interests</div>
      <Interests 
        interests={interests} 
        selectedInterests={selectedInterests} 
        setSelectedInterests={setSelectedInterests} 
      />

      {/* Strengths Section */}
      <div className="text-5xl md:text-7xl p-4">Your Strengths</div>
      <Interests 
        interests={strengths} 
        selectedInterests={selectedStrengths} 
        setSelectedInterests={setSelectedStrengths} 
      />

      {/* Preferences Section */}
      <div className="text-5xl md:text-7xl p-4">Your Preferences</div>
      <Interests 
        interests={preferences} 
        selectedInterests={selectedPreferences} 
        setSelectedInterests={setSelectedPreferences} 
      />

      {/* Weaknesses Section */}
      <div className="text-5xl md:text-7xl p-4">Your Weaknesses</div>
      <Interests 
        interests={weaknesses} 
        selectedInterests={selectedWeaknesses} 
        setSelectedInterests={setSelectedWeaknesses} 
      />

      {/* Save Button */}
      <div className="text-center">
        <button 
          onClick={saveData} 
          className="bg-emerald-950 text-white p-3 rounded-md mt-5 hover:bg-emerald-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default User;
