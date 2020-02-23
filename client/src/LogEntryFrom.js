import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";

const LogEntryFrom = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async data => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error"> {error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />
      <label htmlFor="comments">comments</label>
      <textarea name="comments" rows={3} ref={register} />
      <label htmlFor="description">description</label>
      <textarea name="description" rows={3} ref={register} />
      <label htmlFor="image">image</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" ref={register} />
      <br />
      <button disabled={loading}>
        {" "}
        {loading ? "Loading ..." : "Create travel Log entry"}
      </button>
    </form>
  );
};

export default LogEntryFrom;
