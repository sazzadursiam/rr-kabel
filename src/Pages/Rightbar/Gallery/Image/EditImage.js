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

const EditImage = () => {
  const imageDesc = useRef();
  const { id } = useParams();

  // const [imageGalleryInfo, setImageGalleryInfo] = useState({});

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageLink, setImageLink] = useState();

  const [userInfo, setuserInfo] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
    });
  };

  const fetchImage = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/api/v1/admin/photo-gallery/${id}/edit`)
      .then((data) => {
        console.log(data);
        const { title, description, image } = data.data.single_photo;
        setTitle(title);
        setDescription(description);
        setImageLink(image);
      });
  };
  useEffect(() => {
    fetchImage();
  }, []);
  // console.log("Title", imageGalleryInfo);

  const updateImageGallery = (e) => {
    // const title = imageTitle.current.value;
    const description = imageDesc.current.value;

    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("image", userInfo.file);
    formdata.append("title", title);
    formdata.append("description", description);
    // console.log(formdata);
    axios
      .post(
        `${BACKEND_BASE_URL}/api/v1/admin/photo-gallery/${id}/update`,
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
        fetchImage();
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

          <Breadcrumb.Item active>Edit Image</Breadcrumb.Item>
        </Breadcrumb>
        <div className="ms-auto breadcrumb-item">
          <Link to="/admin/AllImage">All Image</Link>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-body">
          <div>
            <div className="mt-5">
              <Form onSubmit={updateImageGallery}>
                <span className="top-border"></span>
                <div className="form-header py-2">
                  <h5 className="form-title">Edit Image</h5>
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
                      // value={imageGalleryInfo.title}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      // ref={imageTitle}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose an image
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
                      type="file"
                      className="form-control"
                      name="upload_file"
                      onChange={handleInputChange}
                    />
                    <img
                      width={80}
                      height={50}
                      src={`${BACKEND_BASE_URL}${imageLink}`}
                      alt={title}
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
                      // value={imageGalleryInfo.description}
                      value={description}
                      // onChange={(e)=>{
                      //   setDescription(e.target.value);
                      // }}
                    />
                    {/* <Form.Control as="textarea" rows={5} ref={imageDesc} /> */}
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

      {/* <JoditEditor onKeyUp={textInputChange} />
      <br /> */}
      {/* <div>{Parcer(value)}</div> */}
    </div>
  );
};

export default EditImage;
