import {Component, useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const countTotal = (num) => {
    console.log("counting")
    return num + 10
}

const Slider = (props) => {

    const [autoplay, setAutoplay] = useState(false);
    const [slide, setSlide] = useState(0);

    const getSomeImages = useCallback(() => {
        console.log("fetching")
        return [
            "https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=977",
            "https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg"
        ]
    }, [slide]);

    function logging(){
        console.log("log")
    }

    useEffect(() => {
        console.log("useEffect")
        document.title = `Slide: ${slide}`

        window.addEventListener('click', logging)

        return () => {
            window.removeEventListener('click', logging)
        }

    },[slide])

    useEffect(() => {
        console.log(`autoplay`)
    }, [autoplay])

    function changeSlide(i) {
        setSlide(slide => slide + i)
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay)
    }

    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : "black"
    }), [slide])

    useEffect(() => {
        console.log("style")
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">

                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? "auto" : null} </div>
                <div style={style} className="text-center mt-5">Total slides:  {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true)

  return (
    <>
    <button onClick={() => setSlider(false)}>Click</button>
    {slider ? <Slider/> : null}
    </>
  );
}

export default App;
