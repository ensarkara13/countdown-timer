$(() => {
  const btnStart = $(".start");
  const btnSettings = $(".settings");
  const inputSeconds = $(".seconds input");
  const inputMinutes = $(".minutes input");
  const ring = $(".ring");
  const initialMinute = "10";
  const initialSecond = "00";
  let countdown;

  const isNumberKey = (event) => {
    return /(\d)/.test(event.key);
  };

  btnSettings.click(() => {
    if ($(":disabled").length > 0) {
      $(":text").removeAttr("disabled");
      inputSeconds.keyup((e) => {
        if (isNumberKey(e)) {
          if (e.target.value > 59) {
            e.target.value = 59;
          }
        } else {
          e.target.value = "00";
        }
      });
      inputMinutes.keyup((e) => {
        if (!isNumberKey(e)) {
          e.target.value = "00";
        }
      });
    } else {
      $(":text").attr("disabled", true);
    }
    clearInterval(countdown);
    btnStart.text("start");
  });

  btnStart.click(() => {
    if (btnStart.text().toLowerCase() === "start") {
      btnStart.text("stop");
      $(":text").attr("disabled", true);
      countdown = setInterval(beginCountdown, 1000);
    } else {
      btnStart.text("start");
      clearInterval(countdown);
    }
  });

  const beginCountdown = () => {
    let second = parseInt(inputSeconds.val());
    let minute = parseInt(inputMinutes.val());
    if (second > 0) second -= 1;
    if (second === 0 && minute > 0) {
      minute -= 1;
      second = 59;
    } else if (minute === 0 && second === 0) {
      clearInterval(countdown);
      btnStart.text("start");
      ring.addClass("ending");
      setTimeout(() => {
        inputMinutes.val(initialMinute);
        inputSeconds.val(initialSecond);
        ring.removeClass("ending");
      }, 1000);
    }
    const checkValue = (value) => {
      if (value < 10) return `0${value}`;
      return value;
    };

    inputSeconds.val(checkValue(second));
    inputMinutes.val(checkValue(minute));
  };
});
