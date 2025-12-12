let liked_buttons = document.getElementsByClassName("heart-button");
let saved_buttons = document.getElementsByClassName("saved-button");

let liked_songs_list = document.querySelector(".liked-songs");
let saved_songs_list = document.querySelector(".saved-songs");

for (let i = 0; i < liked_buttons.length; i++) {
  liked_buttons[i].addEventListener("click", function(event) {
    event.stopPropagation();
    likeSong.call(this);
  });
}

for (let i = 0; i < saved_buttons.length; i++) {
  saved_buttons[i].addEventListener("click", function(event) {
    event.stopPropagation();
    saveSong.call(this);
  });
}

function likeSong() {
    if (this.classList.contains("clicked")) {
        this.classList.remove("clicked");
        this.src = 'img/heart-love.png';
        
        let li = this.closest("li");
        if (li && liked_songs_list.contains(li)) {
            liked_songs_list.removeChild(li);
        }
    } else {
        this.classList.add("clicked");
        this.src = 'img/heart-love_2.png';
        // Add a clone of the entire parent <li> to liked songs list if not already added
        let li = this.closest("li");
        if (li && liked_songs_list && !liked_songs_list.contains(li)) {
            liked_songs_list.appendChild(li.cloneNode(true));
        }
    }
}

function saveSong() {
    if (this.classList.contains("clicked")) {
        this.classList.remove("clicked");
        this.src = 'img/tab.png';
        let li = this.closest("li");
        if (li && saved_songs_list.contains(li)) {
            saved_songs_list.removeChild(li);
        }
    } else {
        this.classList.add("clicked");
        this.src = 'img/tab_2.png';
        // Add a clone of the entire parent <li> to saved songs list if not already added
        let li = this.closest("li");
        if (li && saved_songs_list && !saved_songs_list.contains(li)) {
            saved_songs_list.appendChild(li.cloneNode(true));
        }
    }
}

let song = document.getElementsByClassName("song");

// for (let i = 0; i < song.length; i++) {
//     song[i].addEventListener("click", playSong);
// }


// function playSong() {
//     if (this.classList.contains("clicked")) {
//         this.classList.remove("clicked");
        
//       }
// }

[...song].forEach(item => {
  item.addEventListener("click", () => {
    window.location.href = "game.html";
  });
});









