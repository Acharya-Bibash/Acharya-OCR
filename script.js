const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const darkToggle = document.getElementById('darkToggle');

document.getElementById('start-camera').onclick = async function () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: "environment" } }
        });
        video.srcObject = stream;
    } catch (err) {
        alert('Camera access denied or not found: ' + err);
    }
};

document.getElementById('capture').onclick = function () {
    canvas.width = video.videoWidth * 2;
    canvas.height = video.videoHeight * 2;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    Tesseract.recognize(canvas, 'eng', {
        logger: m => console.log(m)
    }).then(result => {
        output.textContent = result.data.text.trim();
    }).catch(err => {
        output.textContent = 'Error: ' + err;
    });
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
