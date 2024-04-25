const button = document.getElementById("get-solution");


button.addEventListener("click", () => {
  const value = document.getElementById("N").value;
  const container = document.getElementById("container");

  const result = start(Number(value))

  container.innerHTML = "";
  result.data.forEach((line, i) => {
    let lines = "";

    line.forEach((el, j) => {
      const color = (i + j) % 2 === 0 ? "bg-amber-900" : "";

      if (el === 1) {
        return lines += `<div class="w-10 h-10 border-[4px] border-red-600 ${color} bg-contain bg-no-repeat bg-center" style="background-image: url('queen.png');"></div>`;
      }

      lines += `<div class="w-10 h-10 ${color}"></div>`;
    });

    container.innerHTML += `
    <div class="flex w-max">
      ${lines}
    </div>
    `
  });

});