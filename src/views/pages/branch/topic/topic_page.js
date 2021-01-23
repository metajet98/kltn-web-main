import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CLabel,
  CRow,
} from "@coreui/react";
import useModal from "src/views/useModal";

import instance from "src/network/http_client";

import { trackPromise } from "react-promise-tracker";
import TopicReplyModal from "./topic_reply_modal";

const fields = ["id", "user", "title", "createdDate", "count", "action"];

const TopicPage = () => {
  const [topics, setTopics] = useState();
  const [selectedTopicId, setSelectedTopicId] = useState();

  const {
    isShowing: isShowingTopicReplyModal,
    toggle: toggleTopicReplyModal,
  } = useModal();

  useEffect(() => {
    trackPromise(loadTopics());
  }, []);

  async function loadTopics() {
    const response = await instance.get("api/topic");
    if (response && response.data) {
      setTopics(response.data.data);
    }
  }

  return (
    <div>
      <TopicReplyModal
        topicId={selectedTopicId}
        hide={toggleTopicReplyModal}
        isShowing={isShowingTopicReplyModal}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Danh sách hỏi đáp
                  </h4>
                </CCol>
              </CRow>
              <br />
              <br />
              <CDataTable
                items={topics}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  user: (item) => <td>{item.user?.fullName}</td>,
                  count: (item) => <td>{Array.from(item.topicReply).length}</td>,
                  action: (item) => (
                    <td>
                      <CButton
                        onClick={() => {
                          setSelectedTopicId(item.id);
                          toggleTopicReplyModal();
                        }}
                        size="sm"
                        color="info"
                      >
                        Chi tiết
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default TopicPage;
