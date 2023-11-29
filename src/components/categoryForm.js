import React, { useState, useEffect } from "react";

function CategoryForm({ category, onFormSubmit }) {
  const [sleepDuration, setSleepDuration] = useState("");
  const [formData, setFormData] = useState({
    bed_time: "",
    sleep_start: "",
    sleep_stop: "",
    sleep_duration: "",
    sleep_quality: "",
    proof: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formData.sleep_start && formData.sleep_stop) {
      const sleepStart = new Date(`2023-01-01 ${formData.sleep_start}`);
      const sleepStop = new Date(`2023-01-01 ${formData.sleep_stop}`);

      if (sleepStop < sleepStart) {
        sleepStop.setDate(sleepStop.getDate() + 1);
      }

      const durationInMinutes = (sleepStop - sleepStart) / (1000 * 60);

      const hours = Math.floor(durationInMinutes / 60);
      const minutes = Math.round(durationInMinutes % 60);

      setSleepDuration(`${hours}h ${minutes}m`);
    } else {
      setSleepDuration("");
    }
  }, [formData.sleep_start, formData.sleep_stop]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let updatedCategoryData = {
      category: category.category,
      title: category.title,
      categoryStatus: category.categoryStatus,
    };

    const currentTime = new Date().toLocaleTimeString();

    if (category.category === "sleep") {
      updatedCategoryData = {
        ...updatedCategoryData,
        categorySubmit: "processing",
        submitTime: currentTime,
        bed_time: formData.bed_time,
        sleep_start: formData.sleep_start,
        sleep_stop: formData.sleep_stop,
        sleep_duration: sleepDuration,
        sleep_quality: formData.sleep_quality,
        proof: formData.proof,
      };
    } else if (category.category === "cardio") {
      updatedCategoryData = {
        ...updatedCategoryData,
        categorySubmit: "processing",
        submitTime: currentTime,
        time_start: formData.time_start,
        exercise_type: formData.exercise_type,
        duration: formData.duration,
        distance: formData.distance,
        proof: formData.proof,
      };
    }

    onFormSubmit(updatedCategoryData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {category.category === "sleep" && (
        <>
          <label>Bed Time</label>
          <input
            type="time"
            name="bed_time"
            value={formData.bed_time}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Sleep Time</label>
          <input
            type="time"
            name="sleep_start"
            value={formData.sleep_start}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Wake Up Time</label>
          <input
            type="time"
            name="sleep_stop"
            value={formData.sleep_stop}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Sleep Duration</label>
          <input
            type="text"
            name="sleep_duration"
            value={sleepDuration}
            readOnly
          />
          <br />
          <label>Sleep Quality</label>
          <input
            type="number"
            name="sleep_quality"
            value={formData.sleep_quality}
            onChange={handleInputChange}
            min="0"
            max="100"
            required
          />
          <span>%</span>
          <br />
        </>
      )}

      {category.category === "cardio" && (
        <>
          <label>Start Time</label>
          <input
            type="time"
            name="time_start"
            value={formData.time_start}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Exercise Type</label>
          <input
            type="text"
            name="exercise_type"
            value={formData.exercise_type}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
          <br />
          <label>Distance</label>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            required
          />
          <br />
        </>
      )}

      <label>Upload Proof</label>
      <input
        type="text"
        name="proof"
        value={formData.proof}
        onChange={handleInputChange}
        required
      />
      <br />
      <button type="submit">Submit</button>
      <br />
      <h4>Status</h4>
    </form>
  );
}

export default CategoryForm;
