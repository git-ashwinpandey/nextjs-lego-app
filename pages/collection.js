import React, { useState, useEffect } from 'react';
import { useNavbar } from '@/contexts/NavbarContext';
import CollectionTable from '@/components/CollectionTable';

export default function Collection() {
  const [data, setData] = useState([]);
  const { navbarData, setNavbarData } = useNavbar();

  useEffect(() => {
    setNavbarData(prevData => ({ ...prevData, showSearchBar: true }));

    const fetchData = async () => {
      try {
        // Build the queryParam based on whether the searchTerm is present or not.
        const queryParam = navbarData.searchTerm ? `?searchTerm=${navbarData.searchTerm}` : '';
        console.log(`Making API call with query: ${queryParam}`);
        const response = await fetch(`/api/collection${queryParam}`);
        const fetchedData = await response.json();
        console.log('Fetched data:', fetchedData);
        setData(fetchedData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data immediately when the component mounts or when the searchTerm updates.
    fetchData();

    // Clean up function to hide the search bar when the component is unmounted.
    return () => setNavbarData(prevData => ({ ...prevData, showSearchBar: false }));
  }, [navbarData.searchTerm, setNavbarData]); // Depend on navbarData.searchTerm to re-fetch when it updates

  return (
    <>
      <CollectionTable data={data} />
    </>
  );
}






/*
export default function Collection() {
  const [data, setData] = useState([]);
  const { setNavbarData } = useNavbar();

  useEffect(() => {
    setNavbarData({ showSearchBar: true });
    fetch('/api/collection')
      .then(response => response.json())
      .then(fetchedData => {
        console.log(fetchedData.data);
        setData(fetchedData.data);
      })
      .catch(error => console.error('Error fetching data:', error));
      return () => setNavbarData({ showSearchBar: false });
  }, [setNavbarData]);

  return (
    <>
      <CollectionTable data={data} />
    </>
  );
}
*/