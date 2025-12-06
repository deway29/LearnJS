// menu.js
import { kalkulator } from './rumus.js';
import readline from 'readline';

// Membuat interface untuk input dari terminal
const inputUser = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Input angka pertama
inputUser.question('Masukkan angka pertama: ', angka1 => {

  // Input angka kedua
  inputUser.question('Masukkan angka kedua: ', angka2 => {

    // Input operator
    inputUser.question('Masukkan operator (+, -, *, /): ', operator => {

      // Tampilkan hasil
      console.log(
        `Hasil: ${kalkulator(
          parseFloat(angka1),
          parseFloat(angka2),
          operator
        )}`
      );

      inputUser.close();
    });
  });
});
