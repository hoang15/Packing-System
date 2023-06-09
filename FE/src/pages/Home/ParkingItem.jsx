import { Button, DatePicker, Input, Modal, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import "../../assets/css/ParkingItem.css";
import { useFormik } from "formik";
import * as yup from "yup";
import parkingReserve from "../../services/area.service";
import UserService from "../../services/user.service";
import packingReserve from "../../services/area.service";
import { AUTH_TOKEN } from "../../utils/constants";
import useUserInfo from "@/hooks/useUserInfo.js";

const ParkingItem = ({ indexCol, indexRow, nameArea, idArea, isParked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfo = useUserInfo();
  const showModal = () => {
    let checkAuth = localStorage.getItem(AUTH_TOKEN);
    if (checkAuth) {
      if (userInfo?.is_active == true) {
        setIsModalOpen(true);
      } else {
        Modal.error({
          title: "You can't make a reservation ",
          content: "Please active account",
        });
      }
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
      row: indexRow,
      col: indexCol,
    },
    validationSchema: yup.object({
      start_time: yup.string().required("Required!"),
      end_time: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      try {
        const params = {
          user_id: userInfo?.id,
          packing_Area_id: values.areaId,
          row: values.row,
          column: values.col,
          start_time: values.start_time,
          end_time: values.end_time,
        };
        console.log(params);
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

  return (
    <div>
      <Button
        className={`park-item ${isParked ? "activeParked" : ""}`}
        onClick={showModal}
        style={{ height: "60px", width: "100px" }}
      >
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
            <label
              value={formik.values.indexRow}
              onChange={formik.handleChange}
              style={{ marginTop: "20px", color: "red" }}
            >
              {indexRow}
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div>
              <label>Column</label>
            </div>
            <label
              value={formik.values.col}
              onChange={formik.handleChange}
              style={{ marginTop: "20px", color: "red" }}
            >
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
