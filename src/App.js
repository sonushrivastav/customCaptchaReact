import "./App.css";
import { React, useEffect, useRef, useState } from "react";
import captchaImg from "./captcha.jpeg";
import { AiOutlineReload } from "react-icons/ai";

let allCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

function App() {
  const [randomCaptcha, setRandomCaptcha] = useState();
  const [inputText, setInput] = useState();
  const [checkcaptcha, setCheckcaptcha] = useState("");
  const ref = useRef();
  const btn = useRef();
  const inputRef = useRef(null);

  const getCaptch = () => {
    let count = 0;
    for (let i = 1; i < 6; i++) {
      let randomChar =
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
      count += ` ${randomChar}`;
      setRandomCaptcha(count);
    }
  };

  const handleReloadClick = () => {
    setRandomCaptcha("");
    getCaptch();
  };

  const handlechange = (e) => {
    setInput(e.target.value.split("").join(" "));
    if (e.target.value) {
      btn.current.style.display = "block";
    }
  };

  useEffect(() => {
    getCaptch();
  }, []);

  const handleCheckbutton = (e) => {
    e.preventDefault();
    setCheckcaptcha(true);
    ref.current.style.display = "block";
    if (inputText == randomCaptcha) {
      setCheckcaptcha("Nice! You don't appear to be robot");
      ref.current.style.color = "green";
      setTimeout(() => {
        ref.current.style.display = "none";
        btn.current.style.display = "none";
        setCheckcaptcha("");
        inputRef.current.value = "";
        btn.current.display = "none";
        getCaptch();
      }, 4000);
    } else {
      setCheckcaptcha("Captcha not matched. Please try again!");
      ref.current.style.color = "red";
    }
  };

  console.log(inputText);
  console.log(checkcaptcha);

  return (
    <div className="wrapper">
      <header>Captcha Validation</header>
      <div className="captch_area">
        <div className="captch_img">
          <img src={captchaImg} alt="" />
          <span className="captcha">{randomCaptcha}</span>
        </div>
        <button className="reload_btn" onClick={handleReloadClick}>
          <AiOutlineReload size={33} className="icon" />
        </button>
      </div>
      <form action="" className="input_area">
        <input
          type="text"
          maxLength="6"
          ref={inputRef}
          placeholder="Enter captcha"
          required
          // onChange={(e) => setInput(e.target.value.split("").join(" "))}
          onChange={handlechange}
        />

        {inputText ? (
          <button className="check_btn" onClick={handleCheckbutton} ref={btn}>
            Check
          </button>
        ) : null}
      </form>
      <div className="status_txt" ref={ref}>
        {checkcaptcha}
      </div>
    </div>
  );
}

export default App;
