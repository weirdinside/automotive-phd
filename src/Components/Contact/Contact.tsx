import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact_section}>
      <h2 className={styles.contact_heading}>CONTACT US</h2>
      <p className={styles.contact_description}>
        Let us know if you need anything serviced! We take your needs seriously,
        and will get back to you as soon as we can.
      </p>
      <form className={styles.contact_form}>
        <label className={styles.contact_form_label}>Name</label>
        <input
          className={styles.contact_form_input}
          type="text"
          id="name"
          name="name"
          required
          placeholder="John Smith"
        />
        <label className={styles.contact_form_label}>Email</label>
        <input
          className={styles.contact_form_input}
          type="email"
          id="email"
          name="email"
          placeholder="johnsmith@gmail.com"
          required
        />
        <label className={styles.contact_form_label}>Phone Number</label>
        <input
          className={styles.contact_form_input}
          type="tel"
          id="phone"
          name="phone"
          placeholder="123-456-7890"
          required
        />
        <label className={styles.contact_form_label}>
          Vehicle Year, Make & Model
        </label>
        <input
          className={styles.contact_form_input}
          type="text"
          id="vehicle"
          name="vehicle"
          placeholder="2009 Audi A4"
          required
        />
        <label className={styles.contact_form_label}>Select a Service</label>
        <select
          id="service"
          name="service"
          required
          className={styles.contact_form_select}
          defaultValue={""}
        >
          <option className={styles.option} value="" disabled>
            -- Please Choose --
          </option>
          <option className={styles.option} value="tires">
            Tires
          </option>
          <option className={styles.option} value="oil_change">
            Oil Change
          </option>
          <option className={styles.option} value="brake_service">
            Brake Service
          </option>
          <option className={styles.option} value="ac_heat">
            A/C & Heat
          </option>
          <option className={styles.option} value="engine_diagnostics">
            Engine Diagnostics
          </option>
          <option className={styles.option} value="battery_replacement">
            Battery Replacement
          </option>
          <option className={styles.option} value="exhaust_repair">
            Exhaust Repair
          </option>
          <option className={styles.option} value="pre_purchase_inspection">
            Pre-Purchase Inspection
          </option>
          <option value="wheel_alignment">Wheel Alignment</option>
          <option value="other">Other</option>
        </select>
        <label className={styles.contact_form_label}>Additional Details</label>
        <textarea
          id="message"
          name="message"
          placeholder="Describe the issue or any other relevant info: When are you available? What's the car doing?"
          className={styles.contact_form_textarea}
          rows={4}
        />
        <button type="submit" className={styles.contact_submit_button}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}
