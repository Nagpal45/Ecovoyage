import "./Testimonial.css";
import Carousel from "./carousel";

const Testimonial = () => {
  return (
    <div className="section">
      <div className="reviewHeading">
        <h1>Reviewers Corner</h1>
        <p className="reviewPara">
          We place huge value on strong Relationships .{" "}
        </p>
        <p className="reviewPara">
          Customer Feedback is vital in helping us to get it right.
        </p>
      </div>

      <div className="section-center">
        <Carousel />
      </div>
    </div>
  );
};

export default Testimonial;
