import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputLabel } from "@mui/material";

import "./add-product.css";

const AddProduct = () => {
  const top10Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
  ];
  return (
    <>
      <div className="product-wrapper">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/addproduct">
              Add Product
            </Link>
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
                <form>
                  <div className="card p-2">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Add Product</h5>
                      <hr />
                    </div>
                  </div>
                  <div className="row py-3">
                    {/* Category Name */}
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <div>
                          <InputLabel required className="label fw-bold">
                            Product Name
                          </InputLabel>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=" Product Name"
                            name="Main_name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* Select Section */}
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        {/* <div>
                            <InputLabel required className="label fw-bold">
                              Select Section
                            </InputLabel>
                          </div>
                          <Select options={top10Films} /> */}
                        <div>
                          <InputLabel
                            required
                            className="label fw-bold"
                            id="section-lebel"
                          >
                            Select Section
                          </InputLabel>
                          <Autocomplete
                            id="section"
                            options={top10Films}
                            sx={{
                              width: 1,
                              ":focus": {
                                borderColor: "#7367f0",
                              },
                            }}
                            size="small"
                            renderInput={(params) => (
                              <TextField {...params} label="Section" />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Category Level */}
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <div>
                          <InputLabel
                            id="main-category-label"
                            required
                            className="label fw-bold "
                          >
                            Select Category Level
                          </InputLabel>
                          <Autocomplete
                            id="category"
                            options={top10Films}
                            sx={{
                              width: 1,
                            }}
                            size="small"
                            renderInput={(params) => (
                              <TextField {...params} label="Main Category" />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Category Image */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <div>
                          <label className="label fw-bold">Product Image</label>
                        </div>
                        <div className=" image-file">
                          <input
                            type="file"
                            className="form-control"
                            placeholder="Main Category Image"
                            name="Main Image"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* Category Discount */}
                    <div className="col-md-12 mt-2">
                      <div className="form-group mb-3">
                        <div>
                          <InputLabel className="label fw-bold">
                            Product Discount
                          </InputLabel>
                        </div>
                        <div>
                          <input
                            type="number"
                            min="0"
                            className="form-control"
                            placeholder="0"
                            name="Main_name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group"></div>
                    </div>
                    {/* Submit button */}
                    <button
                      type="submit"
                      className="btn-submit mt-5 rounded-3 border-0"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="copyright mt-5">
                  <p>Copyright &copy; 2022 Gastronomic. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
