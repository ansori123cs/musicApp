$(document).ready(function () {
  const audioPlayer = $('#audioPlayer')[0];
  const seekBar = $('#seekBar');

  $('#playButton').click(function () {
    audioPlayer.play();
  });

  $('#pauseButton').click(function () {
    audioPlayer.pause();
  });

  audioPlayer.ontimeupdate = function () {
    const value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.val(value);
  };

  seekBar.on('input', function () {
    const time = (seekBar.val() * audioPlayer.duration) / 100;
    audioPlayer.currentTime = time;
  });

  $('#loadMusic').click(function () {
    $.ajax({
      url: 'URL_API_ANDA', // Ganti dengan URL API Anda
      method: 'GET',
      success: function (data) {
        // Asumsikan data dari API memiliki properti 'musicUrl'
        const musicUrl = data.musicUrl;
        $('#audioSource').attr('src', musicUrl);
        audioPlayer.load(); // Meload ulang audio player dengan sumber baru
      },
      error: function (error) {
        console.error('Error fetching music:', error);
      },
    });
  });
});
