function mobileNav() {
    var x = document.getElementById("navLinks");
    if (x.className === "links") {
      x.className += " responsive";
    } else {
      x.className = "links";
    }
  }