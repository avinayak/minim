import version from "../version.json";
import logo16 from "../logos/logo.svg";
import kofi2 from "../logos/kofi2.png";

export function About() {
  return (
    <div className="about-page">
      <br />
      <h1>Minim</h1>
      <img src={logo16} />
      <br />
      <br />v{version.version}
      <br />
      <br />
      Designed by <a href="https://twitter.com/atulvinayak">@atulvinayak</a>
      <br />
      <br />
      Weather Data by <a href="https://openweathermap.org/">OpenWeather</a>
      <br />
      Backgrounds from <a href="https://unsplash.com/">Unsplash</a>
      <br />
      <br />
      <br />
      <a href="https://ko-fi.com/S6S51GBT3" target="_blank">
        <img
          src={kofi2}
          className="kofi-button"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
      <br /> <br />
      <div className="white">
        Life's purpose surges, Like the ocean's endless dance, Boundless,
        intertwined.
      </div>
    </div>
  );
}
