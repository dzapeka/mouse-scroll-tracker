const ctx = document.getElementById('scrollChart').getContext('2d');

// Initialize chart data and configuration
const scrollData = {
  labels: [],
  datasets: [
    {
      label: 'Mouse Scroll Event',
      data: [],
      pointBackgroundColor: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 1,
    },
  ],
};

const scrollChart = new Chart(ctx, {
  type: 'line',
  data: scrollData,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Event Count',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Scroll Delta',
        },
      },
    },
  },
});

let eventCount = 0;
let scrollUpCount = 0;
let scrollDownCount = 0;

function handleScroll(event) {
  eventCount++;
  const scrollDelta = event.deltaY;

  // Update direction counters
  if (scrollDelta > 0) {
    scrollDownCount++;
    document.getElementById('scrollDownCount').textContent = scrollDownCount;
  } else {
    scrollUpCount++;
    document.getElementById('scrollUpCount').textContent = scrollUpCount;
  }

  // Add data to the chart and limit to 100 points
  if (scrollChart.data.labels.length > 100) {
    scrollChart.data.labels.shift();
    scrollChart.data.datasets[0].data.shift();
    scrollChart.data.datasets[0].pointBackgroundColor.shift();
  }

  scrollChart.data.labels.push(eventCount);
  scrollChart.data.datasets[0].data.push(scrollDelta);

  // Set point color based on scroll direction
  const pointColor = scrollDelta > 0 ? 'red' : 'green';
  scrollChart.data.datasets[0].pointBackgroundColor.push(pointColor);

  scrollChart.update();
}

function clearChart() {
  scrollChart.data.labels = [];
  scrollChart.data.datasets[0].data = [];
  scrollChart.data.datasets[0].pointBackgroundColor = [];
  eventCount = 0;
  scrollUpCount = 0;
  scrollDownCount = 0;
  document.getElementById('scrollUpCount').textContent = 0;
  document.getElementById('scrollDownCount').textContent = 0;
  scrollChart.update();
}

document.addEventListener('wheel', handleScroll);
