import React, { useEffect, useState } from "react";
import "./codingStyle.scss";

function HomeCoading() {
  const [repositories, setRepositories] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch(
      "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.items.length > 0) {
          console.log(data.items);
          setLoader(false);
          setRepositories(data?.items);
        } else {
          setLoader(false);
          setRepositories([]);
        }
      });
  }, []);
  return (
    <div className="home_code">
      <div className="container">
        <h1 className="mt-5">Coding Challenge</h1>
        <div className="row mt-5">
          {loader ? (
            <div>Loading...</div>
          ) : (
            repositories?.map((ele, ind) => {
              return (
                <div key={ind} className="col-md-12">
                  <div className="current_repo">
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
                      <div className="col-md-1">
                        <div className="go_down">
                          <i class="bi bi-chevron-down"></i>
                        </div>
                      </div>
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
