import React, { useState, useEffect } from 'react';

const VerseDisplay = () => {
  const [verse, setVerse] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching
        const response = await fetch('http://localhost:3001/api/proverb');

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response body as JSON
        const data = await response.json();
        console.log('Fetched Proverb:', data.text); // Log the fetched proverb

        // Remove HTML tags from the fetched proverb
        const plainText = removeHtmlTags(data.text);
        setVerse(plainText);
        setError(null);
      } catch (error) {
        setError('Failed to fetch proverb from the API');
        console.error('There has been a problem with your fetch operation:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchVerse();

    // Set up an interval to fetch a new proverb every 24 hours
    const interval = setInterval(fetchVerse, 24 * 60 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Proverb of the Day</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{verse}</p>
      )}
    </div>
  );
};

// Utility function to remove HTML tags from a string
function removeHtmlTags(input) {
  return input.replace(/<[^>]*>/g, '');
}

export default VerseDisplay;