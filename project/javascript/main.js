/*
coding by :
------------------------------------------------------------------------------
--- Full Name     =>    Youssef Zouhri                                     ---
--- Address       =>    moroco, khnefra Dr ait moussa                      ---
--- E-mail        =>    profilede99@gmail.com                              ---
--- Phone         =>    +212641452606                                      ---
------------------------------------------------------------------------------
*/
// function to get element at short code
const el = (element) => {
    return document.querySelector(element);
  },
  els = (e) => {
    return document.querySelectorAll(e);
  };

// create logic function to remove class active && add him to element target
const class_active = (ells, e) => {
  els(ells).forEach((e) => {
    e.classList.contains("active") ? e.classList.remove("active") : false;
  });
  e.classList.add("active");
};

//_________________________ start settings _________________________

// (show || hide setting) && (spin gear)
el(".setting_gear").addEventListener("click", function () {
  this.children[0].classList.toggle("fa-spin");
  el(".settings_box").classList.toggle("open");
  if (option_nav == "fixed") {
    el(".settings_box").classList.toggle("fixed", window.scrollY > 0);
  } else {
    el(".settings_box").classList.remove("fixed");
  }
});

// switch thems (colors)
const colorvalue = ["color", "color_alt1", "color_alt3", "color_alt4"];

// logic function to switch thems
const switch_thems = (e) => {
  for (let index = 0; index < colorvalue.length; index++) {
    document.documentElement.style.setProperty(
      `--main_${colorvalue[index]}`,
      `#${e.target.dataset[`${colorvalue[index]}`]}`
    );
    localStorage.setItem(
      "option_thems",
      `#${e.target.dataset[`${colorvalue[0]}`]}`
    );
  }
};
els(".thems .items").forEach((items) => {
  items.addEventListener("click", (e) => {
    switch_thems(e);
    class_active(".thems .items", items);
  });
});
// check if theres local storage option thems
const local_thems = localStorage.getItem("option_thems");
if (local_thems !== null) {
  els(".thems .items").forEach((e) => {
    "#" + e.dataset.color == local_thems ? e.click() : false;
  });

  // remove class to option  rest options white condition
  local_thems != `#${el(".thems [defualtOption]").dataset.color}`
    ? el(".reset_option").classList.add("active")
    : "";
}
// logic function to stop random background || not
let option_randoms = "true";
els(".random_background .btn").forEach((items) => {
  items.addEventListener("click", () => {
    class_active(".random_background .btn", items);
    if (option_randoms != items.dataset.order) {
      option_randoms = items.dataset.order;
      // set option backgrund to local storage
      localStorage.setItem("background_option", option_randoms);
      fun_random();
    }
  });
});
// check if theres local storage option background randoms
let background_local = localStorage.getItem("background_option");
if (background_local != null) {
  option_randoms = background_local;

  els(".random_background .btn").forEach((e) => {
    e.dataset.order == option_randoms ? e.click() : false;
  });

  // remove class to option  rest options white condition
  background_local != el(".random_background [defualtOption]").dataset.order
    ? el(".reset_option").classList.add("active")
    : "";
}

// create logic function to nav bar fixed
let option_nav = "bullet";
els(".navbars_settings .btn").forEach((items) => {
  items.addEventListener("click", () => {
    class_active(".navbars_settings .btn", items);
    if (option_nav != items.dataset.order) {
      option_nav = items.dataset.order;
    }
    if (el(".bullet") != null) {
      if (option_nav == "fixed") {
        el(".section_header").classList.toggle("fixed", window.scrollY > 0);
        el(".settings_box").classList.toggle("fixed", window.scrollY > 0);
        el(".bullet").classList.add("visible");
      } else {
        el(".bullet").classList.toggle(
          "visible",
          window.scrollY <= el("header").offsetHeight
        );
        el(".section_header").classList.remove("fixed");
        el(".settings_box").classList.remove("fixed");
      }
    }

    // set option backgrund to local storage
    localStorage.setItem("option_nav", items.dataset.order);
  });
});

// chiked if has option nav in local storage
const nav_localstorage = localStorage.getItem("option_nav");
if (nav_localstorage != null) {
  el(`.navbars_settings [data-order="${nav_localstorage}"]`).click();

  // remove class to option  rest options white condition
  nav_localstorage != el(".navbars_settings [defualtOption]").dataset.order
    ? el(".reset_option").classList.add("active")
    : "";
}

// create logic daynamique to option shose with reset option
const option_possibles = [];
els(".option").forEach((option) => {
  option.addEventListener("click", (e) => {
    els(".option .active").forEach((optionActive) => {
      option_possibles.push(optionActive.hasAttribute("defualtOption"));
      if (
        option_possibles.filter((item) => {
          return item == true;
        }).length == els(".option [defualtOption]").length
      ) {
        el(".reset_option").classList.remove("active");
      } else {
        el(".reset_option").classList.add("active");
      }
    });
    option_possibles.length = 0;
  });
});

// reset options
el(".reset_option").addEventListener("click", (e) => {
  if (
    option_randoms != true ||
    local_thems !== null ||
    local_thems !=
      els(".thems .items").hasAttribute("defualtOption").dataset.color ||
    nav_localstorage == "bullet"
  ) {
    localStorage.removeItem(local_thems);
    els(".option [defualtOption]").forEach((item) => {
      item.click();
    });
    e.target.classList.remove("active");
  }
});

//_________________________ end settings _________________________

//_________________________ start landing page _________________________

// show || hide menu nav
el(".icon_bar").addEventListener("click", (e) => {
  e.target.classList.toggle("fa-times");
  e.target.classList.toggle("fa-bars");
  e.target.parentElement.parentElement.classList.toggle("active");
});

// add class active to elment target in nav bar || remove to ather siblings
els(".landing_page .item").forEach((ele) => {
  ele.addEventListener("click", (_) => {
    class_active(".landing_page .item", ele);
    // hide menu bars
    el(".icon_bar").classList.toggle("fa-times");
    el(".icon_bar").classList.toggle("fa-bars");
    el(".landing_page header").classList.remove("active");
    // add class to bullet
    class_active(
      ".bullet .item",
      el(`.bullet [href = "${ele.firstElementChild.getAttribute("href")}"]`)
        .parentElement
    );
  });
});
// create logic random background
let landing_page = el(".landing_page"),
  images = [
    "./image/back/1 (1).jpg",
    "./image/back/1 (2).jpg",
    "./image/back/1 (3).jpg",
    "./image/back/1 (4).jpg",
    "./image/back/1 (5).jpg",
  ];

const fun_random = () => {
  if (option_randoms === "true") {
    background_interval = setInterval((_) => {
      let img_name = images[Math.floor(Math.random() * images.length)];
      //   change background image
      landing_page.style.backgroundImage = `url("${img_name}")`;
      // set url image in local storage
      localStorage.setItem("url_background", `url("${img_name}")`);
    }, 10000);
  } else {
    option_randoms == "false";
    clearInterval(background_interval);
  }
  // chek if theres url backgroung in local storage
  landing_page.style.backgroundImage = localStorage.getItem("url_background");
};
option_randoms === "true" ? fun_random() : "";

//_________________________ end landing page _________________________

//_________________________ start skills page _________________________
// create logic animation to show skills
const animation_skill = (option) => {
  els(".skills .skill_progress span").forEach((span) => {
    option == true
      ? (span.style.width = span.dataset.progress)
      : (span.style.width = "0");
  });
};

//_________________________ end skills page _________________________

//_________________________ start gallery page _________________________
// create logic popup with the img opend
els(".gallery .gallery_container .box_img span").forEach((item) => {
  item.addEventListener("click", () => {
    // create all elments
    const overlay_popup = document.createElement("section"),
      box_img = document.createElement("div"),
      img = document.createElement("img"),
      close_icon = document.createElement("i"),
      title = document.createElement("h4");
    // set  attribute for elemnts create
    overlay_popup.className = "popup_overlay";
    box_img.className = "popup_box";
    close_icon.className = "far fa-window-close fa-fw";
    img.src =
      item.parentElement.parentElement.firstElementChild.getAttribute("src");
    // set textcontent to title
    const alt_img =
      item.parentElement.parentElement.firstElementChild.getAttribute("alt");
    alt_img != ""
      ? (title.textContent = alt_img)
      : (title.textContent = "uknow");
    // append elemnets to parents
    el(".gallery").appendChild(overlay_popup);
    overlay_popup.appendChild(box_img);
    box_img.appendChild(close_icon);
    box_img.appendChild(title);
    box_img.appendChild(img);
    // hide scroll in window
    document.body.classList.add("hide_scroll");
  });
});
// close popup
el(".gallery").addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-window-close")) {
    e.target.parentElement.parentElement.remove();
    // show scroll in window
    document.body.classList.remove("hide_scroll");
  }
});
//_________________________ end gallery page _________________________
//_________________________ start contact page _________________________
// validation forms with RegEx
const patterns = {
  username: /^(\w{2,} )?\w{3,} \w{3,}$/g,
  userphone: /^(00|\+)\d{2,4}\d{9}$/g,
  email: /^\w{1,12}\.?\w*\d*@\w+(\.\w+)+$/g,
  subject: /^(\w{2,}\s?){1,3}$/g,
  message: /^(\w{1,}\d*\s\w{1,}){10,}/g,
};
// data message in errors field
const data_text = {
  username: "- please enter your full name *",
  userphone: '- please enter your phone number exemple : " +21266****66 " *',
  email: "- please enter your E-mail address exemple :exe@gmail.com *",
  subject: "- please enter your subject max 3 words *",
  message: "- please enter your message min 10 words *",
};

// create function for validate form
const validation_form = (field, eventSubmit) => {
  // if field is invalid
  if (field.value.match(patterns[field.name]) == null) {
    field.classList.add("invalide");

    // create test errors after field invaled
    if (field.nextElementSibling == null) {
      const desc = document.createElement("p"),
        content = document.createTextNode(data_text[field.name]);
      field.parentElement.appendChild(desc);
      desc.appendChild(content);
    }

    // prevent default dont submit forms
    eventSubmit.preventDefault();
  } else {
    // if field valide
    field.classList.remove("invalide");

    // remove text errors if field valide
    if (field.nextElementSibling != null) {
      field.nextElementSibling.remove();
    }
  }
};
// on  submit form chiked field if valid or not
el("#contact_submit").addEventListener("click", (e) => {
  els("form .field").forEach((field) => {
    validation_form(field, e);
  });

  // if field not valide on submit  test him in  user change data for yourself
  els("form .invalide").forEach((field) => {
    field.addEventListener("input", (event) => {
      validation_form(event.target, e);
    });
  });
});
//_________________________ end contact page _________________________

//------------------------------------ start  ON EVENT SCROLL ALL IDAE --------------------------------

window.addEventListener("scroll", () => {
  if (
    el(".landing_page header").classList.contains("active") &&
    window.scrollY > 0
  ) {
    // hide menu bars
    el(".icon_bar").click();
  }
  els("body > .section").forEach((section) => {
    let offset_top = section.offsetTop,
      offset_buttom = offset_top + section.offsetHeight,
      scroll_y = window.scrollY;
    if (option_nav == "fixed") {
      el(".section_header").classList.toggle("fixed", window.scrollY > 0);
      offset_top -= 100;
      el(".settings_box").classList.toggle("fixed", window.scrollY > 0);
    } else {
      option_nav == "bullet";
      el(".bullet").classList.toggle(
        "visible",
        window.scrollY <= el("header").offsetHeight
      );
    }
    document.documentElement.classList.toggle(
      "scroll_padding",
      option_nav == "fixed"
    );

    // conect section with nav item and bullet
    if (offset_top - 1 <= scroll_y && scroll_y < offset_buttom) {
      // animation skills
      section.id == "skills" ? animation_skill(true) : animation_skill(false);
      class_active(
        ".bullet .item",
        el(`.bullet [href = "#${section.id}"]`).parentElement
      );

      class_active(
        ".landing_page .item",
        el(`.landing_page [href = "#${section.id}"]`).parentElement
      );
      // to conect whith last section
      if (scroll_y + window.innerHeight == document.body.offsetHeight) {
        class_active(
          ".bullet .item",
          el(`.bullet [href = "#contact"]`).parentElement
        );

        class_active(
          ".landing_page .item",
          el(`.landing_page [href = "#contact"]`).parentElement
        );
      }
    }
  });
});
//------------------------------------ end  ON EVENT SCROLL ALL IDAE --------------------------------

// window.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
// });

//_________________________ start preload  _________________________

window.addEventListener("load", () => {
  document.body.classList.remove("hide_scroll");
  el(".preload").style.display = "none";
});
//_________________________ end preload _________________________

//_________________________ start bullet _________________________
const create_bullet = () => {
  els(".landing_page nav .item");
  // create ul elements
  const ul = document.createElement("ul");
  // set class to ul elemnent
  ul.className = "bullet";
  els(".landing_page nav .item").forEach((item) => {
    // create element bullet
    const li = document.createElement("li"),
      a = document.createElement("a"),
      span = document.createElement("span"),
      text_node = item.firstElementChild.textContent,
      content_a = document.createTextNode(text_node);

    // add tags to elements
    a.href = "#" + `${text_node}`;
    // add class item && active to bullet first
    item.classList.contains("active")
      ? (li.className = "item active")
      : (li.className = "item");

    //  aappendChild to parent
    document.body.appendChild(ul);
    ul.appendChild(li);
    li.appendChild(a);
    li.appendChild(span);
    span.appendChild(content_a);
  });
};
create_bullet();
el(".bullet").classList.toggle("visible", option_nav != "bullet");
el(".bullet").classList.toggle(
  "visible",
  window.scrollY <= el("header").offsetHeight
);

els(".bullet .item").forEach((item) => {
  item.addEventListener("click", (e) => {
    class_active(".bullet .item", e.target.parentElement);
    // add class to bullet
    class_active(
      ".landing_page .item",
      el(`.landing_page nav [href = "${e.target.getAttribute("href")}"]`)
        .parentElement
    );
  });
});
//_________________________ end bullet _________________________
