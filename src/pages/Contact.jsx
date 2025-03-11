import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Field, Label, Switch } from "@headlessui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Example() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    companyUrl: "",
    phoneNumber: "",
    message: "",
    goal: "",
    agreed: false,
  });

  const [alertMessage, setAlertMessage] = useState(""); // State for the alert message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = () => {
    setFormData((prev) => ({
      ...prev,
      agreed: !prev.agreed,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      setAlertMessage("You must agree to the policy to submit the form.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "formSubmissions"), {
        ...formData,
        createdAt: new Date(),
      });
      setAlertMessage("Form submitted successfully!");

      // Send email via an API (we will use an external service like Gmail API or SendGrid).
      sendEmail(formData);
    } catch (e) {
      console.error("Error adding document: ", e);
      setAlertMessage("Error submitting form.");
    }
  };

  const sendEmail = (data) => {
    // You can use an API like SendGrid or Gmail API to send emails
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent successfully: ", data);
      })
      .catch((error) => {
        console.error("Error sending email: ", error);
      });
  };

  return (
    <div className="isolate bg-[#FAFAFA]">
      <Navbar />
      <div className="mx-auto max-w-3xl text-center pt-45">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          Contact us
        </h2>
        <p className="mt-10 text-lg/8 text-gray-600">
          Want to build something great together?
          <br /> Let's hop on a free discovery call and explore how we can
          create impactful synergies.
        </p>
      </div>
      
      {/* Display the alert message */}
      {alertMessage && (
        <div
          className={`${
            alertMessage.includes("Error") ? "text-red-600" : "text-green-600"
          } my-4 text-center text-lg font-semibold`}
        >
          {alertMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto my-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              First name <sup className="text-red-500">*</sup>
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              Last name <sup className="text-red-500">*</sup>
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              Email <sup className="text-red-500">*</sup>
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              Company <sup className="text-red-500">*</sup>
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company-url"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              Company URL
            </label>
            <div className="mt-2.5">
              <input
                id="company-url"
                name="companyUrl"
                type="url"
                value={formData.companyUrl}
                onChange={handleChange}
                placeholder="https://"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              Phone number <sup className="text-red-500">*</sup>
            </label>
            <div className="mt-2.5">
              <input
                id="phone-number"
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="123-456-7890"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="goal"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              Goal <sup className="text-red-500">*</sup>
            </label>
            <div className="mt-2.5">
              <input
                id="goal"
                name="goal"
                type="text"
                value={formData.goal}
                onChange={handleChange}
                required
                rows={3}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm/8 font-semibold text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <Field className="flex items-center gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={formData.agreed}
                onChange={handleSwitchChange}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-checked:bg-primary-green"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="size-4 transform rounded-full bg-white ring-1 shadow-xs ring-gray-900/5 transition duration-200 ease-in-out group-data-checked:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm text-gray-600">
              Please note that your email may be used for marketing purposes.
              You can choose to opt-out at any time.
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-primary-green shadow-xs hover:bg-primary-green transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}