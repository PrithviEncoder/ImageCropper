 
//global elements
 let fileInput = document.querySelector("#myfile");
 let image = document.querySelector(".img");
 let croppedImage = document.querySelector(".cropped-image");
 let button = document.querySelector("#input");
 let doc = document.querySelector(".doc");
 let dwnBtn = document.querySelector('.download');
 let saveBtn = document.querySelector('.save');
 let preview=document.querySelector('#preview');
let previewBox = document.querySelector(".preview-device");
 //global variable

 let cropper;
 let croppedImageUrl = "";

 //adding classes
 fileInput.classList.add('hidden');
 dwnBtn.classList.add('hidden');
 saveBtn.classList.add('hidden');

 // console.log(fileInput)

 //fileInput.files is a array so give index and see properties in console ,one is name .

 // console.log(fileInput.files[0].name);

 //event listener on change of file or on new file load
 fileInput.addEventListener("change", (event) => {

   

     const file = event.target.files[0];

     //if file is there without problem then "file" will give true in 'if' else undefined
     if (file) {
         const fileDetails = `
     File Name: ${file.name}
     File Size: ${file.size} bytes
     File Type: ${file.type}
     Last Modified: ${file.lastModifiedDate}`;

        //  document.querySelector("#details").textContent = fileDetails;

         //read the file
         const reader = new FileReader();

         //onload is initiated early since when url is read then instantly image will be there on screen
         reader.onload = function (e) {
             //e.target is "reader"  
             image.src = e.target.result;
             // console.log("after load",reader)

             //Cropper .it will take img element as input
             //initialize cropper only on image onload
             image.onload = () => {
                 if (cropper) {
                     cropper.destroy();//destroy existing cropper if present
                 }
                 cropper = new Cropper(image);
                 saveBtn.classList.remove('hidden');
             }
         }

         //    console.log("before load",reader)
         reader.readAsDataURL(file);//only read not return so to get url "reader.result"
     }
     else {
         document.querySelector("#details").textContent = "No file Selected";
     }
 });


//onclick of save button
 saveBtn.addEventListener("click", (event) => {
     if (cropper) {
         //get the cropped canvas and convert it to a data URL
         const canvas = cropper.getCroppedCanvas();
         croppedImageUrl = canvas.toDataURL();//Get the cropped imaage URL

         //print image on screen
         croppedImage.src = croppedImageUrl;

         //now enable download button
         dwnBtn.classList.remove('hidden');
         previewBox.style.border = "1px solid grey";
         previewBox.style.backround = "red";

     }
     else {
         console.log("Cropper not initializes or no image available");
     }
 })


//on click of download button
 dwnBtn.addEventListener('click', (event) => {
     let a = document.createElement('a');
     console.log(a);
     a.href = croppedImageUrl;
     a.download = fileInput.files[0].name;
     // console.log(reader.files[0].name)
     //append child is not necessary
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
 })



