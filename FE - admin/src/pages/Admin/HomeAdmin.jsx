import { Link } from "react-router-dom";
import Parking_Area from "../../services/parking_area.service";
import useUserInfo from "@/hooks/useUserInfo.js";
import UserService from "@/services/user.service.js";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, InputNumber } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import avt from "../../assets/img_avatar.png";

function HomeAdmin() {
  const [areaList, setAreaList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const userInfo = useUserInfo();

  const signOut = async () => {
    await UserService.signOut();
    location.reload();
  };

  const onEditArea = (record) => {
    setIsEditing(true);
    setEditingArea({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingArea(null);
  };

  const [columns, setColumns] = useState([
    {
      key: "Area",
      title: "Area",
      dataIndex: "name",
    },
    {
      key: "Row Count",
      title: "Row Count",
      dataIndex: "row_count",
    },
    {
      key: "Column Count",
      title: "Column Count",
      dataIndex: "column_count",
    },
    {
      key: "Countdown",
      title: "Countdown",
      dataIndex: "countdown",
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditArea(record);
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
        Parking_Area.delete(id);

        window.location.reload();
      },
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      row_count: 0,
      column_count: 0,
      countdown: 0,
    },
    validationSchema: yup.object({
      name: yup.string().required("Please enter name of area!"),
      row_count: yup.number().required("Required!"),
      column_count: yup.number().required("Required!"),
      countdown: yup.number().required("Required!"),
    }),
    onSubmit: async (values) => {
      try {
        await Parking_Area.create(values);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Parking_Area.search({ page: 1, perPage: 500 });
        setAreaList(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className="sidebar">
          <div className="logo-details">
            <span className="logo_name">Packing System</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#">
                <i className="bx bxs-home"></i>
                <span className="links_name">Home</span>
              </a>
            </li>
            <li>
              <Link to="/user">
                <i className="bx bxs-user"></i>
                <span className="links_name">User</span>
              </Link>
            </li>
            <li>
              <Link to="/reserve">
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
            <div className="button-add">
              <Button onClick={showModal}>Add Area</Button>
            </div>
            <Table columns={columns} dataSource={areaList}></Table>
            <Modal
              title="Add Occupied"
              open={isModalOpen}
              onOk={formik.handleSubmit}
              onCancel={handleCancel}
            >
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div>
                    <label>Name Area</label>
                  </div>
                  <Input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <p className={"form-error"}>{formik.errors.name}</p>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <label>Rows</label>
                  </div>
                  <Input
                    type="number"
                    name="row_count"
                    value={formik.values.row_count}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.row_count && formik.touched.row_count && (
                    <p className={"form-error"}>{formik.errors.row_count}</p>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <label>Columns</label>
                  </div>
                  <Input
                    type="number"
                    name="column_count"
                    value={formik.values.column_count}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.column_count &&
                    formik.touched.column_count && (
                      <p className={"form-error"}>
                        {formik.errors.column_count}
                      </p>
                    )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <label>Countdown</label>
                  </div>
                  <Input
                    type="number"
                    name="countdown"
                    value={formik.values.countdown}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.countdown && formik.touched.countdown && (
                    <p className={"form-error"}>{formik.errors.countdown}</p>
                  )}
                </div>
              </form>
            </Modal>
            <Modal
              title="Edit Area"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                Parking_Area.update(editingArea.id, {
                  name: editingArea.name,
                  row_count: editingArea.row_count,
                  column_count: editingArea.column_count,
                  countdown: editingArea.countdown,
                }).then(() => {
                  (pre) => {
                    return pre.map((area) => {
                      if (area.id === editingArea.id) {
                        return editingArea;
                      } else {
                        return area;
                      }
                    });
                  };
                  window.location.reload();
                  resetEditing();
                });
              }}
            >
              <label> Area Name</label>
              <Input
                value={editingArea?.name}
                onChange={(e) => {
                  setEditingArea((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              <div>
                <label> Row</label>
                <div>
                  <input
                    className="inputNumber"
                    type="number"
                    value={editingArea?.row_count}
                    onChange={(e) => {
                      setEditingArea((pre) => {
                        return { ...pre, row_count: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Colunm</label>
                <div>
                  <input
                    className="inputNumber"
                    type="number"
                    value={editingArea?.column_count}
                    onChange={(e) => {
                      setEditingArea((pre) => {
                        return { ...pre, column_count: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Countdown</label>
                <div>
                  <input
                    className="inputNumber"
                    type="number"
                    value={editingArea?.countdown}
                    onChange={(e) => {
                      setEditingArea((pre) => {
                        return { ...pre, countdown: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </section>
      </div>
    </div>
  );
}
export default HomeAdmin;
