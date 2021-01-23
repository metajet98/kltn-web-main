import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import instance from "src/network/http_client";

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CInput,
  CInputFile,
  CForm,
  CRow,
  CCol,
  CLabel,
  CButton,
  CImg,
  CFormText,
} from "@coreui/react";
import { trackPromise } from "react-promise-tracker";

const TopicReplyModal = ({ isShowing, hide, topicId }) => {
  const [selectedFiles, setSelectedFile] = useState(undefined);
  const [content, setContent] = useState();
  const [topic, setTopic] = useState();

  const selectFile = (event) => {
    setSelectedFile(event.target.files);
  };

  useEffect(() => {
    trackPromise(loadTopicDetail());
  }, [topicId]);

  async function loadTopicDetail() {
    const response = await instance.get(`api/topic/${topicId}`);
    console.log(response);
    if (response && response.data) {
      setTopic(response.data.data);
    }
  }

  async function replyTopic() {
    var image;
    if (selectedFiles != null) {
      let formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const imageUpload = await instance.post("api/utils/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!imageUpload || !imageUpload.data) {
        return;
      }
      image = imageUpload.data.data;
    }
    let newReply = {
      content: content,
      image: image,
    };
    await instance.post(`api/topic/${topicId}/reply`, newReply);
    loadTopicDetail();
  }

  function renderReplies() {
    return topic?.topicReply?.map(function (item, i) {
      return (
        <div class="border m-1 p-1 rounded">
          <CCol>
            <p class="font-weight-bold">{item.user?.fullName ?? ""}</p>
            <p class="font-weight-lighter">{item.createdDate}</p>
            <p>{item.content}</p>
            {item.image ? (
              <CImg
                width="200"
                fluid
                class="rounded mx-auto d-block"
                src={item.image}
              />
            ) : null}
          </CCol>
        </div>
      );
    });
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>{topic?.title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p class="font-weight-bold">{topic?.user?.fullName ?? ""}</p>
            <p class="font-weight-lighter">{topic?.createdDate}</p>
            <p>{topic?.content}</p>
            {topic?.topicImage?.image ? (
              <CImg src={topic?.topicImage?.image} />
            ) : null}
            {renderReplies()}
            <CRow>
              <CCol>
                <CForm className="was-validated" action="" method="post">
                  <CFormText>Trả lời</CFormText>
                  <CFormGroup>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setContent(e.target.value)}
                      id="name"
                      placeholder="Nhập nội dung"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CInputFile
                      onChange={selectFile}
                      custom={false}
                    ></CInputFile>
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary" onClick={replyTopic}>
              Trả lời
            </CButton>
            <CButton color="secondary" onClick={hide}>
              Hủy
            </CButton>
          </CModalFooter>
        </CModal>,
        document.body
      )
    : null;
};

export default TopicReplyModal;
