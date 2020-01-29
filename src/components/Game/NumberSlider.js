import React, {useState, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ItemsCarousel from 'react-items-carousel';
import Slider from "react-slick";

const NumberSlider = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
    let arr  = ["a", "b", "c", "d", "e", "f","g", "h"];



    return (
        <div>
                {props.value < 7
                    ? <button onClick={() => props.handleClickUp(props.location)}>
                        ^
                    </button>
                    : <button> ^ </button> }


            <div className="norse input">
            </div>
                {props.value > 0
                    ? <button onClick={() => props.handleClickDown(props.location)}>
                        v
                    </button>
                    : <button> v</button> }


        </div>


    )
}

export default NumberSlider;
