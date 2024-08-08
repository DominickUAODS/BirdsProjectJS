document.getElementById('statistic-btn').addEventListener('click', function() {
    const leftContainer = document.querySelector('.left-container');
    const leftContainerStat = document.querySelector('.left-container-stat');

    if (leftContainerStat.style.display === 'block' || leftContainerStat.style.display === '') {
        leftContainerStat.style.display = 'none';
        leftContainer.style.display = 'block';
    } else {
        leftContainerStat.style.display = 'block';
        leftContainer.style.display = 'none';
    }
});

window.onload = function() {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setInterval(function() {
          preloader.classList.add('preloader-hidden');
    }, 5000);
}