import axios from "axios";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

import { IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { BACKEND_BASE_URL } from "../../../../Components/globalVariables";

import Parser from "react-html-parser";
import Swal from "sweetalert2";
import ReactYoutubePlayer from "react-player";

const AllVideo = () => {
  const [videos, setVideos] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  

  //  Modal Section Data
  const [modalShow, setModalShow] = useState(false);
  const [videoModalShow, setVideoModalShow] = useState(false);
  const [url, setUrl] = useState();
  const [singleVideoValue, setSingleVideoValue] = useState([]);

  //  Delete Row
  const deleteRow = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "green",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    if (isConfirm) {
      axios
        .delete(`${BACKEND_BASE_URL}/api/v1/admin/video-gallery/${id}/delete`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          renderAllVideo();
        });
    }
  };

  // Show Video Modal Func
  const videoShow = (videoUrl) => {
    setVideoModalShow(true);
    setUrl(videoUrl);
  };

  // View single video
  const showSingleVideoData = (id) => {
    axios
      .get(`${BACKEND_BASE_URL}/api/v1/admin/video-gallery/${id}/show`)
      .then((res) => {
        setSingleVideoValue(res.data.video_gallery);
        setModalShow(true);
      });
  };

  // Get All Video
  const renderAllVideo = async () => {
    try {
      await axios 
        .get(`${BACKEND_BASE_URL}/api/v1/admin/video-gallery`)
        .then((res) => {
          setVideos(res.data.videos);
          setFilteredItems(res.data.videos);


          console.log(res.data.videos);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Column Data
  const columns = [
    {
      name: '#',
      cell: (row, index) => index + 1  //RDT provides index by default
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "Video",
      selector: (row) => (
        <div
          style={{
            padding: "2px 8px",
            backgroundColor: "red",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          <PlayIcon
            fontSize="large"
            sx={{
              color: "white",
            }}
            onClick={() => {
              videoShow(row.video);
            }}
          />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => [
        <>
          <IconButton onClick={() => showSingleVideoData(row.id)}>
            <VisibilityIcon
              sx={{
                color: "white",
                backgroundColor: "#141414",

                padding: "2px 4px",
                borderRadius: 1,
              }}
            />
          </IconButton>
          <Link to={`/admin/edit-video/${row.id}`}>
            <IconButton>
              <EditIcon
                sx={{
                  color: "white",
                  backgroundColor: "#32cb3a",

                  padding: "2px 4px",
                  borderRadius: 1,
                }}
              />
            </IconButton>
          </Link>
          <IconButton onClick={() => deleteRow(row.id)}>
            <DeleteForeverIcon
              sx={{
                color: "white",
                backgroundColor: "#c34646",

                padding: "2px 4px",
                borderRadius: 1,
              }}
            />
          </IconButton>
        </>,
      ],
    },
  ];

  useEffect(() => {
    renderAllVideo();
  }, []);

  useEffect(() => {
    const result = videos.filter((video) => {
      return video.title.toLowerCase().match(search.toLowerCase());
    });
    setFilteredItems(result);
  }, [search]);

  // Table custom styling
  const customStyles = {
    rows: {
      style: {
        minHeight: "80px", // override the row height
        fontSize: "16px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
    pagination: {
      style: {
        fontSize: "16px",
        color: "grey",
      },
    },
  };

  return (
    <div className="page-wrapper">
      <Breadcrumb className="breadcrumb-wrapper">
        <Breadcrumb.Item as={Link} to="admin" className="breadcrumb-item">
          Dashboard
        </Breadcrumb.Item>

        <Breadcrumb.Item active>All Video</Breadcrumb.Item>
      </Breadcrumb>
      <div className="admin-card">
        <div className="admin-card-body">
          <div className="row">
            {/* {result.map((data, index) => (
              <>
                <div className="col-md-6 col-lg-4 col-xl-3 mt-5">
                  <h4>{data.title}</h4>
                  <div className="img-title">{data.title}</div>
                  <div>
                    <img src={`https://rrkabel.trodad.com` + data.image} alt="" />
                  </div>
                  <p className="lead">{data.desc}</p>
                </div>
              </>
            ))} */}
            <DataTable
              title="Video List"
              columns={columns}
              data={filteredItems}
              customStyles={customStyles}
              pagination
              sortIcon={<SortIcon />}
              // fixedHeader
              // fixedHeaderScrollHeight="700px"
              defaultSortField
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search Here..."
                  className=" w-25 form-control "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
              // subHeaderAlign="left"
            />
          </div>
        </div>

        {/* View Modal */}
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {singleVideoValue.title}
            </Modal.Title>
            <Button
              className="btn-close-white"
              onClick={() => setModalShow(false)}
            >
              X
            </Button>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-2">
              <ReactYoutubePlayer url={singleVideoValue.video} />
            </div>
            {Parser(singleVideoValue.description)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Video Showing Modal */}
        <Modal
          show={videoModalShow}
          size="lg"
          aria-labelledby="video-open-modal"
          centered
        >
          <Modal.Header>
            <Modal.Title id="video-open-modal">
              {singleVideoValue.title}
            </Modal.Title>
            <Button
              className="btn-close-white"
              onClick={() => setVideoModalShow(false)}
            >
              X
            </Button>
          </Modal.Header>
          <Modal.Body>
            <div className="ps-5 m-auto">
              <ReactYoutubePlayer url={url} />
            </div>
            {Parser(singleVideoValue.description)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setVideoModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AllVideo;
