import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import moment from "moment";
import { Modal, Button } from "antd";
import axios from "axios";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

const HistoryTable = ({ fileData, selectedFile, selectedRepo }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [singleData, setSingleData] = useState({});
  let jsdata = {};

  useEffect(() => {
    console.log(fileData, "table files");
  }, [fileData]);
  const columns = [
    {
      title: "Serial No",
      dataIndex: "slno",
      key: "slno",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Commit Message",
      dataIndex: "commitmessage",
      key: "commitmessage",
    },
    {
      title: "Commit Date",
      dataIndex: "commitdate",
      key: "commitdate",
    },
    {
      title: "Author",
      key: "author",
      dataIndex: "author",
    },
    {
      title: "Commit Id",
      key: "commitid",
      dataIndex: "commitid",
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <Space size="middle">
          <span
            style={{ color: "purple", cursor: "pointer" }}
            onClick={() => getContent(id)}
          >
            Get
          </span>
        </Space>
      ),
    },
  ];

  const getContent = async (id) => {
    await axios
      .get(
        `http://localhost:8080/bitbucket/file-contentID/${selectedRepo}/${id}/${selectedFile}?at=master`
      )
      .then((res) => {
        console.log(res);
        setSingleData(res.data);

        jsdata = res.data;
        showModal();
      });
  };

  const data = [
    ...(fileData &&
      fileData.map((m, ind) => ({
        key: ind + 1,
        slno: ind + 1,
        commitmessage: m.commit.message,
        commitdate: moment(m.commit.date).format("MMMM Do YYYY, h:mm:ss a"),
        author: m.commit.author.raw,
        commitid: m.commit.hash,
        id: m.commit.hash,
      }))),
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSingleData({})
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSingleData({})
  };
  return (
    <div className="table">
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="60%"
      >
        <div style={{ padding: "3rem" }}>
          {Object.keys(singleData).length>0&&<Editor value={singleData} onChange={() => {}} />}
        </div>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default HistoryTable;
