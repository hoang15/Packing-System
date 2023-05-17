import Parking_Area from "../../services/parking_area.service";
import { useEffect, useState } from "react";

import ParkingItem from "./ParkingItem";
import parkingReserve from "../../services/area.service";
import Header from "../../layout/Header";
import { array } from "yup";

function Home() {
  const [areaList, setAreaList] = useState([]);
  const [areaState, setAreaState] = useState();
  const [parkingReserves, setParkingReserves] = useState([]);
  const [myPark, setMyPark] = useState([]);

  const [data, setData] = useState({
    col: 0,
    row: 0,
    areaName: "",
    areaId: "",
  });

  const onChangeSelect = (e) => {
    const selectedId = e.target.value;
    const selectedAreaState = areaList.filter((d) => d.id == selectedId)[0];
    setAreaState(selectedAreaState);
    setData({
      areaId: selectedAreaState.id,
      areaName: selectedAreaState.name,
      col: selectedAreaState.column_count,
      row: selectedAreaState.row_count,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Parking_Area.search({
          page: 1,
          perPage: 500,
        });
        setAreaList(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchDataReserve() {
      try {
        const result = await parkingReserve.search({ page: 1, perPage: 500 });
        setParkingReserves(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataReserve();
  }, []);

  // const findPackingSpace = (row, col, areaId) => {
  //   if (areaId == reserveId) {
  //     let minRow = row[0];
  //     let minCol = col[0];
  //     for (let i = 0; i <= row; i++) {
  //       if (minRow > row[i] && minRow != rowReserve) {
  //         minRow = row[i];
  //       }
  //       for (let j = 0; j <= row; j++) {
  //         if (minCol > col[i] && minCol != colReserve) {
  //           minCol = col[i];
  //         }
  //       }
  //       return console.log(minCol, minRow);
  //     }
  //   }
  // };
  const findPackingSpace = () => {
    console.log(myPark);
  };
  const loopParkSlot = (row, col, areaName, areaId) => {
    let trList = [];
    let mypark = [];
    for (let i = 1; i <= row; i++) {
      let tdList = [];
      for (let j = 1; j <= col; j++) {
        const isParked = parkingReserves.filter((packingReserve) => {
          return (
            packingReserve.row === i &&
            packingReserve.column === j &&
            packingReserve.packing_Area_id === areaId
          );
        });
        tdList.push(
          <td className="td">
            <ParkingItem
              isParked={!!isParked.length}
              indexCol={j}
              indexRow={i}
              nameArea={areaName}
              idArea={areaId}
              key={`${i}-${j}`}
            />
          </td>
        );
        mypark.push({
          isParked: !!isParked.length,
          indexCol: j,
          indexRow: i,
          nameArea: areaName,
          idArea: areaId,
          key: `${i}-${j}`,
        });
      }
      trList.push(<tr className="tr">{tdList}</tr>);
    }

    console.log(mypark);
    return trList;
  };

  return (
    <div className={"main-container"}>
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
        <button onClick={findPackingSpace()} style={{ marginLeft: "10px" }}>
          Find the nearest parking space
        </button>
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
