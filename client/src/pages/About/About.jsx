import { useEffect, useState } from "react";
import {
  AboutContainer,
  CallToAction,
  FeatureItem,
  FeatureList,
  SectionContent,
  SectionTitle,
} from "./About.style";

function About() {
  //calculation of about height

  const [aboutContainerHeight, setAboutContainerHeight] = useState("75px");

  const handleResize = () => {
    const navBarHeight = document.getElementById("navbar").clientHeight;
    const windowHeight = window.innerHeight;

    const desiredAboutContainerHeight = windowHeight - navBarHeight;

    setAboutContainerHeight(`${desiredAboutContainerHeight}px`);
  };

  useEffect(() => {
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Initial calculation on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //end calculation of about height

  return (
    <div>
      <AboutContainer style={{ height: aboutContainerHeight }}>
        {/*insert relevant content*/}

        <SectionTitle>About Us</SectionTitle>
        <SectionContent>
          Welcome to Attack-O-Meter, your ultimate platform for web security
          testing and training. Our mission is to empower developers, security
          enthusiasts, and businesses to identify and address vulnerabilities in
          their web applications.
        </SectionContent>

        <SectionTitle>Our Vision</SectionTitle>
        <SectionContent>
          At Attack-O-Meter, we envision a world where every web application is
          secure, and developers are equipped with the knowledge and tools to
          build robust and resilient systems. We believe that by raising
          awareness about web security and providing hands-on training, we can
          create a safer digital landscape.
        </SectionContent>

        <SectionTitle>What We Offer</SectionTitle>
        <FeatureList>
          <FeatureItem>
            Security Testing Tools: Explore our suite of security testing tools,
            including XSS (Cross-Site Scripting) and SQL Injection testers. Test
            your web applications for potential vulnerabilities and receive
            detailed reports to help you fix any issues.
          </FeatureItem>
          <FeatureItem>
            Training and Workshops: Join our interactive training sessions and
            workshops led by experienced cybersecurity experts. Learn about the
            latest security threats, best practices, and techniques to protect
            your applications.
          </FeatureItem>
          <FeatureItem>
            Community and Support: Join our vibrant community of developers and
            security enthusiasts. Share knowledge, ask questions, and
            collaborate with like-minded individuals to enhance your security
            skills.
          </FeatureItem>
        </FeatureList>

        <SectionTitle>Why Choose Attack-O-Meter?</SectionTitle>
        <FeatureList>
          <FeatureItem>
            Comprehensive Testing: Our tools are designed to conduct thorough
            security assessments, ensuring you cover all potential attack
            vectors.
          </FeatureItem>
          <FeatureItem>
            Realistic Simulations: Test your applications in a safe environment
            with realistic attack simulations to better understand security
            risks.
          </FeatureItem>
          <FeatureItem>
            Continuous Updates: We stay up-to-date with the latest security
            trends, updating our tools and content regularly to keep you
            informed about new threats.
          </FeatureItem>
          <FeatureItem>
            Expert Support: Our team of security experts is here to provide
            guidance, answer your questions, and assist you in securing your web
            applications.
          </FeatureItem>
        </FeatureList>

        <SectionContent>
          {"Don't"} leave your web applications vulnerable to attacks. Join
          SecureWeb and take control of your web security. Test, learn, and
          protect your applications to build a safer online experience for
          everyone.
        </SectionContent>

        <CallToAction href="/register">Get Started Today</CallToAction>

        <SectionContent>
          Remember, our goal is to promote responsible web security practices
          and foster a culture of continuous learning. Together, {"let's"} make
          the web a safer place for everyone.
        </SectionContent>
      </AboutContainer>
    </div>
  );
}

export default About;
