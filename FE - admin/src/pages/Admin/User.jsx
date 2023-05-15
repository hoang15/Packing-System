import { useEffect, useState } from "react";
import "./Admin.css";
import { Modal, Table, Button, Input, Tag } from "antd";
import userService from "../../services/user";
import useUserInfo from "@/hooks/useUserInfo.js";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";
import avt from "../../assets/img_avatar.png";

function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const userInfo = useUserInfo();

  const signOut = async () => {
    await UserService.signOut();
    location.reload();
  };

  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [columns, setColumns] = useState([
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "active",
      title: "Active",
      dataIndex: "is_active",
      filters: [
        {
          text: "Activated",
          value: true,
        },
        {
          text: "Not activated",
          value: false,
        },
      ],
      onFilter: (value, record) => record.is_active === value,
      render: (value) => {
        let color = value == true ? "green" : value == false ? "red" : "";

        return (
          <Tag color={color} key={value}>
            {String(value).toUpperCase()}
          </Tag>
          // return <span>{String(value)}</span>;
        );
      },
    },

    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditUser(record);
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
  const onChange = (pagination, filters, sorter, extra) => {};

  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure detele this?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        userService.delete(id);

        window.location.reload();
      },
    });
  };

  const [user, setuser] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Required!").email("Invalid email format"),
      password: yup
        .string()
        .required("Required!")
        .min(8, "Minimum 8 characters"),
      passwordConfirm: yup
        .string()
        .required("Required!")
        .oneOf([yup.ref("password")], "Password's not match"),
    }),
    onSubmit: async (values) => {
      try {
        await UserService.signUp(values);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    userService.search({ page: 1, perPage: 20 }).then((result) => {
      setuser(result.data.items);
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
            <a href="/">
              <i className="bx bxs-home"></i>
              <span className="links_name">Home</span>
            </a>
          </li>
          <li>
            <Link to="#">
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
            <Button onClick={showModal}>Add User</Button>
          </div>
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  record.id;
                },
              };
            }}
            columns={columns}
            dataSource={user}
            onChange={onChange}
          ></Table>
          <Modal
            title="Add user"
            open={isModalOpen}
            onOk={formik.handleSubmit}
            onCancel={handleCancel}
          >
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div>
                  <label>Email</label>
                </div>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className={"form-error"}>{formik.errors.email}</p>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div>
                  <label>Password</label>
                </div>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className={"form-error"}>{formik.errors.password}</p>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div>
                  <label>Confirm Password</label>
                </div>
                <Input
                  type="password"
                  name="passwordConfirm"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                />
                {formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm && (
                    <p className={"form-error"}>
                      {formik.errors.passwordConfirm}
                    </p>
                  )}
              </div>
            </form>
          </Modal>
          <Modal
            title="Edit User"
            open={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              userService
                .update(editingUser.id, {
                  email: editingUser.email,
                  is_active: editingUser.is_active,
                })
                .then(() => {
                  (pre) => {
                    return pre.map((user) => {
                      if (user.id === editingUser.id) {
                        return editingUser;
                      } else {
                        return user;
                      }
                    });
                  };
                  resetEditing();
                });
            }}
          >
            <Input
              value={editingUser?.email}
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, email: e.target.value };
                });
              }}
            />
            <Input
              value={editingUser?.is_active}
              onChange={(e) => {
                setEditingUser((pre) => {
                  return { ...pre, is_active: e.target.value };
                });
              }}
            />
          </Modal>
        </div>
      </section>
    </div>
  );
}
export default User;
