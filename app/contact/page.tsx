'use client'
import { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Switch } from "@headlessui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";

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

  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = () => {
    setFormData(prev => ({
      ...prev,
      agreed: !prev.agreed,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreed) {
      setAlertMessage("You must agree to the policy to submit the form.");
      return;
    }

    try {
      await addDoc(collection(db, "contact"), {
        ...formData,
        createdAt: new Date(),
      });
      setAlertMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setAlertMessage("Error submitting form.");
    }
  };

  return (
    <div className="isolate bg-[#FAFAFA]">
      <Metadata
        title="Contact Us - ScaleX"
        description="Get in touch with ScaleX for your digital marketing needs."
      />

      <Navbar />

      {/* Background Shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#646464] to-[#00ff81] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-3xl text-center pt-32">
        <h2 className="text-4xl font-semibold text-gray-900 sm:text-5xl">
          Contact us
        </h2>
        <p className="mt-10 text-lg leading-8 text-gray-600">
          Want to build something great together?
          <br />
          Let's hop on a free discovery call and explore how we can create impactful synergies.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mx-auto my-16 max-w-2xl sm:mt-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold text-gray-900"
            >
              First name <sup className="text-red-500">*</sup>
            </label>
            <input
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold text-gray-900"
            >
              Last name <sup className="text-red-500">*</sup>
            </label>
            <input
              id="last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900"
            >
              Email <sup className="text-red-500">*</sup>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-gray-900"
            >
              Company <sup className="text-red-500">*</sup>
            </label>
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Company URL */}
          <div className="sm:col-span-2">
            <label
              htmlFor="company-url"
              className="block text-sm font-semibold text-gray-900"
            >
              Company URL
            </label>
            <input
              id="company-url"
              name="companyUrl"
              type="url"
              placeholder="https://"
              value={formData.companyUrl}
              onChange={handleChange}
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold text-gray-900"
            >
              Phone number <sup className="text-red-500">*</sup>
            </label>
            <input
              id="phone-number"
              name="phoneNumber"
              placeholder="123-456-7890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Goal */}
          <div className="sm:col-span-2">
            <label
              htmlFor="goal"
              className="block text-sm font-semibold text-gray-900"
            >
              Goal <sup className="text-red-500">*</sup>
            </label>
            <input
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Switch */}
          <div className="flex items-center gap-x-4 sm:col-span-2">
            <Switch
              checked={formData.agreed}
              onChange={handleSwitchChange}
              className="group relative inline-flex h-6 w-11 rounded-full bg-gray-200 ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-primary-green"
            >
              <span className="sr-only">Agree to policies</span>
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white ring-1 ring-gray-900/5 transition duration-200 ease-in-out translate-x-1 group-data-[checked]:translate-x-6"
              />
            </Switch>
            <span className="text-sm text-gray-600">
              Please note that your email may be used for marketing purposes. You may opt-out at any time.
            </span>
          </div>
        </div>

        {/* Alert */}
        {alertMessage && (
          <div
            className={`my-4 text-center text-lg font-semibold ${
              alertMessage.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {alertMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-10">
          <button
            type="submit"
            className="w-full rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-900 focus:ring-2 focus:ring-indigo-600"
          >
            Let’s talk
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
}