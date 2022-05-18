import React, { useRef, useState } from "react";
// import { InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import JoditEditor from "jodit-react";

import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../../../Components/globalVariables";

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

const AddImage = () => {
  const imageTitle = useRef();
  const imageDesc = useRef();

  const [userInfo, setuserInfo] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
    });
  };

  const [descValue, setDescValue] = useState();

  const [validated, setValidated] = useState(false);

  const handleImageGallery = (e) => {
    const title = imageTitle.current.value;
    const description = imageDesc.current.value;

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    const formdata = new FormData();
    formdata.append("image", userInfo.file);
    formdata.append("title", title);
    formdata.append("description", description);

    axios
      .post(`${BACKEND_BASE_URL}/api/v1/admin/photo-gallery/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
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
    e.preventDefault();
  };

  return (
    <div className="page-wrapper">
      <div className="breadcrumb-wrapper d-flex">
        <Breadcrumb>
          <Breadcrumb.Item as={Link} to="admin" className="breadcrumb-item">
            Dashboard
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Upload Image</Breadcrumb.Item>
        </Breadcrumb>
        <div className="ms-auto breadcrumb-item">
          <Link to="/admin/images">All Image</Link>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-body">
          <div>
            <div className="mt-5">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleImageGallery}
              >
                <span className="top-border"></span>
                <div className="form-header py-2">
                  <h5 className="form-title">Upload Image</h5>
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
                      Image title
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="image title"
                      // value={newTitle}
                      ref={imageTitle}
                    />
                    <Form.Control.Feedback type="invalid">
                      {}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustom01"
                    className="mb-3"
                  >
                    <Form.Label className="label-title fw-bold">
                      Image Link
                    </Form.Label>

                    {/* <Form.Control required type="file" ref={imageLink} /> */}

                    <input
                      required
                      type="file"
                      className="form-control"
                      name="upload_file"
                      onChange={handleInputChange}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please choose an image
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
                      ref={imageDesc}
                      config={config}
                      tabIndex={1}
                      value={descValue}
                    />
                    {/* <Form.Control as="textarea" rows={5} ref={imageDesc} /> */}
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

      {/* <JoditEditor onKeyUp={textInputChange} />
      <br /> */}
      {/* <div>{Parcer(value)}</div> */}
    </div>
  );
};

export default AddImage;
