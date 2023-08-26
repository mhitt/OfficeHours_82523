const express = require('express');
const app = express();

const port = 4000;

let fakeData = [
    {
        team1 : 'Dallas Cowboys',
        team2 : 'Los Angeles Rams',
        odds: 65,
        id: 1
    },
    {
        team1 : 'Chicago Bears',
        team2 : 'Green Bay Packers',
        odds: 75,
        id: 2
    },
    {
        team1 : 'Detroit Lions',
        team2 : 'Kansas City Chiefs',
        odds: 50,
        id: 3
    }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json(fakeData);
})

app.get('/highestOdds', (req, res) => {
    let fData = calcHighestOdds(fakeData);
    res.status(200).json(fData);
})

app.post('/', (req, res) => {
    let nData = req.body;
    fakeData.push(nData);
    res.status(201).json(fakeData);
})

app.delete('/:id', (req, res) => {
    let de = fakeData.filter(data => data.id != req.params.id);
    fakeData = [...de];
    res.status(200).json(fakeData);
})

app.put('/:id', (req, res) => {
    //let de = fakeData.filter(data => data.id == req.params.id);
    for (let i = 0; i < fakeData.length; i++){
        let data = fakeData[i];
        if (data.id == req.params.id) {
            let nData = req.body;
            fakeData[i] = nData;
        }
    }
    
    res.status(200).json(fakeData);
})

function calcHighestOdds(data) {
    let highestOdds = 0;
    let highestTeam = '';

    for (let key in data) {
        let team1 = data[key].team1;
        let team2 = data[key].team2;
        let team1Odds = data[key].odds;
        let team2Odds = 100 - data[key].odds;
        

        if (team1Odds > highestOdds ) {
            highestOdds = team1Odds;
            highestTeam = team1;
        } 

        if (team2Odds > highestOdds) {
            highestOdds = team2Odds;
            highestTeam = team2;
        }
    }
    return highestTeam;

}

app.listen(port, () => {
    console.log(calcHighestOdds(fakeData));
    console.log('hello');
});