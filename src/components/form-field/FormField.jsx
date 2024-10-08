import styles from "./FormField.module.css";

export default function FormField({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  rows,
  options,
  includeDefaultOption = true
}) {
  const renderOptions = () => {
    if (Array.isArray(options)) {
      return options.map((option) => {
        if (
          typeof option === "object" &&
          option !== null &&
          "title" in option &&
          "id" in option
        ) {
          return (
            <option key={option.id} value={option.title}>
              {option.title}
            </option>
          );
        }
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      });
    }
    return null;
  };

  return (
    <fieldset
      className={`${styles["form-group"]} ${error ? styles["has-error"] : ""}`}
    >
      {label && (
        <label className="form-label-outside" htmlFor={name}>
          {label}
        </label>
      )}
      {type === "textarea" && (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={styles["form-control"]}
          value={value}
          onChange={onChange}
          rows={rows}
        ></textarea>
      )}
      {type === "select" && options && (
        <select
          id={name}
          name={name}
          className={styles["form-control"]}
          value={value}
          onChange={onChange}
        >
          {includeDefaultOption && <option value="">Select</option>}
          {renderOptions()}
        </select>
      )}
      {type !== "select" && type !== "textarea" && (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={styles["form-control"]}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span className={styles["form-validation"]}>{error}</span>}
    </fieldset>
  );
}
