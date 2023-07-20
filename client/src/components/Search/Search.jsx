import { useRef, useState } from "react";
import {
  SearchButton,
  SearchInput,
  SearchWrapper,
  SearchBar,
} from "./Search.style";
import searchIcon from "../../assets/find.png";

function Search() {
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);
  const formRef = useRef();
  const inputFocus = useRef();

  const onFormSubmit = (e) => {
    // When form submited, clear input, close the searchbar and do something with input
    e.preventDefault();
    setInput("");
    setBarOpened(false);
    // After form submit, do what you want with the input value
    console.log(`Form was submited with input: ${input}`);
  };

  return (
    <SearchWrapper id="search">
      <SearchBar
        barOpened={barOpened}
        onClick={() => {
          // When form clicked, set state of baropened to true and focus the input
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        // on focus open search bar
        onFocus={() => {
          setBarOpened(true);
          inputFocus.current.focus();
        }}
        // on blur close search bar
        onBlur={() => {
          setBarOpened(false);
        }}
        // On submit, call the onFormSubmit function
        onSubmit={onFormSubmit}
        ref={formRef}
      >
        <SearchButton type="submit" barOpened={barOpened}>
          <img
            src={searchIcon}
            style={{
              height: "18px",
              width: "18px",
              paddingLeft: "3px",
              paddingTop: "3px",
            }}
          />
        </SearchButton>
        <SearchInput
          onChange={(e) => setInput(e.target.value)}
          ref={inputFocus}
          value={input}
          barOpened={barOpened}
          placeholder="Search..."
        />
      </SearchBar>
    </SearchWrapper>
  );
}

export default Search;
