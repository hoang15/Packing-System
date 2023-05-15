import { Button, DatePicker, Input, Modal, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import "../../assets/css/ParkingItem.css";
import { useFormik } from "formik";
import * as yup from "yup";
import parkingReserve from "../../services/area.service";
import UserService from "../../services/user.service";
import packingReserve from "../../services/area.service";
import { AUTH_TOKEN } from "../../utils/constants";

const ParkingItem = ({ indexCol, indexRow, nameArea, idArea }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState("");
  const showModal = () => {
    let checkAuth = localStorage.getItem(AUTH_TOKEN);
    if (checkAuth) {
      setIsModalOpen(true);
    } else {
      Modal.error({
        title: "You can't make a reservation ",
        content: "Please login and try again",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      areaId: idArea,
      start_time: "",
      end_time: "",
    },
    validationSchema: yup.object({
      start_time: yup.string().required("Required!"),
      end_time: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          user_id: userId,
          packing_Area_id: values.areaId,
          row: values.row,
          column: values.column,
          start_time: values.start_time,
          end_time: values.end_time,
        };
        await parkingReserve.create(params);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleOK = () => {
    formik.handleSubmit();
  };

  // const changeColor = () => {
  //   if ((reserveColumn == indexCol) & (reserveRow == indexRow)) & {

  //   }
  // };

  useEffect(() => {
    parkingReserve.search({ page: 1, perPage: 10 }).then((result) => {
      result.data.items.forEach((item) => {
        item.reserveColumn = item.column;
        item.reserveRow = item.row;
      });
    });
  }, []);
  useEffect(() => {
    UserService.getUserInfo().then((res) => {
      setEmail(res.data.email);
      setUserId(res.data.id);
    });
  }, []);

  useEffect(() => {
    packingReserve.list({ page: 1, perPage: 30 }).then((result) => {
      result.data.items.forEach((item) => {
        item.col = item.column;
        item.row = item.row;
      });
    });
  }, []);
  return (
    <div className="park-item">
      <Button onClick={showModal} style={{ height: "60px", width: "100px" }}>
        <i style={{ fontSize: "30px" }} className="bx bxs-car"></i>
        <div id="changeColor">
          S{indexCol}-{indexRow}
        </div>
      </Button>
      <Modal
        title="Add Park"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <label>Name Area</label>
              </div>

              <label style={{ marginTop: "20px", color: "red" }}>
                {nameArea}
              </label>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div>
              <label>Row</label>
            </div>
            <label style={{ marginTop: "20px", color: "red" }}>
              {indexRow}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div>
              <label>Column</label>
            </div>
            <label style={{ marginTop: "20px", color: "red" }}>
              {indexCol}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div>
              <label>Start time</label>
            </div>

            <input
              type="date"
              name="start_time"
              value={formik.values.start_time}
              onChange={formik.handleChange}
            />
            {formik.errors.start_time && formik.touched.start_time && (
              <p className={"form-error"}>{formik.errors.start_time}</p>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <div>
              <label>End time</label>
            </div>
            <input
              type="date"
              name="end_time"
              value={formik.values.end_time}
              onChange={formik.handleChange}
            />
            {formik.errors.end_time && formik.touched.end_time && (
              <p className={"form-error"}>{formik.errors.end_time}</p>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ParkingItem;
