import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
import HistoryTable from "./HistoryTable";

const { Option } = Select;

const Filehistory = () => {
  const [project, setProject] = useState([]);
  const [repo, setRepo] = useState([]);
  const [files, setFiles] = useState([]);
  const [filesContent, setFilesContent] = useState([]);
  const [selectedproject, setSelectedproject] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    console.log("Connect");
    connect();
  }, []);

  // Effect will only work once the data in the array has been modified
  useEffect(() => {
    selectedproject && fetchRepo();
  }, [selectedproject]);

  useEffect(() => {
    selectedRepo && fetchFiles();
  }, [selectedRepo]);

  useEffect(() => {
    selectedFile && fetchFileContent();
  }, [selectedFile]);

  // to pause the function execution and resume after the data comes
  const fetchFileContent = async () => {
    await axios
      .get(
        `http://localhost:8080/bitbucket/file-history/${
          selectedRepo && selectedRepo
        }/${selectedFile && selectedFile}`
      )
      .then((res) => {
        setFilesContent(res.data.values);
      });
  };

  const connect = async () => {
    await axios
      .get("http://localhost:8080/bitbucket/get-projects")
      .then((res) => {
        console.log(res, "response");
        setProject(res.data.values);
      });
  };

  const fetchFiles = async () => {
    await axios
      .get(
        `http://localhost:8080/bitbucket/repoFiles/${
          selectedRepo && selectedRepo
        }`
      )
      .then((res) => {
        console.log(res);
        setFiles(res.data.values);
      });
  };

  const fetchRepo = async () => {
    console.log(selectedproject);
    await axios
      .get(
        `http://localhost:8080/bitbucket/repositories?q=project.key="${
          selectedproject && selectedproject
        }"`
      )
      .then((res) => {
        console.log(res, "response");
        setRepo(res.data.values);
      });
  };

  function onChange(value) {
    console.log(`selected ${value}`);
    setSelectedproject(value);
  }

  const onChangeRepo = async (value) => {
    setSelectedRepo(value);
  };

  return (
    <div>
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/fetch">Fetch</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/fetch/file-history">File History</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="history-cont">
        <div>
          <div className="history-input">
            <div className="history-input-item">
              <label htmlFor="">Project</label>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Project"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {project.length > 0 &&
                  project.map((m) => <option value={m.key}>{m.name}</option>)}
              </Select>
            </div>
            {selectedproject && (
              <div className="history-input-item">
                <label htmlFor="">Repository</label>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select Repository"
                  optionFilterProp="children"
                  onChange={onChangeRepo}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {repo.length > 0 &&
                    repo.map((m) => <option value={m.name}>{m.name}</option>)}
                </Select>
              </div>
            )}
            {selectedRepo && (
              <div className="history-input-item">
                <label htmlFor="">File</label>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select File"
                  optionFilterProp="children"
                  onChange={(val) => {
                    console.log(val);
                    setSelectedFile(val);
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {files.length > 0 &&
                    files.map((m) => <option value={m.path}>{m.path}</option>)}
                </Select>
              </div>
            )}
          </div>
        </div>
        <div className="table-cont">
          <HistoryTable
            fileData={filesContent}
            selectedFile={selectedFile}
            selectedRepo={selectedRepo}
          />
        </div>
      </div>
    </div>
  );
};

export default Filehistory;
