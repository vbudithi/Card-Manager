import React, { useState, useRef, useEffect } from "react";
import { searchFilter } from "./Filter";
import "./style.css";

const list = [
  { id: 1, name: "Tom", type: "tom@gmail.com", phone:"+918888888888" ,  imageUrl: "https://randomuser.me/api/portraits/med/men/1.jpg" },
  { id: 2, name: "Chris", type: "chris@gmail.com" , phone:"+917777777777", imageUrl: "https://randomuser.me/api/portraits/med/men/2.jpg"  },
  { id: 3, name: "Luke", type: "luke@gmail.com", phone : "+916666666666" , imageUrl: "https://randomuser.me/api/portraits/med/men/3.jpg"  },
  { id: 4, name: "James", type: "james@gmail.com", phone:"+916666666666" , imageUrl: "https://randomuser.me/api/portraits/med/men/4.jpg"  },
  { id: 5, name: "Harry", type: "harry@gmail.com", phone:"+915555555555" , imageUrl: "https://randomuser.me/api/portraits/med/men/5.jpg"  },
  { id: 6, name: "Jerry", type: "jerry@gmail.com", phone:"+919494949494" , imageUrl: "https://randomuser.me/api/portraits/med/men/6.jpg"  },
  { id: 7, name: "Hanson", type: "hanson@gmail.com", phone:"+9393939393" , imageUrl: "https://randomuser.me/api/portraits/med/men/7.jpg"  },
  { id: 8, name: "Harry", type: "harry@gmail.com", phone:"+912929292929" , imageUrl: "https://randomuser.me/api/portraits/med/men/8.jpg"  },
  
];

const DropdownItems = () => {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  // click away listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  }, []);

  const handleClick = (e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (!visible) {
      setVisible(true);
    }
  };

  const selectItem = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item.id);
    setVisible(false);
  };

  const selectChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="container">
      <div tabIndex="0" className="input_container">
        <div className="main-text">
          You can also invite upto three people to join
        </div>
        <br />
        <input
          className="input"
          type="text"
          placeholder="Search members in your contact"
          value={searchValue}
          onChange={handleChange}
          onFocus={() => {
            // if (searchValue) {
            setVisible(true);
            // };
          }}
        />
      </div>

      <div ref={dropdownRef} className={`dropdown ${visible ? "v" : ""}`}>
        {visible && (
          <ul>
            {!list && (
              <li key="zxc" className="dropdown_item">
                no result
              </li>
            )}
            {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
            {list &&
              searchFilter(searchValue, list).map((x) => (
                <li
                  key={x.id}
                  onClick={() => selectItem(x)}
                  className="dropdown_item"
                > 
                <div className ="container1">  
                   <img
                        className="item_image"
                        src={x.imageUrl}
                        alt="users profile"
                   />  
                    <div className="item_wrapper">
                      <div className="item_name">
                        {x.name}
                      </div>
                      <div className="item_mail">
                        {x.type}/{x.phone}
                      </div> 
                    </div>
                    <div className="main_button">
                      <button className="invite_button" type="button">           
                      + Invite   
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      <br />
    
      <div class="buttons">
        <button class="button" type="button">
          Next
        </button>
      </div>
      <br />
      <br />
      <div className="small-text">
        <strong>skip this step here </strong>and invite people later from the
        user profile.
      </div>
    </div>
  );
};

export default DropdownItems;
