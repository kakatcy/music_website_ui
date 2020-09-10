# UI Repo
This is the UI code for music website, for API code and project Readme, visit: <br> https://github.com/kakatcy/music_website_api


## Notes:

* If `npm start` failed with below error:
  ```
  Attempting to bind to HOST environment variable: x86_64-apple-darwin13.4.0
  If this was unintentional, check that you haven't mistakenly set it in your shell.
  Learn more here: https://bit.ly/CRA-advanced-config

  events.js:292
      throw er; // Unhandled 'error' event
      ^

  Error: getaddrinfo ENOTFOUND x86_64-apple-darwin13.4.0
  ```
  Run `unset HOST` in terminal and try again

* There is a Warning when use react-bootstrap Dropdown
  ```
  Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node
  ```

  Commented `<React.StrictMode>` in `index.js`. There are some other solutions in this link: https://medium.com/trabe/getting-rid-of-finddomnode-method-in-your-react-application-a0d7093b2660