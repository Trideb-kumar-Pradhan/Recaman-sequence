const scale = 10; 

const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#rangeInput');
const rangeValueDiv = document.querySelector('#rangeValue');

const ctx = canvas.getContext("2d");

const sequence = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62,
    42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78, 38,
    79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29, 88, 28, 89, 27, 90, 26, 91
];

const drawArc = (x1, x2, direction) => {
    const centerY = canvas.height / 2;
    const radius = Math.abs(x2 - x1) / 2;
    const centerX = (x1 + x2) / 2;
    let startY, endY;

    if (direction === 'up') {
        startY = centerY - radius;
        endY = centerY + radius;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI, true); 
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x1, centerY - radius); 
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    } else { 
        startY = centerY + radius;
        endY = centerY - radius;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI, false); 
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
};

const drawRecaman = (upToIndex) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerY = canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    for (let i = 1; i <= upToIndex; i++) {
        const x1 = sequence[i - 1] * scale;
        const x2 = sequence[i] * scale;
        drawArc(x1, x2, i % 2 === 0 ? 'down' : 'up');
    }
};

const onInputChangeHandler = (value) => {
    rangeValueDiv.innerText = value;
    drawRecaman(Number(value));
};

rangeInput.addEventListener('input', e => onInputChangeHandler(e.target.value));

drawRecaman(65);