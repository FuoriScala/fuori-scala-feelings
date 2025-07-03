body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fafafa;
  text-align: center;
  padding: 30px;
  margin: 0;
}

main {
  max-width: 500px;
  margin: auto;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

h1 {
  margin-bottom: 25px;
  font-weight: 700;
  color: #333;
}

label {
  font-weight: 600;
  display: block;
  text-align: left;
  margin: 15px 0 6px;
  font-size: 1rem;
}

select, textarea, input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: vertical;
}

button {
  margin-top: 25px;
  padding: 14px 30px;
  font-size: 1.1rem;
  background: #007acc;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #005fa3;
}

#emotionBubble {
  margin: 20px auto;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.1rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

#emotionDescription {
  max-width: 350px;
  margin: 15px auto 30px auto;
  font-size: 1.1rem;
  color: #444;
  line-height: 1.4;
}

#qrCode {
  margin-top: 15px;
}

#bagContainer {
  margin-top: 30px;
  text-align: center;
  opacity: 0;
  transition: opacity 1s ease;
}

#bagImage {
  width: 220px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

#thoughtText {
  margin-top: 18px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 1.2rem;
  color: #222;
  padding: 10px 20px;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  background: #fff8dc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  white-space: pre-wrap;
}

#downloadBtn {
  margin-top: 22px;
  padding: 12px 28px;
  font-size: 1.1rem;
  background: #007acc;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#downloadBtn:hover {
  background: #005fa3;
}
