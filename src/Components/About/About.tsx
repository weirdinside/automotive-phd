import styles from "./About.module.css";
import shopphoto from "/homepage_images/shop-photo.jpg";

export default function About() {
  return (
    <>
      <section className={styles.banner}>
        <img className={styles.banner_image} src={shopphoto} alt="Shop" />
        <div className={styles.banner_blur} />
        <div className={styles.banner_text}>
          <h1 className={styles.heading}>
            PASSION. <span className={styles.accent}>PRECISION.</span> TRUST.
          </h1>
          <p className={styles.subheading}>
            At Automotive PhD, cars aren’t just machines; they’re our passion.
          </p>
        </div>
      </section>

      <section className={styles.philosophy_section}>
        <h2 className={styles.section_heading}>OUR PHILOSOPHY</h2>
        <p className={styles.paragraph_center}>
          We believe in combining real diagnostics with hands-on expertise.
          Every repair is done with care, every restoration treated like it’s
          our own. {" "}
          <span className={styles.accent}>No guesswork. Just results.</span>
        </p>
      </section>
    </>
  );
}
