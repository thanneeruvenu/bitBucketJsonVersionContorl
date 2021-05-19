import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Switch } from "antd";
import axios from "axios";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { Button, Menu, Dropdown } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd"; 

const Create = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [project, setProject] = useState(false);
  const [repo, setRepo] = useState(false);
  const [file, setFile] = useState({});
  const [open, setOpen] = useState(false);
  const [projectDropdown, setProjectDropdown] = useState([]);
  const [repoName, setRepoName] = useState("");

  useEffect(() => {
    console.log(Date.now());
  }, []);

  useEffect(() => {
    console.log("Connect");
    connectProject();
  }, []);

  const jsonData = {
    commitMessage: "",
    fileContent: {
      constantName: "",
      extendsPage: null,
      fileTimestamp: "",
      owner: "",
      description: "",
    },
  };
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    key: "",
    is_private: true,
  });

  const [repoData, setRepoData] = useState({
    name: "",
    description: "",
    key: "",
    is_private: true,
  });

  const openProject = () => {
    setVisible(true);
    setProject(true);
  };

  const openRepo = () => {
    setVisible(true);
    setRepo(true);
  };

  const close = () => {
    setVisible(false);
    setProject(false);
    setRepo(false);
  };

  //    const valueDropdown = (e) => {
  //    setRepoData({
  //      ...repoData,
  //      key: e.target.value,
  //    });
  //  };

  function onChange(checked) {
    console.log(`switch to ${checked}`);
    setProjectData({ ...projectData, is_private: checked });
  }

  //  const onChangeDropdown = async (valueDropdown) =>{
  //   console.log(`selected ${valueDropdown}`);
  //   setRepoData(valueDropdown);
  //  }

  function onChangeBlah(checked) {
    console.log(`switch to ${checked}`);
    setRepoData({ ...repoData, is_private: checked });
  }
  const submitCreateRepo = async () => {
    const { name, description, key, is_private } = repoData;
    if (!name || !description || !key) {
      return;
    }

    const submitData = {
      description: description,
      is_private: is_private,
      project: {
        key: key,
        name: name,
      },
    };

    await axios
      .post(
        `http://localhost:8080/bitbucket/create-repository/${name}`,
        submitData
      )
      .then((res) => {
        console.log(res);
        setRepoData({
          name: "",
          description: "",
          key: "",
          is_private: "",
        });
        toast.success("Repository created successfully");
      });
  };
  const submitCreateProject = async () => {
    const { name, description, key, is_private } = projectData;
    if (!name || !description || !key) {
      return;
    }

    await axios
      .post(`http://localhost:8080/bitbucket/create-project`, projectData)
      .then((res) => {
        console.log(res);
        setProjectData({
          name: "",
          description: "",
          key: "",
          is_private: "",
        });
        toast.success("Project created successfully");
      });
  };

  const handleChng = async (val) => {
    console.log(val);
    setFile(val);
  };
  const createFile = async () => {
    await axios
      .post(`http://localhost:8080/bitbucket/create-file/${repoName}`, file)
      .then((res) => {
        console.log(res);
        toast.success("File created successfully");
      })
      .catch((err) => {
        toast.error(
          "Fill all required fields,Commit message,constant name,owner,file stamp"
        );
      });
  };

  const connectProject = async () => {
    await axios
      .get("http://localhost:8080/bitbucket/get-projects")
      .then((res) => {
        console.log(res, "response");
        setProjectDropdown(res.data.values);
      });
  };

  return (
    <div className="create">
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/create">Create</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="fetch">
        <div onClick={openProject} className="box">
          <span className="box-1">
            <i class="fas fa-plus-circle"></i>
          </span>
          <span className="box-2">Create Project</span>
        </div>
        <div onClick={openRepo} className="box">
          <span className="box-1">
            <i class="fas fa-plus-circle"></i>
          </span>
          <span className="box-2">Create Repository</span>
        </div>
      </div>
      <div
        className="modal-wrapper"
        onClick={close}
        style={visible ? { display: "block" } : { display: "none" }}
      ></div>
      <div
        className="modal"
        style={visible ? { display: "block" } : { display: "none" }}
      >
        <div className="x">
          <span onClick={close}>
            <i class="fas fa-times"></i>
          </span>
        </div>
        {project && (
          <div className="create-project-box">
            <div className="form-data">
              <label>Project Name</label>
              <input
                value={projectData.name}
                onChange={(e) =>
                  setProjectData({ ...projectData, name: e.target.value })
                }
                placeholder="Enter Project Name"
                type="text"
              />
            </div>

            <div className="form-data">
              <label>Project Key</label>
              <input
                value={projectData.key}
                onChange={(e) =>
                  setProjectData({ ...projectData, key: e.target.value })
                }
                placeholder="Enter Project Key"
                type="text"
              />
            </div>
            <div className="form-data">
              <label>Project Description</label>
              <textarea
                value={projectData.description}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  })
                }
                placeholder="Enter Project Description"
                type="text"
              />
            </div>
            <div className="form-data">
              <div style={{ display: "flex" }}>
                <label style={{ marginRight: "2rem" }}>Private</label>
                <span style={{ width: "7rem" }}>
                  <Switch size={"small"} defaultChecked onChange={onChange} />
                </span>
              </div>
            </div>
            <div className="create-button">
              <span onClick={submitCreateProject}>Create</span>
            </div>
          </div>
        )}

        {repo && (
          <div className="create-project-box">
            <div className="form-data">
              <label>Repository Name</label>
              <input
                value={repoData.name}
                onChange={(e) =>
                  setRepoData({
                    ...repoData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter Repository Name"
                type="text"
              />
            </div>
            <div className="form-data">
              <label htmlFor="">Project</label>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Project"
                optionFilterProp="children"
                onChange={(value) => {
                  setRepoData({
                    ...repoData,
                    key: value,
                  });
                }}
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
                {projectDropdown.length > 0 &&
                  projectDropdown.map((m) => (
                    <option value={m.key}>{m.name}</option>
                  ))}
              </Select>
            </div>
            {/* <div className="form-data">
              <label>Project Key</label>
              <input
                value={repoData.key}
                onChange={(e) =>
                  setRepoData({
                    ...repoData,
                    key: e.target.value,
                  })
                }
                placeholder="Enter Project Key"
                type="text"
              />
            </div> */}
            <div className="form-data">
              <label>Repository Description</label>
              <textarea
                value={repoData.description}
                onChange={(e) =>
                  setRepoData({
                    ...repoData,
                    description: e.target.value,
                  })
                }
                placeholder="Enter Repository Description"
                type="text"
              />
            </div>
            <div className="form-data">
              <div style={{ display: "flex" }}>
                <label style={{ marginRight: "3rem" }}>Private</label>
                <span style={{ width: "7rem" }}>
                  <Switch
                    size={"small"}
                    defaultChecked
                    onChange={onChangeBlah}
                  />
                </span>
              </div>
            </div>
            <div className="create-button">
              <span onClick={submitCreateRepo}>Create</span>
            </div>
          </div>
        )}
      </div>

      <center style={{ margin: "1rem" }} onClick={() => setOpen(!open)}>
        {" "}
        <Button type="primary">Create File</Button>
      </center>
      {open && (
        <div>
          <center style={{ margin: "1.5rem" }}>
          <div className="repository-input">
            <label className="label">
              Repository Name:{" "}
              <input className="dataValue"
                value={repoName}
                placeholder="Repository Name"
                onChange={(e) => {
                  setRepoName(e.target.value);
                }}
                type="text"
              />
            </label>
            </div>
          </center>
          
          <Editor value={jsonData} onChange={handleChng} />
          <center style={{ margin: "1rem" }}>
            <span onClick={createFile}>
              {" "}
              <Button type="primary">Save File</Button>
            </span>
          </center>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Create;
