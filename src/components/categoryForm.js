function categoryForm({ category, onFormSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let updatedCategoryData = {
      category: category.category,
      title: category.title,
      categoryStatus: category.categoryStatus,
    };

    const currentTime = new Date().toLocaleTimeString();

    // Check category type and update fields accordingly
    if (category.category === "sleep") {
      updatedCategoryData = {
        ...updatedCategoryData,
        categorySubmit: true,
        submitTime: currentTime,
        bed_time: formData.get("bed_time"),
        sleep_start: formData.get("sleep_start"),
        sleep_duration: formData.get("sleep_duration"),
        sleep_quality: formData.get("sleep_quality"),
        proof: formData.get("proof"),
      };
    } else if (category.category === "cardio") {
      updatedCategoryData = {
        ...updatedCategoryData,
        categorySubmit: true,
        submitTime: currentTime,
        time_start: formData.get("time_start"),
        exercise_type: formData.get("exercise_type"),
        duration: formData.get("duration"),
        distance: formData.get("distance"),
        proof: formData.get("proof"),
      };
    }

    onFormSubmit(updatedCategoryData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields based on category type */}
      {category.category === "sleep" && (
        <>
          <label>Bed Time</label>
          <input type="time" name="bed_time" required />
          <br />
          <label>Sleep Time</label>
          <input type="time" name="sleep_start" required />
          <br />
          <label>Sleep Duration</label>
          <input type="text" name="sleep_duration" required />
          <br />
          <label>Sleep Quality</label>
          <input type="text" name="sleep_quality" required />
          <br />
        </>
      )}

      {category.category === "cardio" && (
        <>
          <label>Start Time</label>
          <input type="time" name="time_start" required />
          <br />
          <label>Exercise Type</label>
          <input type="text" name="exercise_type" required />
          <br />
          <label>Duration</label>
          <input type="text" name="duration" required />
          <br />
          <label>Distance</label>
          <input type="text" name="distance" required />
          <br />
        </>
      )}

      <label>Upload Proof</label>
      <input type="text" name="proof" required />
      <br />
      <button type="submit">Submit</button>
      <br />
      <label>Status</label>
      <br />
      {category.categoryStatus ? "✔️" : "❌"}
    </form>
  );
}

export default categoryForm;
