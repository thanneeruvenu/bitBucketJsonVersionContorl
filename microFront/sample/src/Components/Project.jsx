import React,{useEffect,useState} from 'react'
import { Breadcrumb } from "antd";
import {Link} from 'react-router-dom'
import axios from "axios";

const Project = () => {
    const [project,setProject] = useState([])
    useEffect(() => {
        connect()
    },[]);

    const connect = async () => {
        await axios.get('http://localhost:8080/bitbucket/get-projects')
            .then((res) => {
                console.log(res,"response")
                setProject(res.data.values)
            });
    }

    return (
        <div>
        <div className="bread">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/fetch">Fetch</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/fetch/project">Project</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          </div>
      <div className="project-cont">
          {
              project.length>0 && project.reverse().map((m,ind)=>(<span className="project">{ind+1}{"."}{" "}{m.name}</span>))
          }
      </div>
           
        </div>
    )
}

export default Project
