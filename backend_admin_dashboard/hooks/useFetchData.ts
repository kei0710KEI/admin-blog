import { useState, useEffect } from "react";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  blogcategory: string[];
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

function useFetchData(apiEndpoint: string) {
  const [alldata, setAlldata] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      // Set initialLoad to false to prevent the API call on subsequent renders
      setInitialLoad(false);
      setLoading(false); // Set loading to false to show components initially
      return; // Exit useEffect
    }

    // Set loading to true to indicate data fetching
    setLoading(true);

    // Function to fetch blog data
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        const alldata = res.data;
        setAlldata(alldata);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false); // Set loading state to false even if there's an error
      }
    };

    // Fetch blog data only if category exists
    if (apiEndpoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndpoint]); // Depend on initialLoad and apiEndpoint to trigger API call

  return { alldata, loading };
}

export default useFetchData;
