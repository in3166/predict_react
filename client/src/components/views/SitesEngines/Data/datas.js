const rand = [];
const max = 95;
const min = 15;
for (let i = 0; i < 20; i += 1) {
  const randomNum = Math.random() * (max - min + 1) + min;
  const randomNumFloor = Math.floor(randomNum);
  rand.push(randomNumFloor);
}

const datas = {
  chartData: {
    labels: ['', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Dataset',
        data: rand,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      // {
      //   label: 'Second dataset',
      //   data: [33, 25, 35, 51, 54, 76],
      //   fill: false,
      //   borderColor: '#742774',
      // },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,
    // tooltips 사용시
    tooltips: {
      enabled: true,
      mode: 'nearest',
      position: 'average',
      intersect: false,
    },
    scales: {
      xAxes: [
        {
          //   position: "top", //default는 bottom
          display: true,
          scaleLabel: {
            display: true,
            // labelString: 'Step',
            fontFamily: 'Montserrat',
            fontColor: 'black',
          },
          ticks: {
            // beginAtZero: true,
            maxTicksLimit: 10, // x축에 표시할 최대 눈금 수
          },
        },
      ],
      yAxes: [
        {
          display: true,
          //   padding: 10,
          scaleLabel: {
            display: true,
            labelString: 'Coverage',
            fontFamily: 'Montserrat',
            fontColor: 'black',
          },
          ticks: {
            beginAtZero: true,
            stepSize: 20,
            min: 0,
            max: 100,
            // y축 scale 값에 % 붙이기 위해 사용
            callback(value) {
              return `${value}%`;
            },
          },
        },
      ],
    },
  },

  legend: {
    display: true,
    labels: {
      fontColor: 'black',
    },
    position: 'top', // label를 넣어주지 않으면 position이 먹히지 않음
  },
};

export default datas;
