import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const Products = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country Flag",
      selector: (row) => (
        <img width={80} height={50} src={row.flag} alt={row.flag} />
      ),
    },
    {
      name: "Action",
      cell: (row) => [
        <>
          <Link to="/dashboard/edit-category">
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
          <IconButton>
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
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredItems(result);
  }, [search]);

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // override the row height
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

  return <>
  <div className="product-wrapper">
    <div className="breadcrumb">
      <div className="breadcrumb-item">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/viewproduct" className="before">
          All Product
        </Link>
      </div>
    </div>

    <div className="col-md-12 mt-3">
      <div className="card">
        <div className="card-body">
          <div className="col-lg-12">
            <span className="top-border"></span>

            <div className="card p-2">
              <div className="card-header">
                <h5 className="card-title mb-0">Product</h5>
                <hr />
              </div>
            </div>
            <DataTable
              title="Country List"
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
      </div>
    </div>
  </div>
</>;
};

export default Products;
