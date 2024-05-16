import React, { useEffect, useState } from "react";
import "./codingStyle.scss";

function HomeCoading() {
  const [repositories, setRepositories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDropdownIndex, setCurrentDropdownIndex] = useState("");
  useEffect(() => {
    repoList(1);
  }, []);
  const repoList = (pgNo) => {
    fetch(
      "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=" +
        pgNo
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.items?.length > 0) {
          setLoader(false);
          setRepositories(data?.items);
        } else {
          setLoader(false);
          setRepositories([]);
          alert(data.message + " Please Refresh again!!!");
        }
      });
  };
  const handelPage = (num) => {
    setCurrentPage(currentPage + num);
    repoList(currentPage + num);
    setRepositories([]);
    setLoader(true);
  };
  const handelDropdownIndex = (id) => {
    setCurrentDropdownIndex(id);
  };
  return (
    <div className="home_code">
      <div className="container">
        <div className=" d-flex justify-content-between align-items-center ">
          <h1>Coding Challenge</h1>
          {!loader && (
            <div className="d-flex">
              {currentPage === 1 ? null : (
                <button
                  onClick={() => {
                    handelPage(-1);
                  }}
                >
                  Previous
                </button>
              )}
              {/* {currentPage === 2 ? null : ( */}
              <button
                onClick={() => {
                  handelPage(1);
                }}
              >
                Next
              </button>
              {/* )} */}
            </div>
          )}
        </div>

        <div className="row ">
          {loader ? (
            <div>Loading...</div>
          ) : (
            repositories?.map((ele, ind) => {
              return (
                <div key={ind} className="col-md-12">
                  <div className="current_repo mt-2">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="profile_pic">
                          <img src={ele.owner.avatar_url} alt="avtar" />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="repo_body">
                          <h6>{ele.full_name}</h6>
                          <p>{ele.description}</p>
                          <div className="sub_description">
                            <div className="star_issue">
                              <span>No of stars : {ele.stargazers_count}</span>
                              <span>
                                No of issues : {ele.open_issues_count}
                              </span>
                            </div>
                            <p className="mb-0">
                              Last pushed on {ele.updated_at.split("T")[0]} at{" "}
                              {ele.updated_at.split("T")[1].split("Z")[0]} by{" "}
                              {ele.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-1">
                        <div
                          className="go_down"
                          onClick={() => {
                            handelDropdownIndex(ele.id);
                          }}
                        >
                          {ele.id !== currentDropdownIndex ?
                          <i class="bi bi-chevron-down"></i> :
                          <i class="bi bi-chevron-up"></i> }
                        </div>
                      </div>
                      {ele.id === currentDropdownIndex && (
                        <div className="col-md-12">
                          <h1>Dropdown</h1>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeCoading;
