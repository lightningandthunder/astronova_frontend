import React from "react";

import "./Faq.scss";

export default function Faq(props) {
  return (
    <div className={"Faq"}>
      <h4 className={"FaqHeader"}>What is Nova?</h4>
      <p>
        Nova is a lightweight, focused, and powerful personal astrological tool for the study of
        sidereal astrology. There were three primary goals in its creation:
      </p>
      <ol>
        <li>to remove the price barrier that prevents many aspiring students from using quality software</li>
        <li>to provide veterans with powerful features not found in other software - and make it mobile-friendly</li>
        <li>to create a tool dedicated specifically to sidereal astrology,
                    focusing on the calculations and visualizations that are unique to that line of study.</li>
      </ol>
      <h4 className={"FaqHeader"}>What is Nova best used for?</h4>
      <p>
        This tool is best used for frequent spot-checking of personal charts or transits,
        particularly in batches (read as: a few dozen charts at once).
        Since it does not have remote storage, you’re unlikely to amass a huge library of charts
        in this tool the way you might with some others.
        In other words, this is a calculator, not a phone book.
      </p>

      <h4 className={"FaqHeader"}>Who maintains and develops Nova?</h4>
      <p>
        <a
          href="https://www.linkedin.com/in/mikepverducci/"
          target="_blank"
          rel="noopener noreferrer"
        >Just me</a>!
        I’m a professional software developer and a student of astrology.
      </p>

      <h4 className={"FaqHeader"}>Is Nova free to use?</h4>
      <p>
        Yes. That’s the entire point. In the distant future,
        there may be additional features that are part of a premium plan,
        but in any case,
        the features you see now are and will always be free.
      </p>

      <h4 className={"FaqHeader"}>Where can I learn more about sidereal astrology?</h4>
      <p>
        I enthusiastically recommend <a
          href="http://www.solunars.com"
          target="_blank"
          rel="noopener noreferrer"
        >solunars.com</a>.
        While I am in no way formally affiliated with that forum, I am a frequent participant there,
        and it is managed by a good friend and mentor of many years.
      </p>
      <h4 className={"FaqHeader"}>How do charts get saved?</h4>
      <p>
        Nova uses in-browser storage to hang onto your chart data so it persists between sessions.
        This allows you to have continuity between sessions without Nova needing a remote database.
        Be aware that if you clear your cache, you reset Local Storage, and it will wipe your charts.
        That’s not necessarily a reason not to do it, but it is something to be prepared for.
        Also note that using Incognito in Chrome or an equivalent mode will prevent saving data
        to Local Storage.
      </p>

      <h4 className={"FaqHeader"}>What happens to my data?</h4>
      <p>
        Literally nothing. The back end doesn’t persist any data.
        The information used for chart calculation is completely non-personal -
        even the name you give to each chart doesn’t get included in the calculation pipeline -
        and no personal data is logged anywhere, although errors are logged with sufficient information
        to reproduce the issue.  I have no interest in your personal info and
        really don’t want to keep it anywhere.
      </p>

      <h4 className={"FaqHeader"}>I’m a developer. Is this project open source?</h4>
      <ul>
        <li><a href="http://www.github.com/lightningandthunder/nova_ui" target="blank">Here's the front end (React)</a></li>
        <li><a href="http://www.github.com/lightningandthunder/nova_api" target="blank">Here's the back end (Python)</a></li>
      </ul>

      <h4 className={"FaqHeader"}>How can I report bugs or give feedback?</h4>
      <p>
        <a href="http://google.com"> Send me an email</a>. if you’re reporting a bug, please give as much information
        as you can about how it occurred, including what browser and browser version you’re using.
      </p>
      <h4 className={"FaqHeader"}>What’s the future of Nova?</h4>
      <p>
        I work on Nova in my spare time, and so updates come as I have bandwidth to make them.
        If you're interested in the roadmap for future updates, take a look at the Github links above.
      </p>

      <h4 className={"FaqHeader"}>How can I support the Nova project?</h4>
      <ul>
        <li>Test out my work and let me know if there are any bugs I missed.</li>
        <li>Tell your friends about Nova.</li>
        <li>Or, you could <a
          href="https://ko-fi.com/lightningandthunder"
          target="blank"
        >buy me a coffee :)</a>
        </li>
      </ul>
    </div>
  )
}