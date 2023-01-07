import React, { useState, useEffect } from "react";
import data from "./assets/data.json";
import JobBoardComponent from "./components/JobBoardComponent";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    setJobs(data);
  }, []);

  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];
    if (languages) {
      tags.push(...languages);
    }
    if (tools) {
      tags.push(...tools);
    }

    return filters.every((f) => tags.includes(f));
  };

  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;
    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };
  const filterdJobs = jobs.filter(filterFunc);
  return (
    <div className="App">
      <header className="bg-teal-500 mb-40">
        <img src="./images/bg-header-desktop.svg" alt="bg-img"></img>
      </header>
      {filters.length > 0 && (
        <div className={`bg-white shadow-md my-16 mx-10 p-8 flex flex-wrap`}>
          {filters.map((filter) => (
            <span className="m-3">
              <span
                className={`text-teal-500 bg-teal-100 font-bold p-2 rounded rounded-r-none`}
              >
                {filter}
              </span>
              <span
                className={`text-teal-100 bg-teal-500 font-bold cursor-pointer rounded-l-none p-2 rounded`}
                onClick={() => handleFilterClick(filter)}
              >
                ×
              </span>
            </span>
          ))}
        </div>
      )}

      {jobs.length === 0 ? (
        <p>Jobs are fetching...</p>
      ) : (
        filterdJobs.map((job) => (
          <JobBoardComponent
            job={job}
            key={job.id}
            handleTagClick={handleTagClick}
          />
        ))
      )}
    </div>
  );
}
export default App;

//To-Dos:
// 1. Study the design & JSON ✔
// 2. Create the Job Board Component ✔
// 3. Get the data from the JSON ✔
// 4. Pass down the date to the JBC
// 5. Style it
// 6. Filter it
// 7. Filter the data
