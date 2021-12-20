
import './App.css';
import store from "./store";
import Button from '@material-ui/core/Button';
import React from "react";


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            out: '0'
        }
        this.refOutput = React.createRef()
    }
    tapeNumber(value){
        let correntValue = value
        let output = this.refOutput.current
        this.setState({
            out: correntValue
        })
        if (output.value==='0'){output.value=''}
        output.value += correntValue
    }
    tapeOperation(value){
        let output = this.refOutput.current
        if(value === 'CE'){
            output.value.length===1 ? output.value='0' : output.value=output.value.substring(0,output.value.length-1)
        }
        else if (value === 'C'){output.value='0'}
        else if (value ==='='){
            try{output.value=eval(output.value)
                if (output.value==='Infinity')
                {setTimeout(()=>{
                    output.value = '0'
                }, 1000)}
            }
            catch {
                output.value='Не допустимое значение'
                setTimeout(()=>{
                    output.value = '0'
                }, 1000)
            }
        }

    }
    render() {
        return (
            <div className={"container"}>
                <div className={"output"}>
                    <input ref={this.refOutput} type={"text"} defaultValue={this.state.out}/>
                </div>
                <div className={"button"}>
                    {store.button.map((item,index)=> <Button
                        key={index}
                        onClick={() => {this.tapeNumber(item.val)}}>
                        {item.val}</Button>)}
                    {store.operation.map((item,index)=><Button
                        key={index}
                        onClick={() => {this.tapeOperation(item.val)}}>
                        {item.val}
                    </Button>)}

                </div>
            </div>
        );
    }
}

export default App;
