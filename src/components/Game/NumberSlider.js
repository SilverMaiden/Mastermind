import React, {useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ItemsCarousel from 'react-items-carousel';
import Slider from "react-slick";

const NumberSlider = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
    let arr  = ["a", "b", "c", "d", "e", "f","g", "h"];
    const [value, setValue] = useState(0)

    const handleClickUp = () => {
            props.addChosen((value+1), props.location)
            setValue(value + 1);
            console.log(props.data)
    }
    const handleClickDown = () => {
            props.addChosen((value-1), props.location)
            setValue(value - 1);
    }

    return (
        <div>
                {value < 7
                    ? <button onClick={handleClickUp}>
                        ^
                    </button>
                    : <button> ^ </button> }


            <div className="norse input">
                {arr[value]}
            </div>
                {value > 0
                    ? <button onClick={handleClickDown}>
                        v
                    </button>
                    : <button> v</button> }


        </div>


    )
}

export default NumberSlider;
