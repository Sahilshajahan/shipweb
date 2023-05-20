import ReactSlider from "react-slider";
import './slider.css'
const Slider = () => {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      markClassName="example-mark"
      marks={20}
      min={0}
      max={100}
    />
  );
};
export default Slider;