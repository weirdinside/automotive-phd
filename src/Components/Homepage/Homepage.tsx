import { useState, useEffect, useRef } from "react";
import { FaOilCan, FaTools } from "react-icons/fa";
import {
  GiCarBattery,
  GiCarWheel,
  GiFlatTire,
  GiSteeringWheel,
} from "react-icons/gi";
import { MdSearch } from "react-icons/md";
import { WiThermometerExterior } from "react-icons/wi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Homepage.module.css";
import bannerImage from "/homepage_images/urs4_1.jpg";
import DraggableMarquee from "../DraggableMarquee";
import alfalogo from "/car_logos/alfa-logo.webp";
import audilogo from "/car_logos/audi-logo.webp";
import benzlogo from "/car_logos/benz-logo.webp";
import bmwlogo from "/car_logos/bmw-logo.webp";
import lrlogo from "/car_logos/land-rover-logo.webp";
import vwlogo from "/car_logos/vw-logo.webp";
import porschelogo from "/car_logos/porsche-logo.webp";
import maseratilogo from "/car_logos/maserati-logo.webp";

import audi2 from "/audi/audi-1.webp";
import audi3 from "/audi/audi-2.webp";
import audi4 from "/audi/audi-3.webp";
import audi5 from "/audi/audi-4.webp";
import audi6 from "/audi/audi-5.webp";

import alfa1 from "/alfa/alfa-1.webp";

import shopwork from "/shop-work.webp";

import benz1 from "/benz/benz-1.webp";
import benz2 from "/benz/benz-2.webp";
import benz3 from "/benz/benz-3.webp";
import benz4 from "/benz/benz-4.webp";
import benz5 from "/benz/benz-5.webp";

import bmw1 from "/bmw/bmw-1.webp";
import bmw2 from "/bmw/bmw-2.webp";
import bmw3 from "/bmw/bmw-3.webp";
import bmw4 from "/bmw/bmw-4.webp";

import lr1 from "/landrover/lr-1.webp";
import lr2 from "/landrover/lr-2.webp";

import maserati1 from "/maserati/maserati-1.webp";

import porsche1 from "/porsche/porsche-1.webp";
import porsche2 from "/porsche/porsche-2.webp";
import porsche3 from "/porsche/porsche-3.webp";

import vw1 from "/vw/vw-1.webp";
import vw2 from "/vw/vw-2.webp";

import enginerebuild from "/homepage_images/engine-rebuild.jpg";
import shopphoto from "/homepage_images/shop-photo.jpg";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <FaOilCan size={50} />,
    title: "OIL CHANGES",
    description:
      "Changing the oil and filter in your vehicle will help extend its life and help it operate smoothly.",
  },
  {
    icon: <GiFlatTire size={50} />,
    title: "TIRES",
    description:
      "If you have a flat or need tires, we can patch them, or supply and change them for you.",
  },
  {
    icon: <GiCarWheel size={50} />,
    title: "BRAKE SERVICE",
    description:
      "Your vehicle’s braking system is critical for safety. We inspect, repair, and replace brake pads, rotors, and fluid to ensure reliable stopping power.",
  },
  {
    icon: <WiThermometerExterior size={50} />,
    title: "A/C & HEAT",
    description:
      "Stay comfortable year-round with system diagnostics, refrigerant recharging, and HVAC repairs.",
  },
  {
    icon: <FaTools size={50} />,
    title: "ENGINE DIAGNOSTICS",
    description:
      "We use advanced tools to identify and fix engine problems, whether it’s a check engine light or performance issue.",
  },
  {
    icon: <GiCarBattery size={50} />,
    title: "BATTERY REPLACEMENT",
    description:
      "We test, charge, or replace your battery to keep your vehicle starting strong in any season.",
  },
  {
    icon: <GiSteeringWheel size={50} />,
    title: "EXHAUST SYSTEM REPAIR",
    description:
      "Maintain fuel efficiency and reduce emissions with muffler, catalytic converter, and exhaust pipe repairs.",
  },
  {
    icon: <MdSearch size={50} />,
    title: "PRE-PURCHASE INSPECTION",
    description:
      "Buying a used car? We’ll inspect it bumper-to-bumper so you can purchase with confidence.",
  },
  {
    icon: <GiSteeringWheel size={50} />,
    title: "WHEEL ALIGNMENT",
    description:
      "Correct wheel angles for even tire wear, better handling, and improved fuel economy.",
  },
];
const vehiclesData = [
  {
    name: "AUDI",
    logo: audilogo,
    description:
      "We offer precision service and are well equipped to work on Audis of all models, ranging from classic to modern. Including: A3/S3/RS3, A4/S4/RS4, A5/S5/RS5, A6/S6/RS6, A7/S7/RS7, A8/S8, Q3, Q5/SQ5, Q7/SQ7, R8, TT, and e-tron models. Whether it's maintenance or performance upgrades, we ensure your Audi delivers its best. Our experience with German engineering means we handle even the most complex Audi systems with confidence.",
    images: [audi2, audi3, audi4, audi5, audi6],
  },
  {
    name: "ALFA ROMEO",
    logo: alfalogo,
    description:
      "We provide expert care for all Alfa Romeo models, including Giulia, Stelvio, Giulietta, 4C, and Tonale. Our technicians handle maintenance, diagnostics, and performance upgrades with precision, keeping your Alfa Romeo in top condition. We combine technical knowledge with passion for Italian engineering. Every service is carried out with the attention to detail your Alfa Romeo deserves.",
    images: [alfa1],
  },
  {
    name: "BMW",
    logo: bmwlogo,
    description:
      "BMW service and maintenance specialists for all models, including 2 Series, 3 Series, 4 Series, 5 Series, 7 Series, X1-X7 SUVs, Z4, i3, i4, and M Performance vehicles. We offer advanced diagnostics, engine repairs, and suspension tuning. Our team makes sure your Ultimate Driving Machine lives up to its name. From routine maintenance to performance builds, we provide complete BMW care.",
    images: [bmw1, bmw2, bmw3, bmw4],
  },
  {
    name: "LAND ROVER",
    logo: lrlogo,
    description:
      "Full service and repair for all Land Rover vehicles, including Range Rover, Range Rover Sport, Range Rover Velar, Discovery, Discovery Sport, and Defender. We handle routine maintenance, advanced diagnostics, and off-road suspension work. No matter the terrain, we keep your Land Rover ready for adventure. Our expert team ensures reliability, whether you’re on city streets or rugged trails.",
    images: [lr1, lr2],
  },
  {
    name: "MASERATI",
    logo: maseratilogo,
    description:
      "Maserati specialists providing maintenance, engine work, suspension repairs, and complete performance servicing for Ghibli, Quattroporte, Levante, MC20, and GranTurismo models. We ensure your luxury vehicle performs flawlessly. Our expert care keeps the spirit of Italian performance alive in your Maserati. With a focus on precision and passion, we help your Maserati deliver its signature driving experience.",
    images: [maserati1],
  },
  {
    name: "MERCEDES BENZ",
    logo: benzlogo,
    description:
      "Comprehensive care for all Mercedes Benz models including A-Class, C-Class, E-Class, S-Class, CLA, GLA, GLC, GLE, GLS, AMG variants, and EQ electric models. From diagnostics to engine and transmission repairs, we deliver precision Mercedes service. Our team maintains the comfort, safety, and performance Mercedes is known for. With our expertise, your Mercedes stays refined and reliable for years to come.",
    images: [benz1, benz2, benz3, benz4, benz5],
  },
  {
    name: "PORSCHE",
    logo: porschelogo,
    description:
      "Expert maintenance and repair for all Porsche vehicles, including 911, 718 Cayman, 718 Boxster, Macan, Cayenne, Panamera, and Taycan. We provide performance tuning, diagnostics, and engine servicing to keep your Porsche in peak condition. From the street to the track, we help your Porsche perform as designed. Every Porsche receives meticulous attention to preserve its heritage and performance legacy.",
    images: [porsche1, porsche2, porsche3],
  },
  {
    name: "VOLKSWAGEN",
    logo: vwlogo,
    description:
      "VW service and repairs for all models, including Golf, Jetta, Passat, Tiguan, Atlas, Arteon, ID.4, and Beetle. Our team handles engine work, diagnostics, and regular maintenance, ensuring your Volkswagen runs smoothly and efficiently. We treat every VW with the same care, from daily drivers to classics. Whether it’s a family car or a performance model, we provide dependable Volkswagen service.",
    images: [vw1, vw2],
  },
];

export default function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!manualOverride) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % vehiclesData.length);
      }, 9000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [manualOverride]);

  const activeVehicle = vehiclesData[activeIndex];

  const handleVehicleClick = (index: number) => {
    setActiveIndex(index);
    setManualOverride(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSelectedItem(1);
  };

  return (
    <>
      <section className={styles.banner}>
        <img className={styles.banner_image} src={bannerImage} alt="Banner" />
        <div className={styles.banner_blur} />
        <div className={styles.banner_text}>
          <p className={styles.preheading}>we are</p>
          <h1 className={styles.heading}>
            YOUR <span className={styles.educated}>EDUCATED</span> CHOICE
          </h1>
          <p className={styles.subheading}>for all your automotive needs</p>
          <div className={styles.cta_buttons}>
            <Link to="/contact">
              <button className={styles.cta_button}>GET A QUOTE</button>
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.services_block}>
        <div className={styles.services_content}>
          <p className={styles.services_description}>
            We are your one stop for all auto repairs and maintenance. We
            specialize in European cars, but our expertise extends to vehicles
            of all makes and models. If it has an engine and wheels, we can
            definitely fix it!
            <br />
            <br />
            Contact us today to get your car serviced.
            <br />
            <br />
            <Link to="/contact">
              <button className={styles.cta}>CONTACT US</button>
            </Link>
          </p>
          <div
            className={`${styles.services_list} ${styles.services_list_vertical}`}
          >
            <DraggableMarquee
              aspectRatio="1 / 4"
              direction="vertical"
              speed={0.6}
            >
              {services.map((s, i) => (
                <div key={i} className={styles.grid_item}>
                  <div style={{ marginBottom: 10 }}>{s.icon}</div>
                  <h3 className={styles.grid_item_heading}>{s.title}</h3>
                </div>
              ))}
            </DraggableMarquee>
          </div>
          <div
            className={`${styles.services_list} ${styles.services_list_horizontal}`}
          >
            <DraggableMarquee
              aspectRatio="4 / 1"
              direction="horizontal"
              speed={0.6}
            >
              {services.map((s, i) => (
                <div key={i} className={styles.grid_item}>
                  <div style={{ marginBottom: 10 }}>{s.icon}</div>
                  <h3 className={styles.grid_item_heading}>{s.title}</h3>
                </div>
              ))}
            </DraggableMarquee>
          </div>
        </div>
      </div>

      <div className={styles.vehicles}>
        <h2 className={styles.vehicles_title}>
          WE SERVICE <br /> ALL MAKES.
        </h2>
        <p className={styles.vehicles_subtitle}>
          We specialize in European vehicles, but our technicians are equipped
          to repair and maintain any make or model of car.
        </p>
        <div className={styles.cycle_section}>
          <div className={styles.vehicle_grid}>
            {vehiclesData.map((v, i) => (
              <div
                key={i}
                className={`${styles.vehicle} ${
                  i === activeIndex ? styles.active : ""
                }`}
                onClick={() => handleVehicleClick(i)}
              >
                <img className={styles.vehicle_logo} src={v.logo} />
                <p className={styles.vehicle_title}>{v.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.vehicle_description}>
            <p className={styles.vehicle_description_text}>
              {activeVehicle.description}
            </p>
            {activeVehicle.images.length > 0 && (
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                className={styles.carousel}
                selectedItem={selectedItem}
              >
                {activeVehicle.images.map((image, idx) => (
                  <img key={idx} className={styles.embla_slide} src={image} />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>

      <div className={styles.about_section}>
        <h2 className={styles.about_heading}>
          WE LOVE <br /> <span style={{ color: "#30b193" }}>OUR WORK.</span>
        </h2>
        <div className={styles.about_content}>
          <img className={styles.about_mobile_image} src={shopwork} />
          <div className={styles.about_images}>
            <img
              className={`${styles.about_image} ${styles.top}`}
              src={enginerebuild}
            />
            <img
              className={`${styles.about_image} ${styles.bottom}`}
              src={shopphoto}
            />
            <div className={styles.about_image_accent} />
          </div>
          <p className={styles.about_description}>
            At Automotive PhD, we’re all about getting things right the first
            time. Whether it’s a European luxury car, an import, or your
            everyday ride, we dig deep to find and fix the problem; no
            guesswork, just real diagnostics and repair. Based in Horry County,
            South Carolina, we also take on full restorations, from engine work
            to body and trim, treating each project like it’s our own. With
            custom welding and fabrication done in-house, we’re able to tackle
            jobs most shops won’t touch. It’s all part of what makes us the shop
            people trust when they’re serious about their cars.
          </p>
        </div>
      </div>

      <div className={styles.contact_section}>
        <h2 className={styles.contact_heading}>CONTACT US</h2>
        <p className={styles.contact_description}>
          Let us know if you need anything serviced! We take your needs
          seriously, and will get back to you as soon as we can.
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
          <label className={styles.contact_form_label}>
            Additional Details
          </label>
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
    </>
  );
}
