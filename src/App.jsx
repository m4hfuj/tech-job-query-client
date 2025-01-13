import React, { useState, useEffect } from 'react';
import Dropdown from './components/Dropbox';
import Donut from './components/Donut';
// import ChoroplethChart from './components/Map';
import { TfiCheckBox } from "react-icons/tfi";
import BasicBars from './components/Barchart';

const platform_options = ['BD Jobs', 'LinkedIn'];
const region_options = ['All', 'Dhaka', 'Bogura', 'Rajshahi'];

function App() {
  const [role_options, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All Technical Jobs'); // Track the selected role

  const [selectedPlatform, setSelectedPlatform] = useState(platform_options[0]);

  const [loading, setLoading] = useState(true); // State to show loading status
  const [error, setError] = useState(null); // State to handle errors
  const [education, setEducation] = useState([]);

  const [lang_list, setLangList] = useState([]);
  const [pkg_list, setPkgList] = useState([]);

  const [n_roles, setNRoles] = useState([]);


  // Fetch role options
  useEffect(() => {
    const fetchRoleOptions = async () => {
      try {
        const response = await fetch("https://tech-job-query-server.onrender.com/api/role_options");
        const result = await response.json();
        setRoleOptions(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRoleOptions();
  }, []);


  // console.log(role_options);


  // Load role options and education data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://tech-job-query-server.onrender.com/api/all_data", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: selectedRole }),
        });
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // Update all states from the combined data
        setEducation(result.education_data);
        setLangList(result.language_data);
        setPkgList(result.package_data);
        setNRoles(result.total_jobs);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedRole]);
  

  if (loading) {
    return <p>Loading...</p>; // Display loading message
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message
  }

  // console.log(n_roles);

  const lang_cat = lang_list.map(item => item.Category);
  const lang_val = lang_list.map(item => item.Value);

  const pkg_cat = pkg_list.map(item => item.Category);
  const pkg_val = pkg_list.map(item => item.Value);


  return (
    <>


<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
        <TfiCheckBox className="mr-1 text-white font-bold text-4xl" /> 
        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Tech Job Query</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Overview</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">In Depth</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <div className="p-7">
        {/* <div id="header" className="flex flex-row ">
          <div className=" text-center">
            <h1 className="text-4xl text-violet-500 flex flex-row justify-center">
              <TfiCheckBox className="mr-1" /> 
              Tech Job Query
            </h1>
          </div>
          <div className='ml-10 mt-1 text-neutral-700'>
            <a href="#" className='hover:text-blue-600'>Overview</a>
            <a href="#" className='ml-5 hover:text-blue-600'>In Depth</a>
          </div>
        </div> */}

        <main className="flex flex-row mt-3">
          <div className="w-1/5 ml-10 flex flex-col h-1/2 py-6 justify-center">
            <div className="w-full mb-7">
              <p className="font-bold mb-1">Select Platform: </p>
              <Dropdown 
                options={platform_options} 
                value={selectedPlatform} 
                onChange={(e) => setSelectedPlatform(e)} // Update selected role
              />
            </div>

            <div className="w-full mb-7">
              <p className="font-bold mb-1">Select Role: </p>
              <Dropdown 
                options={role_options} 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e)} // Update selected role
              />
            </div>

            <div className="w-full mb-7">
              <p className="font-bold mb-1">Select Region: </p>
              <Dropdown 
                options={region_options} 
                value={region_options[0]} 
                onChange={(e) => (e)} // Update selected role
              />
            </div>
          </div>

          <div id="dashboard" className="w-full pl-20 ">
            <div className="w-full flex mb-">
              {/* Education */}
              <div className="w-1/2">
                <p className="text-center text-md mb-2">
                  Proportion of sought-after level of education
                </p>
                <div className="">
                  <Donut education={education} />
                </div>
              </div>

              {/* Programming language */}
              <div className="w-1/2">
                <p className="text-center text-md">
                  Programming language proportion across {n_roles} roles
                </p>
                <BasicBars columns={lang_cat} data={lang_val} />
              </div>
            </div>

            <div className="w-full flex">
              {/* Package */}
              <div className="w-1/2">
                <p className="text-center text-md">
                  Package proportion across {n_roles} roles
                </p>
                <BasicBars columns={pkg_cat} data={pkg_val} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
