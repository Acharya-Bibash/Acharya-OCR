const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const darkToggle = document.getElementById('darkToggle');

document.getElementById('start-camera').onclick = async function () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert('Camera access denied: ' + err);
    }
};

document.getElementById('capture').onclick = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    Tesseract.recognize(canvas, 'eng')
        .then(result => output.textContent = result.data.text)
        .catch(err => output.textContent = 'Error: ' + err);
};

document.getElementById('copyText').onclick = function () {
    const text = output.textContent;
    if (text.trim()) {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
    } else {
        alert('No text to copy.');
    }
};

darkToggle.onchange = function () {
    document.body.classList.toggle('dark', this.checked);
};
