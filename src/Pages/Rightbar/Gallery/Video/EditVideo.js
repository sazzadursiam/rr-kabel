import React, { useEffect, useRef, useState } from "react";
// import { InputLabel } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import JoditEditor from "jodit-react";
import { BACKEND_BASE_URL } from "../../../../Components/globalVariables.js";
import Swal from "sweetalert2";
// import ImageUploading from "react-images-uploading";

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

const EditVideo = () => {
  const videoDesc = useRef();
  const { id } = useParams();

  // const [imageGalleryInfo, setImageGalleryInfo] = useState({});

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideoLink] = useState();

  const fetchVideo = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/api/v1/admin/video-gallery/${id}/edit`)
      .then((res) => {
        const { title, description, video } = res.data.video_gallery;
        setTitle(title);
        setDescription(description);
        setVideoLink(video);
      });
  };
  useEffect(() => {
    fetchVideo();
  }, []);
  // console.log("Title", imageGalleryInfo);

  const updateVideo = (e) => {
    console.log("TEST");
    const description = videoDesc.current.value;
    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("video", video);
    formdata.append("title", title);
    formdata.append("description", description);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/v1/admin/video-gallery/${id}/update`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          confirmButtonColor: "#5eba86",
        });
        fetchVideo();
      });

    e.preventDefault();
  };

  return (
    <div className="page-wrapper">
      <div className="breadcrumb-wrapper d-flex">
        <Breadcrumb>
          <Breadcrumb.Item as={Link} to="admin" className="breadcrumb-item">
            Dashboard
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Edit Video</Breadcrumb.Item>
        </Breadcrumb>
        <div className="ms-auto breadcrumb-item">
          <Link to="/admin/AllImage">All Video</Link>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-body">
          <div>
            <div className="mt-5">
              <Form onSubmit={updateVideo}>
                <span className="top-border"></span>
                <div className="form-header py-2">
                  <h5 className="form-title">Edit Video</h5>
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
                      placeholder="image title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a video{" "}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustom01"
                    className="mb-3"
                  >
                    <Form.Label className="label-title fw-bold">
                      Video URL
                    </Form.Label>

                    {/* <Form.Control required type="file" ref={imageLink} /> */}

                    <Form.Control
                      required
                      type="text"
                      placeholder="video link"
                      value={video}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
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
                    <JoditEditor
                      config={config}
                      tabIndex={1}
                      value={description}
                      ref={videoDesc}
                    />
                  </Form.Group>
                </Row>

                <Button
                  type="submit"
                  className="btn-submit mt-5 rounded-3 border-0 d-flex justify-content-center"
                >
                  Update
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
