
// Get the canvas element and its 2D context.
// "canvas" elementini al ve onun 2D bağlamını elde et.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Set the canvas width and height to match the window's inner width and height.
// Canvas'in genişliğini ve yüksekliğini pencerenin iç genişliği ve yüksekliğine uygun olarak ayarla.
let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;


// Add a resize event listener to adjust the canvas size when the window is resized.
// Pencere boyutu değiştiğinde canvas boyutunu ayarlamak için bir yeniden boyutlandırma olay dinleyici ekle.
window.addEventListener(
  "resize",
  function (event) {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
    maxColumns = cw / fontSize;
    console.log(cw, ch);
  },
  true
);


// Define an array containing characters to be used for falling animation.
// Düşme animasyonu için kullanılacak karakterleri içeren bir dizi tanımla.
let charArr = [
  "ア", "イ", "ウ", "エ", "オ",
  "カ", "キ", "ク", "ケ", "コ",
  "サ", "シ", "ス", "セ", "ソ",
  "タ", "チ"," ツ", "テ", "ト",
  "ナ", "ニ", "ヌ", "ネ", "ノ",
  "ハ", "ヒ", "フ", "ヘ", "ホ",
  "マ", "ミ", "ム", "メ", "モ",
  "ヤ", "ユ" ,"ヨ",
  "ラ", "リ", "ル", "レ", "ロ",
  "ワ" ,"ヰ", "ヱ", "ヲ",
  "ン",
];
// Define the maximum number of falling characters and an array to hold the FallingChar objects.
// Düşen karakterlerin maksimum sayısını ve FallingChar nesnelerini tutmak için bir dizi tanımla.
let maxCharCount = 300;
let fallingCharArr = [];

// Set the font size for the falling characters and calculate the maximum number of columns.
// Düşen karakterler için yazı tipi boyutunu belirle ve maksimum sütun sayısını hesapla.
let fontSize = 15;
let maxColumns = cw / fontSize;

// Initialize the frame counter.
// Çerçeve sayacını başlat.
let frames = 0;

// Define the falling speed for the characters.
// Karakterlerin düşme hızını tanımla.
let charFallingSpeed = 0.5; // Adjust this value for slower or faster falling.



// Define the FallingChar class that represents a falling character.
// Düşen bir karakteri temsil eden FallingChar sınıfını tanımla.
class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    // Randomly select a character from the charArr to display.
    // charArr'dan rastgele bir karakter seçerek gösterilecek karakteri belirle.
    this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();

    // Calculate the falling speed for the character.
    // Karakterin düşme hızını hesapla.
    this.speed = (Math.random() * fontSize * 2) / 1 + (fontSize * 3) /10;

    // Set the font style and color to draw the character.
    // Karakteri çizmek için yazı tipi stilini ve rengini ayarla.
    ctx.fillStyle = "rgba(0, 255, 0,0.8)";
    ctx.font = fontSize + "px sans-serif";

    // Draw the character at its current position (x, y).
    // Karakteri mevcut konumunda (x, y) çiz.
    ctx.fillText(this.value, this.x, this.y);

    // Update the y-coordinate of the character to make it fall.
    // Karakterin y-koordinatını güncelleyerek düşmesini sağla.
    this.y += charFallingSpeed * this.speed;


    // If the character reaches the bottom of the canvas, reset its position to the top and randomize its x-coordinate.
    // Eğer karakter canvas'in altına ulaşırsa, pozisyonunu tekrar üste al ve x-koordinatını rastgele belirle.
    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 2) / 1 + (fontSize * 3) / 10;
    }
  }
}

// Define the update function to handle the animation and draw falling characters.
// Animasyonu yönetmek ve düşen karakterleri çizmek için update fonksiyonunu tanımla.
let update = () => {
  // If the number of falling characters is less than the maximum count, create a new FallingChar object and add it to the array.
  // Eğer düşen karakterlerin sayısı maksimum sayıdan azsa, yeni bir FallingChar nesnesi oluştur ve dizine ekle.
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * ch) / 2 - 50
    );
    fallingCharArr.push(fallingChar);
  }
    // Set the background color with a low opacity to create a fading effect.
  // Solma efekti oluşturmak için düşük opaklıkta arka plan rengini ayarla.
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, cw, ch);

  // Loop through the fallingCharArr and call the draw method for each falling character every other frame.
  // fallingCharArr dizisinde döngü yap ve her iki çerçevede bir her düşen karakter için draw yöntemini çağır.
  for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
    fallingCharArr[i].draw(ctx);
  }

  // Request the next animation frame to continue the animation loop.
  // Animasyon döngüsünü sürdürmek için bir sonraki animasyon çerçevesini iste.
  requestAnimationFrame(update);
  frames++;
};

// Start the animation loop by calling the update function.
// update fonksiyonunu çağırarak animasyon döngüsünü başlat.
update();