// DOM Elements 
const folders = document.querySelectorAll(".folder");
const musicLibrary = document.querySelector(".music-library");
const artistLibrary = document.querySelector(".artist-library");
const songLibrary = document.querySelector(".song-library");
const musicPlayer = document.querySelector(".music-player");

const artistList = document.querySelector(".artist-list");
const songsContainer = document.querySelector(".songs");
const backToLibraryButton = document.getElementById("back");

const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progressBar = document.getElementById("progress");
const volumeBar = document.getElementById("volume");

let currentFolder = null;
let currentArtist = null;
let currentSongs = [];
let currentSongIndex = 0;

const audioElement = document.createElement("audio");
let isPlaying = false;

// Music Data
const folderSongs = {
  indian: {
    "Atif Aslam": [
      { title: "Atif Aslam - Aadat", artist: "Atif Aslam", src: "song1.mp3", cover: "atif-aslam.jpg" },
      { title: "Atif Aslam - Jeene Laga Hoon", artist: "Atif Aslam", src: "atif2.mp3", cover: "atif-aslam.jpg" },
      { title: "Atif Aslam - Tera Hone Laga Hoon", artist: "Atif Aslam", src: "atif3.mp3", cover: "atif-aslam.jpg" },
      { title: "Atif Aslam - Tu Jaane Na", artist: "Atif Aslam", src: "atif4.mp3", cover: "atif-aslam.jpg" }
    ],
    "Arijit Singh": [
      { title: "Arijit Singh - Tum Hi Ho", artist: "Arijit Singh", src: "Aj1.mp3", cover: "arijit.jpg" },
      { title: "Arijit Singh - Kheriyat", artist: "Arijit Singh", src: "Aj2.mp3", cover: "arijit.jpg" },
    ],
  },
  english: {
    "Ed Sheeran": [
      { title: "Ed Shreen - Shape of You", artist: "Ed Sheeran", src: "ed1.mp3", cover: "edsheeran.jpg" },
      { title: "Ed Shreen - Perfect", artist: "Ed Sheeran", src: "ed2.mp3", cover: "edsheeran.jpg" }
    ],
    "Michael Jackson" :[
        {title: "Michael Jackson - Beat It", artist: "Michael Jackson", src: "Mj1.mp3", cover: "Michael.jpg"},
        {title: "Michael Jackson - Billie Jean", artist: "Michael Jackson", src: "Mj2.mp3", cover:"Michael.jpg"}
    ]
  },
  pakistani: {
    "Nusrat Fateh Ali Khan": [
      { title: "NFAK - Dillagi", artist: "Nusrat Fateh Ali Khan", src: "nfak2 (1).mp3", cover: "nfak.jpg" },
      { title: "NFAK - Afreen Afreen", artist: "Nusrat Fateh Ali Khan", src: "nfak2 (2).mp3", cover: "nfak.jpg" },
    ],
      "Atif Aslam": [
        { title: "Atif Aslam - Aadat", artist: "Atif Aslam", src: "song1.mp3", cover: "atif-aslam.jpg" },
        { title: "Atif Aslam - Jeene Laga Hoon", artist: "Atif Aslam", src: "atif2.mp3", cover: "atif-aslam.jpg" },
        { title: "Atif Aslam - Tera Hone Laga Hoon", artist: "Atif Aslam", src: "atif3.mp3", cover: "atif-aslam.jpg" },
        { title: "Atif Aslam - Tu Jaane Na", artist: "Atif Aslam", src: "atif4.mp3", cover: "atif-aslam.jpg" }
      ],
  },
  punjabi: {
    "Diljit Dosanjh" : [
      {title: "Diljit Dosanjh - Dil Tainu", artist: "Diljit Dosanjh", src: "dilj.mp3", cover: "diljit.jpg"},
      {title: "Diljit Dosanjh - Naina", artist: "Diljit Dosanjh", src: "dilj1.mp3", cover: "diljit.jpg"},
      {title: "Diljit Dosanjh - G.O.A.T", artist: "Diljit Dosanjh", src: "dilj2.mp3", cover: "diljit.jpg"},
    ],
    "Sidhu Moosewala" :[
      {title: "Sidhu Moosewala - 47", artist: "Sidhu MooseWala", src: "Sidhu.mp3", cover: "sidhu.jpg"},
      {title: "Sidhu Moosewala - Same Beef", artist: "Sidhu MooseWala & Bohemia", src: "Sidhu1.mp3", cover: "sidhu.jpg"},
      {title: "Sidhu Moosewala - 295", artist: "Sidhu MooseWala", src: "Sidhu2.mp3", cover: "sidhu.jpg"},
    ]
  }
};

// Display Artist List
folders.forEach((folder) => {
  folder.addEventListener("click", () => {
    currentFolder = folder.dataset.folder;
    const artists = Object.keys(folderSongs[currentFolder]);

    artistList.innerHTML = ""; // Clear existing artists
    artists.forEach((artist) => {
      const li = document.createElement("li");
      li.textContent = artist;
      li.addEventListener("click", () => {
        currentArtist = artist;
        currentSongs = folderSongs[currentFolder][currentArtist];
        displaySongs();
      });
      artistList.appendChild(li);
    });

    musicLibrary.classList.add("hidden");
    artistLibrary.classList.remove("hidden");
  });
});

// Display Songs
function displaySongs() {
  songsContainer.innerHTML = ""; // Clear previous songs
  currentSongs.forEach((song, index) => {
    const songBox = document.createElement("div");
    songBox.className = "song-box";
    songBox.innerHTML = `
      <div>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    `;
    songBox.addEventListener("click", () => {
      currentSongIndex = index;
      playSong();
      musicPlayer.classList.remove("hidden");
      songLibrary.classList.add("hidden");
    });
    songsContainer.appendChild(songBox);
  });

  artistLibrary.classList.add("hidden");
  songLibrary.classList.remove("hidden");
}

// Play Song
function playSong() {
  const song = currentSongs[currentSongIndex];
  document.getElementById("title").textContent = song.title;
  document.getElementById("artist").textContent = song.artist;
  document.getElementById("cover").src = song.cover;

  audioElement.src = song.src;
  audioElement.load();  // Make sure the audio is loaded
  audioElement.play();  // Play the song
  isPlaying = true;
  updatePlayPauseButton();
}

// Play/Pause Button Functionality
playButton.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    isPlaying = true;
    updatePlayPauseButton();
  }
});

pauseButton.addEventListener("click", () => {
  audioElement.pause();
  isPlaying = false;
  updatePlayPauseButton();
});

// Update Play/Pause Button Visibility
function updatePlayPauseButton() {
  if (isPlaying) {
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
  } else {
    playButton.style.display = "inline";
    pauseButton.style.display = "none";
  }
}

// Next/Previous Song Functionality
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % currentSongs.length;
  playSong();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + currentSongs.length) % currentSongs.length;
  playSong();
});

// Back Buttons
document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!artistLibrary.classList.contains("hidden")) {
      artistLibrary.classList.add("hidden");
      musicLibrary.classList.remove("hidden");
    } else if (!songLibrary.classList.contains("hidden")) {
      songLibrary.classList.add("hidden");
      artistLibrary.classList.remove("hidden");
    }
  });
});

backToLibraryButton.addEventListener("click", () => {
  musicPlayer.classList.add("hidden");
  musicLibrary.classList.remove("hidden");
});

// Progress Bar
audioElement.addEventListener("timeupdate", () => {
  progressBar.value = (audioElement.currentTime / audioElement.duration) * 100 || 0;
});

progressBar.addEventListener("input", () => {
  audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});

// Volume Control
volumeBar.addEventListener("input", () => {
  audioElement.volume = volumeBar.value;
});
