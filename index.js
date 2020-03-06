let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

/*
async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  console.log(result[0].className + " : " + result[0].probability);
  document.getElementById('console').innerHTML = `${result[0].className + " : " + result[0].probability}`;
}
*/

/*
async function app() {
    console.log('Loading mobilenet..');
  
    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');
    
    // Create an object from Tensorflow.js data API which could capture image 
    // from the web camera as Tensor.
    const webcam = await tf.data.webcam(webcamElement);
    while (true) {
      const img = await webcam.capture();
      const result = await net.classify(img);
  
      document.getElementById('console').innerText = `
        prediction: ${result[0].className}\n
        probability: ${result[0].probability}
      `;
      // Dispose the tensor to release the memory.
      img.dispose();
  
      // Give some breathing room by waiting for the next animation frame to
      // fire.
      await tf.nextFrame();
    }
  }
*/

async function download() {
    data = await classifier.getClassifierDataset();
    //console.log(data);
    data = {mona : data};
    data = JSON.stringify(data);
<<<<<<< HEAD
    //console.log(data);
    
}

function readSingleFile(e) {
    //console.log(e);
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        classifier.setClassifierDataset(JSON.parse(contents).mona);
    };
    reader.readAsText(file);
=======
    console.log(data);
    function dow(filename,text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
    }
    
      // Generate download of hello.txt file with some content
     // var text = document.getElementById("text-val").value;
     // var filename = "hello.txt";
      
      await dow("jsondata.json", data);
 
>>>>>>> e67603e77d5baf2a10ee8b2fa000ef72ff15e114
}

async function app() {
    console.log('Loading mobilenet..');
  
    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');
  
    // Create an object from Tensorflow.js data API which could capture image 
    // from the web camera as Tensor.
    const webcam = await tf.data.webcam(webcamElement);
  
    // Reads an image from the webcam and associates it with a specific class
    // index.
    const addExample = async classId => {
      // Capture an image from the web camera.
      const img = await webcam.capture();
  
      // Get the intermediate activation of MobileNet 'conv_preds' and pass that
      // to the KNN classifier.
      const activation = net.infer(img, 'conv_preds');
  
      // Pass the intermediate activation to the classifier.
      classifier.addExample(activation, classId);
  
      // Dispose the tensor to release the memory.
      img.dispose();
    };
  
    // When clicking a button, add an example for that class.
    document.getElementById('class-a').addEventListener('click', () => addExample(0));
    document.getElementById('class-b').addEventListener('click', () => addExample(1));
    document.getElementById('class-c').addEventListener('click', () => addExample(2));

    // when clicking download button, download a json file with classifier data
    document.getElementById('down').addEventListener('click',() => download());

    // when clicking upload button, read the file's content and load it to classifier
    document.getElementById('file-input').addEventListener('change', readSingleFile, false);     
  
    while (true) {
      if (classifier.getNumClasses() > 0) {
        const img = await webcam.capture();
  
        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(img, 'conv_preds');
        // Get the most likely class and confidence from the classifier module.
        const result = await classifier.predictClass(activation);
  
        const classes = ['A', 'B', 'C'];
        document.getElementById('console').innerText = `
          prediction: ${classes[result.label]}\n
          probability: ${result.confidences[result.label]}
        `;
  
        // Dispose the tensor to release the memory.
        img.dispose();
      }
  
      await tf.nextFrame();
    }
}

app();