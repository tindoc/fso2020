import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handle}) => {
    return (
        <button onClick={handle}>{text}</button>
    )
}

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Stattistics = ({good, neutral, bad}) => {
    if (good != 0 || neutral != 0 || bad != 0) {
        let all = good + neutral + bad;
        let average = (good * 1+ neutral * 0 + bad * -1) / (all != 0? all : 1);
        let positive = good * 100 / (all != 0? all : 1) + ' %';

        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={all} />
                        <Statistic text="average" value={average} />
                        <Statistic text="positive" value={positive} />
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
}

const App = () => {
    const [ good, setGood ] = useState(0)
    const [ neutral, setNeutral ] = useState(0)
    const [ bad, setBad ] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button text="good" handle={() => setGood(good + 1)} />
            <Button text="neutral" handle={() => setNeutral(neutral + 1)} />
            <Button text="bad" handle={() => setBad(bad + 1)} />
            <h1>statistics</h1>
            <Stattistics good={good} neutral={neutral} bad={bad}></Stattistics>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
);