import React from 'react';

export default class Player extends React.Component{

  handleClick() {
    fetch('https://api.mysportsfeeds.com/v1.1/pull/mlb/2016-regular/cumulative_player_stats.json?playerstats=AB,H,R,HR,ER', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(this.state.account+ ":" + this.state.password),
      }
    })
    .then((response) => {
      //ok 代表狀態碼在範圍 200-299
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .then((playerList) => {
      const {playerstatsentry} = playerList.cumulativeplayerstats
      // //載入資料，重新渲染
      this.setState({
        playerstatsentry,
      })
    })
    .catch((error) => {
      //這裡可以顯示一些訊息
      //console.error(error)
    })
  }

  handleAccountChange(e) {
    this.setState({ account: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  constructor(){
    super();
    this.state = {
      playerstatsentry: [],
      account: '',
      password: '',
    };

  }

  render(){
    return(
      <div>
      帳號：<input type="text" onChange={ this.handleAccountChange.bind(this) }  />
      密碼：<input type="password" onChange={ this.handlePasswordChange.bind(this) } />
      <button onClick={this.handleClick.bind(this)}>送出</button>
        {
          this.state.playerstatsentry.map((x,index) =>
            <div key={index}>{x.player.FirstName}, {x.player.LastName} Homeruns: {x.stats.Homeruns['#text']} </div>
          )
        }
      </div>
    );
  }

}


