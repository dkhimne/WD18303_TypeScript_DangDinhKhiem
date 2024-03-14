const playerNameForm = document.getElementById("player-name-form");
const playerNameInput = document.getElementById("player-name");

playerNameForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const playerName = playerNameInput.value.trim(); // Lấy tên người chơi và loại bỏ khoảng trắng

  // Validate tên người chơi
  if (playerName === "") {
    // Hiển thị thông báo lỗi nếu tên người chơi trống
    alert("Tên người chơi không được để trống!");
    return;
  }

  if (!validatePlayerName(playerName)) {
    // Hiển thị thông báo lỗi nếu tên người chơi không hợp lệ
    alert("Tên người chơi không hợp lệ! Vui lòng không sử dụng ký tự đặc biệt hoặc chỉ sử dụng 1 ký tự.");
    return;
  }

  yourGameFunction(playerName);
});

function validatePlayerName(playerName) {
  // Regex để kiểm tra ký tự đặc biệt
  const specialCharactersRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g;

  // Kiểm tra tên người chơi có ký tự đặc biệt hay không
  if (specialCharactersRegex.test(playerName)) {
    return false;
  }

  // Kiểm tra độ dài tên người chơi
  if (playerName.length < 2) {
    return false;
  }

  return true;
}


