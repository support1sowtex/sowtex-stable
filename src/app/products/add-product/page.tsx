"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import MultiSelect, { Option } from "../../components/MultiSelect";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AdminMenu from "../../components/AdminMenu";
import Swal from "sweetalert2";

export default function Sidebar() {
  const options = [
    { value: 0, label: "Red" },
    { value: 1, label: "Green" },
    { value: 2, label: "Blue" },
    { value: 3, label: "Orange" },
    { value: 4, label: "Yellow" },
    { value: 5, label: "Pink" },
  ];
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/organization?q=${query}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching suggestions", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (item) => {
    setQuery(item.label);
    setFormData({...formData, behalfOf: item.label}); 
    setSuggestions([]);
    // onSelect(item); // Now always safe
  };
  const [optionSelected, setSelected] = useState<Option[] | null>();
  const handleChange = (selected: Option[]) => {
    // console.log(sele)

    setSelected(selected);
    console.log(selected);
  };

  const router = useRouter();
  const [formData, setFormData] = useState({
    behalfOf: "",
    cat: "0",
    sub_cat: "",
    sku: "",
    colors: [],
    moq: "",
    content: "",
    listing: "Select",
    description: "",
    costing: "",
    teamview: false,
    certifications: [],
    sizes: [],
  });

  const [categories, setCategories] = useState([
    { value: "0", label: "All Category" },
  ]);
  const [subCategories, setSubCategories] = useState([
    { value: "", label: "Select" },
  ]);
  const [colorOptions, setColorOptions] = useState([]);
  const [certificationOptions, setCertificationOptions] = useState([
    "BCI",
    "Birla Modal",
    "Birla Viscose",
    "CmiA",
    "ECOVERO™",
    "FSC",
    "Fairtrade",
    "GOTS",
    "GRS",
    "ISO",
    "Livaeco",
    "OCS",
    "OEKO-TEX®",
    "RCS",
    "REACH",
    "SA 8000",
    "Supima®",
    "TENCEL™",
    "WRAP",
    "ZDHC",
  ]);
  const [units, setUnits] = useState([
    { value: "63", label: "Air Textured Yarn(ATY)" },
    { value: "55", label: "Boxes(Bxs)" },
    { value: "11", label: "Centimeters(Cm)" },
    // ... other unit options
  ]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  // Load categories (mock API call)
  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();

      // Add "All Category" option manually
      setCategories([{ value: "0", label: "All Category" }, ...data]);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };
  const removeImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previewImages];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  // Load subcategories based on selected category
  const loadSubCategories = async (catId) => {
    if (catId === "0") {
      setSubCategories([{ value: "", label: "Select" }]);
      return;
    }

    // In a real app, you would fetch this from your API

    const mockSubCategories = [
      { value: "376", label: "Beach Wear" },
      { value: "684", label: "Cardigans" },
      { value: "1089", label: "Designer Mask" },
      { value: "421", label: "Ethnic Wear" },
      { value: "1086", label: "Fashion Face Mask" },
      { value: "739", label: "Leggings" },
      { value: "1027", label: "Saree" },
      { value: "529", label: "Shawls" },
      { value: "1090", label: "Sports Mask" },
      { value: "679", label: "Stoles" },
      { value: "244", label: "Swim Wear" },
      { value: "1046", label: "Western Skirts" },
      { value: "1045", label: "Western Wear" },
      { value: "291", label: "Women Allied (Others)" },
      { value: "1019", label: "Women Bottoms" },
      { value: "365", label: "Women Denim Wear" },
      { value: "242", label: "Women Dresses" },
      { value: "375", label: "Women Formals" },
      { value: "363", label: "Women Intimate Wears" },
      { value: "625", label: "Women Jackets" },
      { value: "1101", label: "Women Night Wear" },
      { value: "1026", label: "Women Socks" },
      { value: "361", label: "Women Sports Wear" },
      { value: "685", label: "Women Sweater" },
      { value: "243", label: "Women Tops" },
    ];
    setSubCategories([{ value: "", label: "Select" }, ...mockSubCategories]);
  };

  // Load color options (mock API call)
  const loadColorOptions = async () => {
    // In a real app, you would fetch this from your API
    const mockColors = ["Red", "Blue", "Green", "Black", "White"];
    setColorOptions(mockColors);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      colors: colorOptions,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle color selection
  const handleColorChange = (color, isChecked) => {
    if (isChecked) {
      setFormData({
        ...formData,
        colors: [...formData.colors, color],
      });
    } else {
      setFormData({
        ...formData,
        colors: formData.colors.filter((c) => c !== color),
      });
    }
  };

  // Handle certification selection
  const handleCertificationChange = (cert, isChecked) => {
    if (isChecked) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, cert],
      });
    } else {
      setFormData({
        ...formData,
        certifications: formData.certifications.filter((c) => c !== cert),
      });
    }
  };

  // Add size to the form
  const addSize = () => {
    if (!sizeInput || !selectedUnit) {
      alert("Please enter both size and select a unit");
      return;
    }

    const unit = units.find((u) => u.value === selectedUnit);
    const match = unit.label.match(/\(([^)]+)\)/);
    const shortForm = match ? match[1] : "";
    const sizeLabel = `${sizeInput} ${shortForm}`;

    setFormData({
      ...formData,
      sizes: [
        ...formData.sizes,
        { value: sizeInput, unit: selectedUnit, label: sizeLabel },
      ],
    });

    setSizeInput("");
    setSelectedUnit("");
  };

  // Remove size from the form
  const removeSize = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };

  // Handle file upload
  const MAX_FILES = 4;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > MAX_FILES) {
      const remainingSlots = MAX_FILES - files.length;
      alert(
        `You can only upload up to ${MAX_FILES} images. You can add ${remainingSlots} more.`
      );
      selectedFiles.splice(remainingSlots); // Trim extra files
    }

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFiles([...files, ...selectedFiles]);
    setPreviewImages([...previewImages, ...newPreviews]);

    // Reset input value to allow re-selecting the same file again
    e.target.value = null;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.behalfOf) newErrors.behalfOf = "On behalf of is required";
    if (formData.cat === "0") newErrors.cat = "Category is required";
    if (!formData.sub_cat) newErrors.sub_cat = "Subcategory is required";
    if (!formData.sku) newErrors.sku = "Article number is required";
    if (optionSelected.length === 0)
      newErrors.colors = "At least one color/finish is required";
    if (!formData.moq) newErrors.moq = "MOQ is required";
    if (!formData.content) newErrors.content = "Content is required";
    if (formData.listing === "Select")
      newErrors.listing = "Listing type is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (files.length === 0) newErrors.files = "Image upload is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formPayload = new FormData();

      // Append regular form data
      formPayload.append("formData", JSON.stringify(formData));

      // Append files
      files.forEach((file, index) => {
        formPayload.append(`files`, file);
      });
      if (optionSelected) {
        const colorNames = optionSelected.map((option) => option.label); // Extract just the labels (color names)
        formPayload.append("selectedOptions", JSON.stringify(colorNames));
      }
      for (let [key, value] of formPayload.entries()) {
        console.log(`${key}:`, value);
      }

      // document.body.classList.add('waiting');
      const response = await fetch("/api/add-products", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) throw new Error("Failed to submit product");
      document.body.classList.remove("waiting");
      const result = await response.json();
      // Swal.fire({
      //           title: 'Success!',
      //           text: 'Product added successfully!',
      //           icon: 'success',
      //           confirmButtonText: 'Cool'
      //         });

      // Optionally redirect
      // router.push("/control-panel/manage-products");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadColorOptions();
  }, []);

  return (
    <>
      <div className="onload-div">
        <img
          src="https://sowtex.com/assets/admin/images/waiting-image.gif"
          alt=""
        />
      </div>
      <AdminMenu></AdminMenu>
      <div id="main" style={{ marginLeft: "220px" }}>
        <div className="container-fluid">
          <section className="card top">
            <div className="card-body">
              <div className="row d-flex align-items-center">
                <div className="col-md-6">
                  <div className="pageTitle">Add Product</div>
                </div>
                <div className="col-md-6 align-self-end text-end">
                  <Link href="#" onClick={() => router.back()}>
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>{" "}
                    Back
                  </Link>
                  <br />
                  <div className="breadcrumbBox">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link href="/control-panel/dashboard">
                            <i className="fa fa-home" aria-hidden="true"></i>
                          </Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link href="/control-panel/manage-products">
                            Product
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Add Product
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card content">
            <div className="card-body adminProductBody px-lg-3 px-0">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="row">
                    <div className="col-sm-4 col-md-4">
                      <div className="mb-2 autocomplete relative">
                        <label>On behalf of</label>
                       <input
  type="text"
  className="form-control rounded-0"
  id="behalfOf"
  placeholder="Company"
  name="behalfOf"  // Change from "bahalf" to "behalfOf"
  value={query}
  onChange={(e) => {
    setQuery(e.target.value);
    setFormData({...formData, behalfOf: e.target.value});
  }}
  autoComplete="off"
/>
                        <div className="autocomplete-items absolute bg-white border w-full z-10">
                          {suggestions.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelect(item)}
                              className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                            >
                              {item.label}
                            </div>
                          ))}
                        </div>
                         {errors.behalfOf && (
                        <div className="text-danger">{errors.behalfOf}</div>
                      )}
                      </div>
                    </div>
                    <div className="col-sm-2 col-md-2">
                      <button
                        type="button"
                        style={{ marginTop: "29px" }}
                        className="btn btn-info"
                        onClick={loadCategories}
                      >
                        Load Category
                      </button>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Select Category</label>
                      <select
                        name="cat"
                        id="cat"
                        className={`form-select rounded-0 ${
                          errors.cat ? "is-invalid" : ""
                        }`}
                        value={formData.cat}
                        onChange={(e) => {
                          handleInputChange(e);
                          loadSubCategories(e.target.value);
                        }}
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      {errors.cat && (
                        <div className="text-danger">{errors.cat}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Select Sub Category</label>
                      <select
                        name="sub_cat"
                        id="sub_cat"
                        className={`form-select rounded-0 ${
                          errors.sub_cat ? "is-invalid" : ""
                        }`}
                        value={formData.sub_cat}
                        onChange={handleInputChange}
                      >
                        {subCategories.map((subCat) => (
                          <option key={subCat.value} value={subCat.value}>
                            {subCat.label}
                          </option>
                        ))}
                      </select>
                      {errors.sub_cat && (
                        <div className="text-danger">{errors.sub_cat}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Add Article Number</label>
                      <input
                        type="text"
                        className={`form-control rounded-0 ${
                          errors.sku ? "is-invalid" : ""
                        }`}
                        name="sku"
                        placeholder=""
                        id="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                      />
                      {errors.sku && (
                        <div className="text-danger">{errors.sku}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label>*Color/Finish</label>
                    <div className="App">
                      <MultiSelect
                        key="example_id"
                        options={options}
                        onChange={handleChange}
                        value={optionSelected}
                        isSelectAll={true}
                        menuPlacement={"bottom"}
                      />
                      {errors.colors && (
                        <div className="text-danger">{errors.colors}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Minimum Order Quantity</label>
                      <input
                        type="text"
                        className={`form-control rounded-0 ${
                          errors.moq ? "is-invalid" : ""
                        }`}
                        name="moq"
                        id="moq"
                        placeholder="Value"
                        value={formData.moq}
                        onChange={handleInputChange}
                      />
                      {errors.moq && (
                        <div className="text-danger">{errors.moq}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Content</label>
                      <input
                        type="text"
                        className={`form-control rounded-0 ${
                          errors.content ? "is-invalid" : ""
                        }`}
                        name="content"
                        id="content"
                        placeholder=""
                        value={formData.content}
                        onChange={handleInputChange}
                      />
                      {errors.content && (
                        <div className="text-danger">{errors.content}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Select Listing</label>
                      <select
                        className={`form-select ${
                          errors.listing ? "is-invalid" : ""
                        }`}
                        name="listing"
                        id="listing"
                        value={formData.listing}
                        onChange={handleInputChange}
                      >
                        <option value="Select">Select</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                      {errors.listing && (
                        <div className="text-danger">{errors.listing}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6 mb-2">
                    <div className="mb-2">
                      <label>Choose Certification</label>
                      <div
                        className="dropdown"
                        style={{ position: "relative" }}
                      >
                        <i
                          className="fa-solid fa-caret-down fa-xl"
                          style={{
                            color: "rgb(163, 163, 163)",
                            position: "absolute",
                            top: "18px",
                            right: "10px",
                          }}
                          aria-hidden="true"
                        ></i>
                        <input
                          type="text"
                          className="form-control custom-input"
                          placeholder="Select options"
                          id="multiSelectInput"
                          readOnly
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          value={formData.certifications.join(", ")}
                        />
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="multiSelectInput"
                        >
                          {certificationOptions.map((cert) => (
                            <li key={cert}>
                              <label className="dropdown-item">
                                <input
                                  type="checkbox"
                                  className="form-check-input me-2"
                                  value={cert}
                                  checked={formData.certifications.includes(
                                    cert
                                  )}
                                  onChange={(e) =>
                                    handleCertificationChange(
                                      cert,
                                      e.target.checked
                                    )
                                  }
                                />
                                {cert}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row d-flex align-items-start">
                  <div className="col-sm-6 order-last order-md-first">
                    <div className="mb-3">
                      <label>*Description</label>
                      <textarea
                        className={`form-control rounded-0 ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        name="description"
                        id="description"
                        placeholder="Description"
                        style={{ height: "100px" }}
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                      {errors.description && (
                        <div className="text-danger">{errors.description}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label>Image Upload</label>
                      <input
                        id="files"
                        type="file"
                        className={`form-control rounded-0 ${
                          errors.files ? "is-invalid" : ""
                        }`}
                        onChange={handleFileChange}
                        multiple
                        ref={fileInputRef}
                      />
                      {errors.files && (
                        <div className="text-danger">{errors.files}</div>
                      )}
                      <small style={{ marginTop: "6px", display: "block" }}>
                        Image upload required (Size 500 KB &amp; Dimension
                        minimum 480*480 px)
                      </small>
                      <div
                        id="upload-feedback"
                        style={{ marginTop: "6px" }}
                      ></div>
                    </div>

                    {/* <div className="col-12">
                      <div
                        id="sortableImgThumbnailPreview"
                        className="ui-sortable"
                      >
                        {previewImages.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              margin: "5px",
                            }}
                          />
                        ))}
                      </div>
                    </div> */}
                    <div className="col-12">
                      <div
                        id="sortableImgThumbnailPreview"
                        className="d-flex flex-wrap"
                      >
                        {previewImages.map((src, index) => (
                          <div
                            key={index}
                            style={{ position: "relative", margin: "5px" }}
                          >
                            <img
                              alt={`Preview ${index}`}
                              src={src}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 order-first order-md-last">
                    <div className="row">
                      <div className="col-sm-3">
                        <label>Internal Costing</label>
                        <p className="orange-sub-text text-nowrap mt-2">
                          (only Visible in your CRM)
                        </p>
                        <div className="add-product-checkbox text-nowrap">
                          <input
                            type="checkbox"
                            name="teamview"
                            id="teamView"
                            checked={formData.teamview}
                            onChange={handleInputChange}
                          />{" "}
                          Visible to other team user
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control rounded-0"
                          name="costing"
                          id="costing"
                          style={{ height: "100!important" }}
                          value={formData.costing}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row border border-dark mt-2">
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label>Size</label>
                          <input
                            type="number"
                            className="form-control rounded-0"
                            id="size"
                            placeholder="size"
                            min="1"
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3" style={{ marginTop: "30px" }}>
                          <select
                            className="form-select"
                            id="unitOfMeas"
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value)}
                          >
                            <option value="">Select Unit</option>
                            {units.map((unit) => (
                              <option key={unit.value} value={unit.value}>
                                {unit.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3" style={{ marginTop: "30px" }}>
                          <button
                            type="button"
                            className="btn btn-tertiary"
                            id="make_sizes"
                            onClick={addSize}
                          >
                            Add More
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="sizestoadd">
                      {formData.sizes.map((size, index) => (
                        <div
                          key={index}
                          className="div_class mb-1"
                          id={`sizes${index}`}
                          onMouseOver={() => {}}
                          onMouseLeave={() => {}}
                        >
                          {size.label}
                          <div
                            className="handleSizeContainer"
                            onClick={() => removeSize(index)}
                            id={`uomOutdiv_${index}`}
                          >
                            ×
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <button
                      className="btn btn-blue-btn"
                      type="submit"
                      id="add_button"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .div_class {
          width: 75px;
        }

        .div_class:hover {
          background: #ccc;
        }

        .dropdown-menu {
          height: 300px;
          width: 100%;
          overflow-y: scroll;
        }
        .div_class {
          background: #0d6efd;
          color: #fff;
          height: 30px;
          padding-left: 15px;
          padding-right: 15px;
          line-height: 30px;
          width: auto;
          display: inline-block;
          position: relative;
        }
        .waiting .onload-div {
          position: fixed;
          top: 0;
          left: 0;
          background-color: #fff;
          z-index: 999999;
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .waiting .onload-circle {
          margin: 70px auto;
          width: 15vw;
          height: 15vw;
          border: 10px solid rgb(189 189 189 / 27%);
          border-radius: 50%;
          border-top-color: #fcb040;
          animation: spin 1s linear infinite;
          position: fixed;
          max-width: 200px;
          max-height: 200px;
        }
      `}</style>
    </>
  );
}
