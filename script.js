let resultPanel = document.getElementById("resultPanel");
let round = 0;
let wins = 0;
let winsText = document.getElementById("winsText");
function computerPlay()
{
  let computerMove = Math.floor(Math.random() * 3);
  if(computerMove == 0)
  {
    return "PAPER";
  }
  else if (computerMove == 1)
  {
    return "ROCK";
  }
  return "SCISSOR";
}


function playRound(playerSelection, computerSelection) {
  if(playerSelection == computerSelection)
  {
    return {result:0,
        playerSelection:null,
        computerSelection:null,};
  }
  if((playerSelection == "SCISSOR" && computerSelection == "PAPER")
  ||(playerSelection == "ROCK" && computerSelection == "SCISSOR")
  ||(playerSelection == "PAPER" && computerSelection == "ROCK"))
  {
      return {"result":1, "playerSelection": playerSelection, "computerSelection": computerSelection,};
  }
  return {"result":-1, "playerSelection": playerSelection, "computerSelection": computerSelection,};
}

function printRoundResult(result)
{
    let winner = result.result
    let playerSelection = result.playerSelection
    let computerSelection = result.computerSelection
    if(winner == 1)
    {
        return `You Win! ${playerSelection} beats over ${computerSelection}`;
    }
    else if(winner == -1)
    {
        return `Computer Win! ${computerSelection} beats over ${playerSelection}`;
    }
    else {
        return "It's a draw";
    }

}

function playRoundDOM(btnValue)
{
  round++;
  let resultList = playRound(btnValue, computerPlay());
  if(resultList.result == 1)
  {
    wins++;
    winsText.textContent = `You Win: ${wins}`;
  }
  const result = printRoundResult(resultList);
  let resultText = document.createElement("p");
  resultText.textContent = result;
  resultPanel.appendChild(resultText);
}



const buttons = document.querySelectorAll('div>button');
buttons.forEach((btn)=>
{
  btn.addEventListener('click',()=>
  {
    playRoundDOM(btn.value);
    if(round == 5)
    {
      let texts = document.querySelectorAll('#resultPanel>p');
      texts.forEach((t)=>{t.style.opacity = 0.5;});
      buttons.forEach((btn)=>{
        btn.disabled = true;
        btn.style.opacity = 0.5;
      });
      let resetBtn = document.createElement('button');
      resetBtn.textContent = "reset";
      resetBtn.style.opacity = 1;
      resetBtn.onclick = () =>
      {buttons.forEach((btn)=>{
        btn.disabled = false;
        btn.style.opacity = 1;
      });
        resultPanel.innerHTML = "";
        round = 0;
        wins = 0;
        winsText.textContent = `You Win: ${wins}`;
      };
      resultPanel.appendChild(resetBtn);
    }
  });
});
