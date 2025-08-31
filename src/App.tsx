import { FaPhoneAlt, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import logo from "/aphdlogo_dark.png";
import { useState, useEffect } from "react";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";

const NAV_ITEMS = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "GALLERY", path: "/gallery" },
  { label: "CONTACT", path: "/contact" },
];

function App() {
  const [day, setDay] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    function returnDay(number: number) {
      if (number === 0) return "Sunday";
      if (number === 1) return "Monday";
      if (number === 2) return "Tuesday";
      if (number === 3) return "Wednesday";
      if (number === 4) return "Thursday";
      if (number === 5) return "Friday";
      if (number === 6) return "Saturday";
      return "none";
    }
    setDay(returnDay(currentDate.getDay()));
  }, []);

  return (
    <div className={styles.page}>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (
            target.classList.contains(styles["menu"]) &&
            target.classList.contains(styles["open"])
          ) {
            setMenuOpen(false);
          }
        }}
        className={`${styles["menu"]} ${menuOpen && styles["open"]}`}
      >

        {NAV_ITEMS.map((item) => (
          <h2
            key={item.path}
            style={
              location.pathname === item.path
                ? { textDecoration: "underline" }
                : {}
            }
            className={styles["menu__option"]}
          >
            <Link
              onClick={() => {
                setMenuOpen(false);
              }}
              to={item.path}
            >
              {item.label}
            </Link>
          </h2>
        ))}
      </div>

      <div className={styles.subheader}>
        <div className={styles.subheader_content}>
          <div className={styles.hours}>
            <IoTimeOutline className={styles.hours_icon} />
            <div className={styles.hours_text}>
              {day === "Sunday" && "Sun: CLOSED"}
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].includes(day) && "Mon - Fri / 8:30AM - 6:30PM"}
              {day === "Saturday" && "Sat / 8:30AM - 5:00PM"}
              <p className={`${styles.hours_text} ${styles.floating}`}>
                Mon - Fri / 8:30AM - 6:30PM <br />
                Sat / 8:30AM - 5:00PM <br />
                Sun / CLOSED
              </p>
            </div>
          </div>
          <Link to="tel:8436501660" className={styles.contact}>
            <FaPhoneAlt className={styles.contact_icon} />
            Give us a call!
          </Link>
          <div className={styles.socials}>
            <Link
              target="_blank"
              to="https://www.instagram.com/automotivephd/"
              className={styles.social_link}
            >
              <FaFacebook
                className={`${styles.social_link_icon} ${styles.facebook}`}
              />
            </Link>
            <Link
              target="_blank"
              to="https://www.facebook.com/automotivephd/"
              className={styles.social_link}
            >
              <FaInstagram
                className={`${styles.social_link_icon} ${styles.instagram}`}
              />
            </Link>
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <img
          className={styles.logo}
          src={logo}
          onClick={() => {
            navigate("/");
          }}
        />

        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className={styles.nav_list_item}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  <p className={styles.nav_list_item_text}>{item.label}</p>
                  <div className={styles.nav_list_item_bg} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
          className={styles["hamburger"]}
        >
          <div
            className={`${styles["ham"]} ${styles["one"]} ${
              menuOpen && styles["open"]
            }`}
          />
          <div
            className={`${styles["ham"]} ${styles["two"]} ${
              menuOpen && styles["open"]
            }`}
          />
          <div
            className={`${styles["ham"]} ${styles["three"]} ${
              menuOpen && styles["open"]
            }`}
          />
        </div>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
        </Routes>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footer_main}>
          <div className={styles.footer_address}>
            <p>Automotive PhD</p>
            <p>8390 SC-707 Unit 3A</p>
            <p>Myrtle Beach, SC 29588</p>
          </div>
          <div className={styles.footer_hours}>
            <p>Mon - Fri: 8:30AM – 6:30PM</p>
            <p>Saturday: 8:30AM – 5:00PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className={styles.footer_contact}>
            <a href="tel:8436501660">Call: (843) 650-1660</a>
            <a href="mailto:automotivephd@yahoo.com">
              Email: automotivephd@yahoo.com
            </a>
            <div className={styles.footer_socials}>
              <a
                target="_blank"
                href="https://www.instagram.com/automotivephd/"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                target="_blank"
                href="https://www.facebook.com/automotivephd/"
                rel="noreferrer"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.credits}>
          <p>
            © {new Date().getFullYear()} Automotive PhD. All rights reserved.
          </p>
          <p>web design & development by Ani Bharadwaj</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
