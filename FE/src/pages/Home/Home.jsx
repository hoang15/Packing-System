import Parking_Area from "../../services/parking_area.service";
import { useEffect, useState } from "react";

import ParkingItem from "./ParkingItem";
import parkingReserve from "../../services/area.service";
import Header from "../../layout/Header";

function Home() {
  const [areaList, setAreaList] = useState([]);
  const [areaState, setAreaState] = useState();
  // const [nameArea, setNameArea] = useState([]);

  const [data, setData] = useState({ col: 0, row: 0, areaName: "" });

  const onChangeSelect = (e) => {
    const selectedId = e.target.value;
    const selectedAreaState = areaList.filter((d) => d.id == selectedId)[0];
    setAreaState(selectedAreaState);
    console.log(selectedAreaState);
    setData({
      areaId: selectedAreaState.id,
      areaName: selectedAreaState.name,
      col: selectedAreaState.column_count,
      row: selectedAreaState.row_count,
    });
  };

  useEffect(() => {
    Parking_Area.search({ page: 1, perPage: 10 }).then((result) => {
      setAreaList(result.data.items);
    });
  }, []);

  const loopParkSlot = (row, col, areaName, areaId) => {
    const trList = [];
    for (let i = 1; i <= row; i++) {
      let tdList = [];
      for (let j = 1; j <= col; j++) {
        tdList.push(
          <td className="td">
            <ParkingItem
              indexCol={j}
              indexRow={i}
              nameArea={areaName}
              idArea={areaId}
              key={`${i}-${j}`}
            />
          </td>
        );
      }
      trList.push(<tr className="tr">{tdList}</tr>);
    }
    return trList;
  };

  return (
    <div className={"main-container"}>
      <Header style={{ position: "fixed" }} />
      <div className={"product-grid"}>
        <select
          className="Selection"
          style={{ width: "190px" }}
          onChange={(e) => {
            onChangeSelect(e);
          }}
        >
          <option value="" disabled selected hidden>
            Select parking cellar
          </option>
          {areaList.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <div style={{ padding: "15px" }}>
          <table className="table" cellSpacing={0} cellPadding={0}>
            <tbody>
              {loopParkSlot(data.row, data.col, data.areaName, data.areaId)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
