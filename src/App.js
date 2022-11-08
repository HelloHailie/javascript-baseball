const MissionUtils = require("@woowacourse/mission-utils");
class App {
  computerRandom() {
    const computer = [];
    while (computer.length < 3) {
      const comNum = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computer.includes(comNum)) {
        computer.push(comNum);
      }
    }
    return computer;
  }

  userPick(computer) {
    MissionUtils.Console.readLine("숫자를 입력해주세요.", (userInput) => {
      if (!this.checkUserNum(userInput)) {
        throw new Error();
      }
      const result = this.baseballGame(computer, userInput);
      if (!result) {
        this.userPick(computer);
      } else if (result) {
        this.checkReplay();
      }
    });
  }

  checkUserNum(num) {
    if (num.length !== 3) {
      MissionUtils.Console.print("3개의 숫자만 입력해주세요.");
      return false;
    } else if (num[0] === num[1] || num[0] === num[2] || num[1] === num[2]) {
      MissionUtils.Console.print("같은 숫자를 입력하면 안 됩니다.");
      return false;
    } else if (isNaN(num)) {
      MissionUtils.Console.print("3개의 숫자만 입력해주세요.");
      return false;
    }
    return true;
  }

  baseballGame(computer, user) {
    let strike = 0;
    let ball = 0;
    const USER = [];
    for (let i = 0; i < 3; i++) {
      USER.push(parseInt(user[i]));
    }
    for (let i = 0; i < 3; i++) {
      if (this.compare(computer, computer[i], USER[i]) === 1) {
        strike += 1;
      } else if (this.compare(computer, computer[i], USER[i]) === 2) {
        ball += 1;
      }
    }
    let result = "";
    if (ball !== 0) {
      result += `${ball}볼`;
    }
    if (strike !== 0) {
      if (result !== "") {
        result += " ";
      }
      result += `${strike}스트라이크`;
    }
    if (ball === 0 && strike === 0) {
      result = "낫싱";
    }
    MissionUtils.Console.print(result);
    if (strike === 3) {
      return true;
    }
    return false;
  }
  compare(array, num1, num2) {
    if (array.includes(num2)) {
      if (num1 === num2) {
        return 1;
      }
      return 2;
    }
    return;
  }
  play() {
    MissionUtils.Console.print("숫자 야구 게임 시작!");
  }
}

module.exports = App;
