import React, { useRef, useState } from "react";
// import { InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../../Components/globalVariables";

const config = {
  buttons: [
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "symbol",
  ],
};

const AddVideo = () => {
  const videoTitle = useRef();
  const videoLink = useRef();
  const videoDesc = useRef();

  const [descValue, setDescValue] = useState();

  const handleVideoGallery = (e) => {
    const title = videoTitle.current.value;
    const video = videoLink.current.value;
    const description = videoDesc.current.value;

    // console.log(video, link, desc);

    const videoData = { title, video, description };

    axios
      .post(`${BACKEND_BASE_URL}/api/v1/admin/video-gallery/store`, videoData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          e.target.reset();
          setDescValue("", "html");
        }
        // return response;
      });

    // console.log(newUser);
    e.preventDefault();
  };
  return (
    <div className="page-wrapper">
      <div className="breadcrumb-wrapper d-flex">
        <Breadcrumb>
          <Breadcrumb.Item as={Link} to="admin" className="breadcrumb-item">
            Dashboard
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Upload Video</Breadcrumb.Item>
        </Breadcrumb>
        <div className="ms-auto breadcrumb-item">
          <Link to="/admin/all-video">All Video</Link>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-body">
          <div>
            <div className="mt-5">
              <Form onSubmit={handleVideoGallery}>
                <span className="top-border"></span>
                <div className="form-header py-2">
                  <h5 className="form-title">Upload Video</h5>
                  <hr />
                </div>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustom01"
                    className="mb-3"
                  >
                    <Form.Label className="label-title fw-bold">
                      Video title
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="video title"
                      ref={videoTitle}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a video
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustom01"
                    className="mb-3"
                  >
                    <Form.Label className="label-title fw-bold">
                      Video Link
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="video link"
                      ref={videoLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a video
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom02"
                    className="mb-3"
                  >
                    <Form.Label className="label-title fw-bold">
                      Description
                    </Form.Label>
                    {/* <Form.Control as="textarea" rows={5} ref={videoDesc} />
                     */}
                    <JoditEditor
                      ref={videoDesc}
                      config={config}
                      tabIndex={1}
                      value={descValue}
                    />
                  </Form.Group>
                </Row>

                <Button
                  type="submit"
                  className="btn-submit mt-5 rounded-3 border-0 d-flex justify-content-center"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
