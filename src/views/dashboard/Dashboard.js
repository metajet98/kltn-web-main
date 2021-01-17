import React, { lazy } from "react";
import { useEffect, useState } from "react";
import { DatetimeInput } from "react-datetime-inputs";
import { toast } from 'react-toastify';

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { hexToRgba } from "@coreui/utils";

import instance from "src/network/http_client";
import { trackPromise } from "react-promise-tracker";

var moment = require("moment"); // require

const Dashboard = () => {
  const [statistics, setStatistics] = useState();

  const [filterStart, setFilterStart] = useState(moment().subtract(1, "months"));
  const [filterEnd, setFilterEnd] = useState(moment());

  useEffect(() => {
    console.log("useEffect");
    if(filterStart >= filterEnd) {
      toast.error("Vui lòng chọn ngày đúng chuẩn!");
    } else {
      trackPromise(loadStatistic());
    }
  }, [filterStart, filterEnd]);

  async function loadStatistic() {
    var params = {
      startDate: filterStart.toISOString(),
      endDate: filterEnd.toISOString(),
    };
    const response = await instance.get("api/utils/statistic", {
      params: params,
    });
    if (response && response.data) {
      setStatistics(response.data.data);
    }
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Thống kê
              </h4>
            </CCol>
            <div className="small text-muted">Từ</div>
            <CCol sm="3" className="d-none d-md-block">
              <DatetimeInput
                onChange={(e) => {
                  console.log(e);
                  setFilterStart(e);
                }}
                date-format="dd/MM/yyyy"
                time-format="HH:mm"
                datetime={filterStart}
              />
            </CCol>
            <div className="small text-muted">đến</div>
            <CCol sm="3" className="d-none d-md-block">
              <DatetimeInput
                onChange={(e) => {
                  console.log(e);
                  setFilterEnd(e);
                }}
                date-format="dd/MM/yyyy"
                time-format="HH:mm"
                datetime={filterEnd}
              />
            </CCol>
          </CRow>
          <br />
          <MainChartExample
            statistics={statistics}
            style={{ height: "300px", marginTop: "40px" }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

const branchReview = "#EB5016";
const branchTopic = "#2CCC25";
const branchBill = "#268DCF";
const branchUser = "#AD4DBA";
const branchNumberBill = "#D2EB16";

const MainChartExample = (attributes) => {
  var data = Array.from(attributes?.statistics || []);

  const totalBillDatasets = (() => {
    let elements = data.length;
    const totalBillData = [];
    for (let i = 0; i < elements; i++) {
      totalBillData.push(data[i].totalBill);
    }
    return [
      {
        label: "Tổng tiền",
        backgroundColor: hexToRgba(branchBill, 10),
        borderColor: branchBill,
        pointHoverBackgroundColor: branchBill,
        borderWidth: 2,
        data: totalBillData,
      },
    ];
  })();

  const totalBillOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  const defaultDatasets = (() => {
    let elements = data.length;
    const numberBills = [];
    const newUsers = [];
    const reviews = [];
    const topics = [];
    for (let i = 0; i < elements; i++) {
      numberBills.push(data[i].numberBill);
      newUsers.push(data[i].newUserCount);
      reviews.push(data[i].reviewAvg);
      topics.push(data[i].topicCount);
    }
    return [
      {
        label: "Tổng số hoá đơn",
        backgroundColor: hexToRgba(branchNumberBill, 10),
        borderColor: branchNumberBill,
        pointHoverBackgroundColor: branchNumberBill,
        borderWidth: 2,
        data: numberBills,
      },
      {
        label: "Lượt khách đăng kí mới",
        backgroundColor: hexToRgba(branchUser, 10),
        borderColor: branchUser,
        pointHoverBackgroundColor: branchUser,
        borderWidth: 2,
        data: newUsers,
      },
      {
        label: "Đánh giá trung bình",
        backgroundColor: hexToRgba(branchReview, 10),
        borderColor: branchReview,
        pointHoverBackgroundColor: branchReview,
        borderWidth: 2,
        data: reviews,
      },
      {
        label: "Lượt hỏi đáp",
        backgroundColor: hexToRgba(branchTopic, 10),
        borderColor: branchTopic,
        pointHoverBackgroundColor: branchTopic,
        borderWidth: 2,
        data: topics,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <div>
      <div className="small text-muted">Doanh số</div>
      <CChartLine
        datasets={totalBillDatasets}
        options={totalBillOptions}
        labels={data.map((x) => new Date(x.date).getDate())}
      />
      <br/>
      <div className="small text-muted">Chung</div>
      <CChartLine
        datasets={defaultDatasets}
        options={totalBillOptions}
        labels={data.map((x) => new Date(x.date).getDate())}
      />
    </div>
  );
};

export default Dashboard;
