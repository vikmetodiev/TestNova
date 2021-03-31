import React, { useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import PageMainHeader from "../public/PageMainHeader";
import { Col, Container, Row } from "reactstrap";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import validator from "validator";
import ReCAPTCHA from "react-google-recaptcha";
import BookPageModal from "../public/BookPageModal.js";
import Cookies from "universal-cookie";
import axios from "axios";
import { useRootStore } from "../provider";
const cookies = new Cookies();
let date = new Date();
let minutes = date.getMinutes();
let expiry = date.setTime(date.getTime() + minutes * 60 * 1000);

if (date.toLocaleDateString() !== cookies.get("Time")) {
  cookies.set(
    "Time",
    new Date().toLocaleDateString(),
    { path: "/" },
    { expires: expiry }
  );
}

if (isNaN(cookies.get("Counter"))) {
  cookies.set("Counter", 0, { path: "/" });
}
const BookPage = () => {
  const store = useRootStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedArea, setSelectedArea] = useState("E-commerce");
  const [openModal, setOpenModal] = useState(false);
  const [captcha, setCaptcha] = useState(false);

  const showMessage = () => {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  };

  const handleAdditionalTextChange = (event) => {
    setFeedback(event.target.value);
  };

  const toggle = () => {
    setOpenModal(!openModal);
  };

  const handleSubmit = (event) => {
    debugger;
    if (event && captcha) {
      if (date.toLocaleDateString() === cookies.get("Time")) {
        cookies.set("Counter", parseInt(cookies.get("Counter")) + 1, {
          path: "/",
        });
      }
      setCaptcha(false);
      if (email.length > 0 && name.length > 0 && companyName.length > 0) {
        var bodyFormData = new FormData();
        let message = feedback.length > 0 ? feedback : "Not provided";
        let phoneNum = phone.length > 0 ? phone : "Not provided";
        bodyFormData.append("email", email);
        bodyFormData.append(
          "body",
          `${
            "Hello <br>" +
            "You got a new message from: " +
            name +
            "<br> Company: " +
            companyName +
            "<br> Selected Area: " +
            selectedArea +
            "<br> Phone: " +
            phoneNum +
            "<br> E-mail: " +
            email +
            "<br> Details: " +
            message +
            "<br> Novarto Team"
          }`
        );
        bodyFormData.append("subject", "Discovery Session");
        axios
          .post("https://novarto.com/ws/webform.php", bodyFormData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((response) => {
            setOpenModal(true);
            setCaptcha(false);
          })
          .catch((e) => {
            setOpenModal(true);
            setCaptcha(false);
          });
      }
    }
  };

  const phoneHandler = (e) => {
    if (
      !!/^\+?([0-9\s]+)?$/.test(e.target.value) ||
      /^\s+$/.test(e.target.value)
    ) {
      setPhone(e.target.value);
    }
  };
  showMessage();
  return (
    <div className="page bookPage">
      <PageMainHeader
        stars={
          <div>
            <span className="star-item star-1"></span>
            <span className="star-item star-2"></span>
            <span className="star-item star-3"></span>
            <span className="star-item star-4"></span>
            <span className="star-item star-5"></span>
            <span className="star-item star-6"></span>
          </div>
        }
        bgcolor={"light-blue-bg"}
        header={store.translations.booknow_title}
        // title={this.store.translations.locations_subtitle}
        imageleft={
          <img
            src="/images/illustrations/bookNow-left.png"
            alt=""
            className="image image-left"
          />
        }
        imageright={
          <img
            src="/images/illustrations/bookNow-right.png"
            alt=""
            className="image image-right"
          />
        }
      />
      <Container className="mt-5">
        <ValidationForm
          onSubmit={(e, formData, inputs) => {
            e.preventDefault();

          }}
        >
          <Row>
            <Col md={6} className="mx-auto">
              <p className="h4 dark-blue-text font-weight-normal mb-5">
                {store.translations.bookpage_formtitle}
              </p>

              <div className="form-row input-animation mb-2">
                <TextInput
                  className="form-control mb-1"
                  id="contact-form-name"
                  name="contact-form-name"
                  placeholder=""
                  required
                  errorMessage=" Please, provide your name."
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                />
                <label>
                  <span>Your name*</span>
                </label>
              </div>

              <div className="form-row input-animation mb-2">
                <TextInput
                  className="form-control mb-1"
                  id="contact-form-email"
                  name="contact-form-email"
                  type="email"
                  value={email}
                  placeholder=""
                  validator={validator.isEmail}
                  errorMessage={{ validator: "Please enter a valid email" }}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                />
                <label>
                  <span>Email address*</span>
                </label>
              </div>

              <div className="form-row input-animation mb-2">
                <TextInput
                  className="form-control mb-1"
                  id="contact-form-phone"
                  name="contact-form-phone"
                  placeholder=""
                  onChange={(e) => phoneHandler(e)}
                  value={phone}
                  maxLength={15}
                />
                <label>
                  <span>Phone</span>
                </label>
              </div>

              <div className="form-row input-animation mb-2">
                <TextInput
                  className="form-control mb-1"
                  id="contact-form-company"
                  name="contact-form-company"
                  placeholder=""
                  required
                  errorMessage="Please provide company name."
                  onChange={(e) => setCompanyName(e.target.value)}
                  maxLength={50}
                />
                <label>
                  <span>Company name*</span>
                </label>
              </div>

              <p className="h4 dark-blue-text font-weight-normal mt-5 mb-4 ">
                {store.translations.bookpage_formoptions}
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={11} sm={12} className="mb-5 custom-radio-holder">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="radio1"
                  name="customRadio"
                  className="custom-control-input"
                  value="E-commerce"
                  checked={selectedArea === "E-commerce"}
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                  }}
                />
                <label className="custom-control-label" htmlFor="radio1">
                  <img
                    src="/images/icons/bookFree-ecommerce.png"
                    alt="E-commerce"
                  />
                  <span>E-commerce</span>
                </label>
              </div>
              <div className="custom-control custom-radio d-flex">
                <input
                  type="radio"
                  id="radio2"
                  name="customRadio"
                  className="custom-control-input"
                  value="Product information management"
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                  }}
                />
                <label className="custom-control-label" htmlFor="radio2">
                  <img
                    src="/images/icons/bookFree-pim.png"
                    alt="E-commerce"
                  />
                  <span>Product information management</span>
                </label>
              </div>
              <div className="custom-control custom-radio d-flex">
                <input
                  type="radio"
                  id="radio3"
                  name="customRadio"
                  className="custom-control-input"
                  value="Core Business processes"
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                  }}
                />
                <label className="custom-control-label" htmlFor="radio3">
                  <img
                    src="/images/icons/bookFree-core.png"
                    alt="E-commerce"
                  />
                  <span>Core Business processes</span>
                </label>
              </div>
              <div className="custom-control custom-radio d-flex">
                <input
                  type="radio"
                  id="radio4"
                  name="customRadio"
                  className="custom-control-input"
                  value="Internet of Things"
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                  }}
                />
                <label className="custom-control-label" htmlFor="radio4">
                  <img
                    src="/images/icons/bookFree-iot.png"
                    alt="E-commerce"
                  />
                  <span>Internet of Things</span>
                </label>
              </div>
              <div className="custom-control custom-radio d-flex">
                <input
                  type="radio"
                  id="radio5"
                  name="customRadio"
                  className="custom-control-input"
                  value="Other"
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                  }}
                />
                <label className="custom-control-label" htmlFor="radio5">
                  <img
                    src="/images/icons/bookFree-other.png"
                    alt="E-commerce"
                  />
                  <span>{store.translations.other}</span>
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mx-auto">
              <div className="form-row input-animation">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder=""
                  onChange={handleAdditionalTextChange}
                  maxLength={1000}
                ></textarea>
                <label>
                  <span>Details...</span>
                </label>
                <small className="d-block mt-3">
                  {store.translations.bookpage_formnote}
                </small>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mx-auto">
              <div className="form-group">
                <button
                  className="btn btn-tab btn-send mt-5 px-4"
                  type="submit"
                  onClick={() => {
                    email.length > 0 &&
                    name.length > 0 &&
                    companyName.length > 0
                      ? setCaptcha(true)
                      : "";
                  }}
                >
                  SEND
                </button>

                {captcha && (
                  <ReCAPTCHA
                    style={{ position: "absolute", left: 130, bottom: -9 }}
                    sitekey="6Letr4waAAAAAGiBDVAkqy1sf7vnnFjxrUBFHQUh"
                    onChange={handleSubmit}
                  />
                )}
              </div>
            </Col>
          </Row>
        </ValidationForm>
      </Container>
      <BookPageModal
        modal={openModal}
        modalClass="successModal"
        toggle={toggle}
        message={store.translations.successmodal_message}
        title={store.translations.thank_you}
        backToHomepage={store.translations.back_homepage}
      />
    </div>
  );
};

export default observer(BookPage);