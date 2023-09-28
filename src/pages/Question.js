import React, { useEffect, useState } from "react";
import "../styles/Question.css";
import "../styles/Quest.css";
import { Link } from "react-router-dom";

const Question = () => {
  const [datafromApi, setDataFromApi] = useState(null);
  const [loadingData, setLoading] = useState(false);
  const [disabledNext, setDisabledNext] = useState(true);
  const [disabledPre, setDisabledPre] = useState(true);
  const [len, setLength] = useState([]);

  const [collectedData, setCollectedData] = useState([]);

  const [currentQtn, setCurrentQtn] = useState(null);
  const [currentQtnNo, setCurrentQtnNo] = useState(1);
  const [Attempted, setAttempted] = useState(0);

  const [AttemptedAll, setAttemptedAll] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const [options, setOptions] = useState([]);
  

  function setProblemsAndOptions(currentQtn) {
    let totalOptions = 1 + currentQtn?.incorrect_answers?.length;
    let correctOption = 0;
    correctOption = Math.floor(Math.random() * totalOptions);
    let options = [];
    let i = 0;
    for (let index = 0; index < totalOptions; index++) {
      if (index === correctOption)
        options[correctOption] = currentQtn?.correct_answer;
      else options[index] = currentQtn?.incorrect_answers[i++];
    }
    setOptions(options);
  }

  function attempt(e) {
    setDisabledNext(false);
    setAttempted((pre) => pre + 1);
    e.target.classList.toggle("checked");
    const resData = {
      ...currentQtn,
      selectedOption: e.target.innerText,
      id: e.target.id,
      opted: true,
      options,
      score: e.target.innerText === currentQtn.correct_answer ? 5 : -1,
      currentQtnNo,
    };
    setTotalScore((pre) => pre + resData.score);
    setCollectedData((pre) => [...pre, resData]);

    for (let index = 0; index < options.length; index++) {
      document.getElementById(`${index}+${currentQtnNo}`).style.pointerEvents =
        "none";
    }
  }

  function preQstn() {
    setCurrentQtnNo((pre) => (pre - 1 < 1 ? 1 : pre - 1));
    if (currentQtnNo === 2) setDisabledPre(true);
  }

  function nextQstn(e) {
    setCurrentQtnNo((pre) => (pre + 1 <= len.length ? pre + 1 : len.length));
    if (currentQtnNo === len.length) {
      setAttemptedAll(true);
      setDisabledNext(true);
      let num = 0;

      let numAnimation = setInterval(() => {
        if (totalScore >= 0) {
          if (totalScore === num) window.clearInterval(numAnimation);
          document.getElementById("total").textContent = num;
          num += 1;
        }
      }, 50);
    }
    if (!collectedData[currentQtnNo]?.opted) {
      for (let index = 0; index < options.length; index++) {
        const classes = document.getElementById(
          `${index}+${currentQtnNo}`
        ).classList;
        if (Array.from(classes).includes("checked"))
          document
            .getElementById(`${index}+${currentQtnNo}`)
            .classList.toggle("checked");

        document.getElementById(
          `${index}+${currentQtnNo}`
        ).style.pointerEvents = "auto";
      }
    }
  }

  useEffect(() => {
    async function fetchQuestionsFromApi() {
      setLoading(true);
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10");
        const data = await res.json();
        setLoading(false);
        setDataFromApi(data);
        setLength(data?.results);
      } catch (error) {
        alert("Error! Could not fetch.");
        setLoading(true);
      }
    }

    fetchQuestionsFromApi();
  }, []);

  useEffect(() => {
    if (datafromApi?.results.length) {
      setCurrentQtn(datafromApi?.results[currentQtnNo - 1]);
      setProblemsAndOptions(currentQtn);
    }

    if (!collectedData[currentQtnNo - 1]?.opted) {
      setDisabledNext(true);
    } else {
      let options = collectedData[currentQtnNo - 1].options;
      let id = collectedData[currentQtnNo - 1].id;

      setOptions(options);
      setDisabledNext(false);

      for (let i = 0; i < options.length; i++) {
        let element = document.getElementById(`${i}+${currentQtnNo}`);
        if (!element) continue;
        element.style.pointerEvents = "none";
        element.classList.remove("checked");
      }
      document.getElementById(id)?.classList?.add("checked");
    }
    // }

    if (currentQtnNo > 1) setDisabledPre(false);
  }, [currentQtnNo, datafromApi, currentQtn]);

  if (loadingData) {
    return (
      <div className="waitpage">
        <div>Fetching Quiz Questions...</div>
        <img
          src="https://i.ibb.co/cCn4RyV/bird-6916.gif"
          alt="bird-6916"
          border="0"
        ></img>
      </div>
    );
  }
  let key = 0;
  return (
    <main className="questions">
      <h2>Here you go... ALL THE BEST!!!</h2>
      <section className="questionPage">
        <section className="List">
          {len &&
            len.map((x) => {
              key++;
              return (
                <button key={key} className="key">
                  {key}
                </button>
              );
            })}
        </section>

        <section className="attempted">
          <div className="countBox">
            <h2>
              Attempted : &nbsp; {Attempted}/{len?.length}{" "}
            </h2>
          </div>
        </section>

        <section className="quest">
          {/* Question with options */}

          {!AttemptedAll ? (
            <main className="quest">
              <section className="mainquest">
                <h2>{currentQtn && currentQtn.question}</h2>
              </section>
              <section className="options">
                <ol>
                  {options &&
                    options.map((x, i) => (
                      <li
                        key={key++}
                        id={`${i}+${currentQtnNo}`}
                        onClick={attempt}
                      >
                        {x}
                      </li>
                    ))}
                </ol>
              </section>
            </main>
          ) : (
            <div className="score">
              Your Score{" "}
              <span className="total" id="total">
                {totalScore}
              </span>{" "}
              out of
              <span className="total">{len.length * 5}</span>
            </div>
          )}
        </section>

        {!AttemptedAll ? (
          <section className="nextAndPre">
            <div className="pre">
              <button
                className="preBtn btn"
                disabled={disabledPre}
                style={{
                  opacity: disabledPre ? ".5" : "1",
                  cursor: disabledPre ? "not-allowed" : "pointer",
                  pointerEvents: disabledPre ? "none" : "auto",
                }}
                onClick={preQstn}
              >
                Previous
              </button>
            </div>

            <div className="next">
              <button
                className="nextBtn btn"
                disabled={disabledNext}
                style={{
                  opacity: disabledNext ? ".5" : "1",
                  cursor: disabledNext ? "not-allowed" : "pointer",
                  pointerEvents: disabledNext ? "none" : "auto",
                }}
                onClick={nextQstn}
              >
                Next
              </button>
            </div>
          </section>
        ) : (
          <Link to={"/"} className="homepage">
            HomePage
          </Link>
        )}
      </section>
    </main>
  );
};

export default Question;
