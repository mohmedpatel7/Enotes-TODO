import React from "react";
import "./style/style.css";

const About = () => {
  return (
    <div className="about-container" style={{ paddingTop: "75px" }}>
      <section className="about-section">
        <h1 className="about-title">ABOUT ENOTES</h1>
        <div className="about-content">
          <p>
            ENOTES is a personal note management application designed to help
            you organize your tasks and ideas effortlessly. With ENOTES, you can
            add, update, delete, and securely store your notes, ensuring you
            never miss a crucial piece of information.
          </p>
          <p>
            Our mission is to provide a simple yet powerful tool to enhance your
            productivity and keep your thoughts organized. Whether you're a
            student, a professional, or just someone who loves to stay
            organized, ENOTES is here to assist you every step of the way.
          </p>
        </div>
      </section>

      <section className="team">
        <div className="team-member">
          <img src="https://via.placeholder.com/100" alt="Team Member 2" />
          <h3>MOHMED PATEL</h3>
          <p>Lead Developer</p>
        </div>
      </section>
    </div>
  );
};

export default About;
