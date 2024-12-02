import React, { useEffect, useState } from "react";
import "./EmployeeForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getEmployeeById,
  updateEmployee,
  updateName,
} from "../../Redux/Actions/employeeAction";
import Loader from "../../components/Loader/Loader";
import { Container } from "@mui/material";

function EmployeeForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, details } = useSelector((state) => state);
  const { data, isUpdateLoading } = useSelector((state) => state.updateEmpl);

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    image: "",
    age: "",
    salary: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getIdFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("id");
  };
  const id = getIdFromUrl();

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (details?.data) {
      setFormData({
        fullName: details.data.fullName || "",
        email: details.data.email || "",
        phone: details.data.phone || "",
        image: details.data.image || "",
        age: details.data.age || "",
        salary: details.data.salary || "",
      });
    }
  }, [details]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: "https://www.w3schools.com/howto/img_avatar2.png" });
    setImage(file);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.image) {
      newErrors.image = "An image file is required.";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (formData.age <= 0) {
      newErrors.age = "Age must be a positive number.";
    }

    if (!formData.salary) {
      newErrors.salary = "Salary is required.";
    } else if (formData.salary <= 0) {
      newErrors.salary = "Salary must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (id) {
        dispatch(updateEmployee(id, formData, navigate));
        dispatch(updateName(formData?.fullName));
      } else {
        dispatch(addEmployee(formData, navigate));
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleChange(e);
              }
            }}
            placeholder="Enter your phone number"
            maxLength="10"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label>Image File</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
          {errors.image && <p className="error">{errors.image}</p>}
          <div className="preview">
            {image !== null ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            ) : (
              <img
                src={formData?.image}
                alt="Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                handleChange(e);
              }
            }}
            placeholder="Enter your age"
            min="0"
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                handleChange(e);
              }
            }}
            placeholder="Enter your salary"
            min="0"
          />
          {errors.salary && <p className="error">{errors.salary}</p>}
        </div>

        <button type="submit" disabled={isUpdateLoading}>
          {isUpdateLoading ? (
            <div className="button-loader"></div>
          ) : id ? (
            "Update"
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </Container>
  );
}

export default EmployeeForm;
