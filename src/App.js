import './App.css';
import store from "./store";
import Button from '@material-ui/core/Button';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [],
            value: '',
            output: '',
        }
        this.refOut = React.createRef()
    };
    onChangeValue = event => {
        this.setState({value: event.target.value});
    };
    onAddItem = () => {
        this.setState(state => {
            const history = state.history.concat(state.value);
            return {
                history,
                value: '',
            }
        });
    };
    numberAndOperation(value) {
        var numValue = value;
        var outputOperation = this.refOut.current;
        if (value !== '=') {
            this.setState({
                output: numValue,
            })
            if (outputOperation.value === '0') {
                outputOperation.value = '';
            }
            outputOperation.value += numValue;
        } else {
            try {
                this.setState({value: outputOperation.value + '=' + eval(outputOperation.value)});
                outputOperation.value = eval(outputOperation.value);
                if (outputOperation.value === 'Infinity') {
                    setTimeout(() => {
                        outputOperation.value = '0'
                    }, 1500)
                }
                this.onAddItem();
            } catch {
                outputOperation.value = 'Не допустимое значение'
                setTimeout(() => {
                    outputOperation.value = '0'
                }, 1500)
            }
        }
    }

    render() {
        return (
            <div>
                <div className={"border"}>
                    <div className={"out"}>
                        <input ref={this.refOut} type={"text"} defaultValue={this.state.out}/>
                    </div>
                    <div className={"button"}>
                        {store.button.map((element, index) => <Button
                            key={index}
                            onClick={() => {
                                this.numberAndOperation(element.val)
                            }}>
                            {element.val}</Button>)}
                    </div>
                </div>
                <div className={"border"}>
                    <p align={'center'}>Your calculate:</p>
                    <ul>
                        {this.state.history.map(item => (
                            <li key={item} onChange={this.onChangeValue}> {item} </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
