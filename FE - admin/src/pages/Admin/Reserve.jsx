import { useEffect, useState } from "react";
import "./Admin.css";
import packingReserve from "../../services/area.service";
import useUserInfo from "@/hooks/useUserInfo.js";
import UserService from "@/services/user.service.js";
import { Modal, Table, Input, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import avt from "../../assets/img_avatar.png";

function Reserve() {
  const [packingData, setPackingData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReserve, setEditingReserve] = useState(null);
  const userInfo = useUserInfo();

  const signOut = async () => {
    await UserService.signOut();
    location.reload();
  };

  const onEditReserve = (record) => {
    setIsEditing(true);
    setEditingReserve({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingReserve(null);
  };
  const [columns, setColumns] = useState([
    {
      key: "User",
      title: "User",
      dataIndex: "userEmail",
    },
    {
      key: "Packing Area",
      title: "Packing Area",
      dataIndex: "areaName",
    },
    {
      key: "Row",
      title: "Row",
      dataIndex: "row",
    },
    {
      key: "Column",
      title: "Column",
      dataIndex: "column",
    },
    {
      key: "start-tiem",
      title: "Start time",
      dataIndex: "start_time",
    },
    {
      key: "end-time",
      title: "End time",
      dataIndex: "end_time",
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditReserve(record);
              }}
            />

            <DeleteOutlined
              onClick={() => {
                onDelete(record.id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ]);

  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure detele this?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        packingReserve.delete(id);
        window.location.reload();
      },
    });
  };

  useEffect(() => {
    packingReserve.list({ page: 1, perPage: 30 }).then((result) => {
      setPackingData(result.data.items);
      console.log(result.data.items);
      result.data.items.forEach((item) => {
        item.userEmail = item.expand.user_id.email;
        item.areaName = item.expand.packing_Area_id.name;
      });
    });
  }, []);
  return (
    <div>
      <div className="sidebar">
        <div className="logo-details">
          <span className="logo_name">Packing System</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <i className="bx bxs-home"></i>
              <span className="links_name">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/user">
              <i className="bx bxs-user"></i>
              <span className="links_name">User</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="bx bxs-car"></i>
              <span className="links_name">Reserve</span>
            </Link>
          </li>
          <li class="log_out">
            <Link to="/sign-in">
              <i class="bx bx-log-out"></i>
              <span class="links_name" onClick={signOut}>
                Log out
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className="bx bx-menu sidebarBtn"></i>
            <span className="dashboard">Packing System</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="bx bx-search"></i>
          </div>
          <div class="profile-details">
            <img src={avt} alt="" />
            <span class="admin_name">{userInfo?.email}</span>
          </div>
        </nav>
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="button-add"></div>
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  record.id;
                },
              };
            }}
            columns={columns}
            dataSource={packingData}
          ></Table>
          <Modal
            title="Edit reserve"
            open={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              packingReserve
                .update(editingReserve.id, {
                  userEmail: editingReserve.userEmail,
                  areaName: editingReserve.areaName,
                  row: editingReserve.row,
                  column: editingReserve.column,
                  startTime: editingReserve.startTime,
                  endTime: editingReserve.endTime,
                })
                .then(() => {
                  (pre) => {
                    return pre.map((reserve) => {
                      if (reserve.id === editingReserve.id) {
                        return editingReserve;
                      } else {
                        return reserve;
                      }
                    });
                  };
                  window.location.reload();
                  resetEditing();
                });
            }}
          >
            <Input
              value={editingReserve?.userEmail}
              onChange={(e) => {
                setEditingReserve((pre) => {
                  return { ...pre, userEmail: e.target.value };
                });
              }}
            />
            <Input
              style={{ marginTop: "10px" }}
              value={editingReserve?.areaName}
              onChange={(e) => {
                setEditingReserve((pre) => {
                  return { ...pre, areaName: e.target.value };
                });
              }}
            />
            <Input
              style={{ marginTop: "10px" }}
              value={editingReserve?.row}
              onChange={(e) => {
                setEditingReserve((pre) => {
                  return { ...pre, row: e.target.value };
                });
              }}
            />
            <Input
              style={{ marginTop: "10px" }}
              value={editingReserve?.column}
              onChange={(e) => {
                setEditingReserve((pre) => {
                  return { ...pre, column: e.target.value };
                });
              }}
            />
            <DatePicker
              showTime
              style={{ marginTop: "10px" }}
              defaultValue={editingReserve?.startTime}
              onChange={(e) => {
                setEditingReserve((pre) => {
                  return { ...pre, startTime: e.target.value };
                });
              }}
            />
            <DatePicker
              showTime
              style={{ marginTop: "10px", marginLeft: "20px" }}
              defaultValue={editingReserve?.endTime}
              onChange={(e) => {
                setEditingReserve((pre) => {
                  return { ...pre, endTime: e.target.value };
                });
              }}
            />
          </Modal>
        </div>
      </section>
    </div>
  );
}
export default Reserve;
