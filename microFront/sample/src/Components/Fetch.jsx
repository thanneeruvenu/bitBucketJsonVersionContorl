import React from "react";
import { Breadcrumb } from "antd";
import {Link} from 'react-router-dom'

const Fetch = ({history}) => {
  return (
    <div className="fetch-main">
    <div className="bread">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/fetch">Fetch</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      </div>
      <div  className="fetch">
        <div onClick={()=>{history.push('/fetch/project')}} className="box">
          <span className="box-1"><i className="fas fa-folder"></i></span>
          <span className="box-2">Project</span>
        </div>
        <div onClick={()=>{history.push('/fetch/repository')}} className="box">
          <span className="box-1"><i className="fas fa-code"></i></span>
          <span className="box-2"> Repository</span>
        </div>
        <div onClick={()=>{history.push('/fetch/file-history')}} className="box">
          <span className="box-1"><i className="fas fa-history"></i></span>
          <span className="box-2"> File history</span>
        </div>
        {/* <div className="box">
          <span className="box-1"><i className="fas fa-file"></i></span>
          <span className="box-2"> File content</span>
        </div>
        <div className="box">
          <span className="box-1"><i className="fab fa-git-alt"></i></span>
          <span className="box-2"> Commit Id</span>
        </div>
        <div className="box">
          <span className="box-1"><i className="fas fa-key"></i></span>
          <span className="box-2"> Repository Key</span>
        </div> */}
      </div>
    </div>
  );
};

export default Fetch;
