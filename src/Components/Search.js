import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import "./style.css";
import styled from 'styled-components';

const Wrapper = styled.div`
  body {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px;
    transform: translateY(100px);
  }
    .search-tags {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      min-height: 48px;
      background-color:#bfbfbf;
      padding: 0 8px;
      border: 1px solid rgb(214, 216, 218);
      border-radius: 6px;
    }
    .search-container{
        width: 90%;
        margin: 5%;
    }
  &:hover{
      .search-tags{
          border: 0.04rem solid(0,0,0,0.2);
          box-shadow:2px 12px 18px -6px rgba(0,0,0,0.3);
      }
    } 

    @media screen and (max-width: 505px) {
      .search-tags{  
        background-color:#ccffdd;
        border-radius: 15px;
        border: 1px solid #66ff99;
      }
    }

  .search-tags:focus-within {
    border: 1px solid #0052cc;
  }

  #tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
  }

  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 0 8px;
    list-style: none;
    background-color: #0052cc;
    margin: 0 5px;
    border-radius: 16px;
  }

  input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding-left: 35px;
    background-color: #F5F5F5;
    box-shadow: 2px 3px 5px 1px rgba(0,0,0,0.1);
  }

  input:focus {
    outline: transparent;
  }
  .tag-title {
    margin-top: 3px;
  }
  .tag-close-icon {
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 14px;
    margin-left: 8px;
    color: #0052cc;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
  .auto-complete {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin-top: 5px;
  }
  .result {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
  }

  .list-button {
    margin: 5px;
    padding: 5px;
    border-radius: 16px;
  }
`;

function Search() {
  const [searchTags, setSearchTags] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const inputRef = useRef();
  const ulRef = useRef();

  useEffect(() => {
    const pokemon = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    Promise.all(promises).then((pokemonArr) => {
      return pokemonArr.map((value) =>
        value
          .json()
          .then(({ name, sprites: { front_default: sprite } }) =>
            pokemon.push({ name, sprite })
          )
      );
    });
    setOptions(pokemon);
  }, []);
  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      ulRef.current.style.display = "flex";
    });
    document.addEventListener("click", (event) => {
      ulRef.current.style.display = "none";
    });
  }, []);

  const addSearchTags = (event) => {
    if (
      (event.keyCode === 32 || event.keyCode === 13) &&
      event.target.value !== ""
    ) {
      setSearchTags([...searchTags, event.target.value]);
      event.target.value = null;
    }
  };
  const removeTags = (indexToRemove) => {
    setSearchTags(searchTags.filter((_, index) => index !== indexToRemove));
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(searchTags);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSearchTags(items);
  };
  const onInputChange = (event) => {
    setSearchWord(event.target.value);
  };
  return (
    <Wrapper>
      <div className="search-container">
        <div className="search-tags">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="search-tags">
              {(provided) => (
                <ul
                  id="tags"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {searchTags.map((tag, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className="tag"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <span className="tag-title">{tag}</span>
                          <span
                            className="tag-close-icon"
                            onClick={() => removeTags(index)}
                          >
                            x
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

        <input
          type="text"
          placeholder="Search Card"
          onKeyDown={addSearchTags}
          onChange={onInputChange}
          ref={inputRef}
        />
      </div>
      {searchWord.length > 0 ? (
        <div className="auto-complete" ref={ulRef}>
          <div className="suggestions">
            <h3>Most Popular</h3>
            <ul className="results">
              {options
                .filter(
                  ({ name }) => name.indexOf(searchWord.toLowerCase()) > -1
                )
                .map((v, i) => {
                  return (
                    <button
                      key={i}
                      className="list-button"
                      onClick={(e) => {
                        setSearchTags([...searchTags, v.name]);
                        inputRef.current.value = "";
                      }}
                    >
                      {v.name}
                    </button>
                  );
                })}
            </ul>
          </div>
          <div className="suggestions">
            <h3>Recommended for you</h3>
            <ul className="results">
              {options
                .filter(
                  ({ name }) => name.indexOf(searchWord.toLowerCase()) > -1
                )
                .map((v, i) => {
                  return (
                    <button
                      key={i}
                      className="list-button"
                      onClick={(e) => {
                        setSearchTags([...searchTags, v.name]);
                      }}
                    >
                      {v.name}
                    </button>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : (
        <div ref={ulRef}></div>
      )}
      </div>
    </Wrapper>

  );
}

export default Search;
