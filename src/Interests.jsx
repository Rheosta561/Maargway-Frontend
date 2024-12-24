import React, { useState, useRef, useEffect } from 'react';

function Interests({ interests, selectedInterests, setSelectedInterests }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null); // Reference for the dropdown menu

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  // Handle selecting an interest
  const handleSelectInterest = (interest) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
    setIsDropdownOpen(false);
  };

  // Handle removing an interest
  const handleRemoveInterest = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter interests based on search term
  const filteredInterests = interests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white">
      <div className="p-4 border ml-4 mr-4 border-dashed border-emerald-900">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Interests"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 w-full border-b-2 border-dotted border-zinc-400 bg-zinc-800  text-zinc-200 focus:outline-none"
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-2 bg-zinc-800 w-full border rounded-lg shadow-md overflow-hidden"
            >
              <ul>
                {filteredInterests.map((interest) => (
                  <li
                    key={interest}
                    className="p-2 hover:bg-zinc-900 cursor-pointer"
                    onClick={() => handleSelectInterest(interest)}
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Interests display box */}
        <div className="border-dotted border-2 border-zinc-600 mt-4 p-4 bg-zinc-900">
          {selectedInterests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center bg-emerald-900 text-white px-3 py-1 rounded-lg"
                >
                  <span className="mr-2">{interest}</span>
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-white font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No interests selected</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interests;
