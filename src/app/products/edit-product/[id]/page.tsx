"use client";
import AdminMenu from "../../../components/AdminMenu";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import dynamic from "next/dynamic";
const MultiSelect = dynamic(() => import("../../../components/MultiSelect"), {
  ssr: false,
});
import "bootstrap/dist/css/bootstrap.min.css";
export default function EditProducts() {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedOption, setSelectedOption] = useState("");
  const [certifiedFabrics, setCertifiedFabrics] = useState(false);
  const [latestDesign, setLatestDesign] = useState(false);
  const [sizeInput, setSizeInput] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [productData,setProducts]=useState([]);
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
  const [categories, setCategories] = useState([
    { value: "0", label: "All Category" },
  ]);
  const [subCategories, setSubCategories] = useState([
    { value: "", label: "Select" },
  ]);
  const [units, setUnits] = useState([
    { value: "63", label: "Air Textured Yarn(ATY)" },
    { value: "55", label: "Boxes(Bxs)" },
    { value: "11", label: "Centimeters(Cm)" },
  ]);

  const options = [
    { value: 0, label: "Red" },
    { value: 1, label: "Green" },
    { value: 2, label: "Blue" },
    { value: 3, label: "Orange" },
    { value: 4, label: "Yellow" },
    { value: 5, label: "Pink" },
  ];

  const handleReset = () => {
    setSelectedOption("");
    setCertifiedFabrics(false);
    setLatestDesign(false);
  };
  type Option = {
    label: string;
    value: string;
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      colors: colorOptions,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // const [optionSelected, setSelected] = useState<Option[] | null>();

  const handleChange = (selected: Option[]) => {
    //setSelected(selected);
    console.log(selected);
  };
  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories([{ value: "0", label: "All Category" }, ...data]);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };
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
  const removeSize = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };
  const [optionSelected, setOptionSelected] = useState([]);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?id=6848345e852eb118d01fb52f');
      const data = await res.json();

      if (res.ok && data.product) {
        setProducts(data.product);

        // Handle colors: data.product.colors = ["Red,Green"]
        const colorsString = data.product.colors?.[0] || "";
        const colorList = colorsString.split(",").map(c => c.trim());

        // Map to options format: [{ label: "Red", value: "Red" }]
        const selected = options.filter(opt => colorList.includes(opt.label));
        setOptionSelected(selected);
        console.log(selected);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    }
  };

  fetchProducts();
}, []);
  useEffect(() => {
    loadCategories();
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    // loadColorOptions();
  }, []);

  const loadSubCategories = async (catId) => {
    if (catId === "0") {
      setSubCategories([{ value: "", label: "Select" }]);
      return;
    }

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
  const removeImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previewImages];

    // Revoke the object URL to free memory
    URL.revokeObjectURL(newPreviews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviewImages(newPreviews);
  };
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
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.behalfOf) newErrors.behalfOf = "On behalf of is required";
    if (formData.cat === "0") newErrors.cat = "Category is required";
    if (!formData.sub_cat) newErrors.sub_cat = "Subcategory is required";
    if (!formData.sku) newErrors.sku = "Article number is required";
  
    if (optionSelected?.length === 0)
      newErrors.colors = "At least one color/finish is required";
    if (!formData.moq) newErrors.moq = "MOQ is required";
    if (!formData.content) newErrors.content = "Content is required";
    if (formData.listing === "Select")
      newErrors.listing = "Listing type is required";
    if (!formData.description)
      newErrors.description = "Description is required";
     // else{newErrors.description = ""; }
    if (files.length === 0) newErrors.files = "Image upload is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formPayload = new FormData();
      formPayload.append("formData", JSON.stringify(formData));

      files.forEach((file, index) => {
        formPayload.append(`files`, file);
      });
      
      if (optionSelected) {
        const colorNames = optionSelected.map((option) => option.label);
        formPayload.append("selectedOptions", JSON.stringify(colorNames));
      }

      for (let [key, value] of formPayload.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch("/api/add-products", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) throw new Error("Failed to submit product");
      const result = await response.json();
      
      console.log("Product added successfully:", result);

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const fileInputRef = useRef(null);
  const MAX_FILES = 4;
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > MAX_FILES) {
      const remainingSlots = MAX_FILES - files.length;
      alert(
        `You can only upload up to ${MAX_FILES} images. You can add ${remainingSlots} more.`
      );
      selectedFiles.splice(remainingSlots);
    }

    const newPreviews = selectedFiles
      .filter((file) => file)
      .map((file) => URL.createObjectURL(file as File));

    setFiles([...files, ...selectedFiles]);
    setPreviewImages([...previewImages, ...newPreviews]);

    e.target.value = null;
  };
  

  return (
    <>
      <div id="main" style={{ marginLeft: "220px" }}>
        <AdminMenu></AdminMenu>
        <div> <form onSubmit={handleSubmit}>
          <div className="container-fluid">
            <section className="card top">
              <div className="card-body">
                <div className="row d-flex align-items-center">
                  <div className="col">
                    <div className="page-title">Edit Product</div>
                  </div>
                  <div className="col align-self-end text-end">
                    <a href="">
                      <i
                        className="fa fa-angle-double-left"
                        aria-hidden="true"
                      ></i>{" "}
                      Back
                    </a>
                    <div className="breadcrumb-box">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a href="#">
                              <i className="fa fa-home" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li className="breadcrumb-item">
                            <a href="#">Product</a>
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            Edit Product
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="content card text-start">
              <div className="card-body px-0 admin-product-body">
                <div className="row">
                  <div className="col-sm-6">
                    <label>Product Code</label>
                    <input
                      type="text"
                      defaultValue=" S01LF00215"
                      className="mb-3"
                       
                        onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-sm-6 " style={{ color: "goldenrod" }}>
                    <label
                      className="text-center w-100 border-bottom pb-1 "
                      style={{ color: "goldenrod" }}
                    >
                      *Addtional Services{" "}
                    </label>
                    <div className="row ">
                      <div className="col-12  d-flex align-items-center justify-content-around">
                        <div style={{ display: "inline-block" }}>
                          <input
                            type="checkbox"
                            id="certi_fabrics"
                            defaultValue="Y"
                            checked={certifiedFabrics}
                            onChange={(e) =>
                              setCertifiedFabrics(e.target.checked)
                            }
                          />
                          Certified Fabrics
                        </div>
                        <div style={{ display: "inline-block" }}>
                          <input
                            type="checkbox"
                            id="lat_des"
                            defaultValue="Y"
                            checked={latestDesign}
                            onChange={(e) => setLatestDesign(e.target.checked)}
                          />
                          Latest Design
                        </div>

                        <div style={{ display: "inline-block" }}>
                          <input
                            type="radio"
                            name="featuredorGold"
                            id="featured"
                            checked={selectedOption === "featured"}
                            onChange={() => setSelectedOption("featured")}
                          />{" "}
                          Featured
                        </div>
                        <div
                          style={{ display: "inline-block", marginLeft: "5px" }}
                        >
                          <input
                            type="radio"
                            name="featuredorGold"
                            id="gold"
                            checked={selectedOption === "gold"}
                            onChange={() => setSelectedOption("gold")}
                          />{" "}
                          Gold
                        </div>

                        <input
                          type="button"
                          id="rem_g_f"
                          className="btn btn-outline-danger"
                          value="Reset"
                          onClick={handleReset}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Select Category</label>

                      <input type="text" defaultValue={"Womens Fabric"} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Select Sub Category</label>
                      <input type="text" defaultValue={"Botton Fabric"} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>Add Article Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sku"
                        placeholder=""
                        value={productData.sku}
                        id="sku"
                         onChange={handleInputChange}
                      />
                       {errors.sku && (
                        <div className="text-danger">{errors.sku}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control rounded-0"
                      name="description"
                      id="description"
                      placeholder="Write Company Profile"
                      onChange={handleInputChange}
                      value={productData.description} 
                    />
                     {errors.description && (
                        <div className="text-danger">{errors.description}</div>
                      )}
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>Content</label>
                      <input
                        type="text"
                        className="form-control"
                        name="content"
                        id="content"
                        placeholder="" onChange={handleInputChange}
                        value={productData.content}
                      />
                       {errors.content && (
                        <div className="text-danger">{errors.content}</div>
                      )}
                      <div id="content_error" className="error"></div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label>*Select Color/Finish</label>
                      <MultiSelect
                        key="example_id"
                        options={options}
                      
                        value={optionSelected}
                         onChange={setOptionSelected}
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
                        value={productData.moq}
                        onChange={handleInputChange}
                      />
                      {errors.moq && (
                        <div className="text-danger">{errors.moq}</div>
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
                          aria-expanded="true"
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
                  <div className="row d-flex align-items-start">
                    <div className="col-sm-6 order-last order-md-first">

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
                </div>
              </div>
            </section>
          </div>
          </form>
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
