import React, { useEffect, useState} from 'react'

export default function Calculator() {

    const [errorMsg,setErrorMsg] = useState("");

    
    useEffect(() => {
        const screen = document.querySelector('.input-display');
        let runningTotal = 0;

        let buffer = "0";
        let previousOperator;

        document.querySelector('.calc-buttons')
        .addEventListener("click", function(e){
            buttonClick(e.target.innerText)
        })

        function buttonClick(value) {
            if(isNaN(parseInt(value))){
                handleSymbol(value)
            }else{
                handleNumber(value)
            }
            rerender()
        }

        function handleNumber(value){
            if(buffer === "0"){
                buffer = value
            }else{
                buffer += value;
            }
        }

        function handleSymbol(value){
            switch(value){
                case 'C':
                        buffer = "0";
                        previousOperator = null;
                        break;
                
                case "=":
                        if(previousOperator === null){
                            return
                        }
                        flushOperation(parseInt(buffer))
                        previousOperator = null;
                        buffer =+ runningTotal
                        runningTotal = 0;
                        break;

                case "←":
                        if(buffer.length === 1){
                            buffer = "0"
                        }
                        else{
                            buffer = 0;
                        }
                        break;

                default:
                        handleMath(value);
                        break;
            }
        }


        function handleMath(value){
            const intBuffer = parseInt(buffer)
            if(runningTotal === 0){
                runningTotal = intBuffer;
            }else{
                flushOperation(intBuffer)
            }
            previousOperator = value
            buffer = "0"
        }

        function flushOperation(intBuffer){
            if(previousOperator === "+"){
                runningTotal += intBuffer;
            }else if(previousOperator === "-"){
                runningTotal -= intBuffer;
            }else if(previousOperator === "x"){
                runningTotal *= intBuffer;
            }else{
                runningTotal /= intBuffer
            }
        }



        //resolution
        function rerender() {
            screen.innerText = buffer
        }

        
    }, [])

    return (
        <div className="calculator-container">
            <div className="display ">
                <div className="input-display">0</div>
            </div>
            <div className="calc-buttons">

            <div className="btn btn-multi">
                <button className="btn-calc btn-op">x</button>
            </div>
            <div className="btn btn-minus">
                <button className="btn-calc btn-op">-</button>
            </div>
            <div className="btn btn-plus">
                <button className="btn-calc btn-op">+</button>
            </div>

            <div className="btn btn-division">
                <button className="btn-calc btn-op">/</button>
            </div>

            <div className="btn btn-c">
                <button className="btn-calc  c-btn">C</button>
            </div>

            <div className="btn btn-arrow">
                <button className="btn-calc  arrow">←</button>
            </div>

            <div className="btn btn-7">
                <button className="btn-calc">7</button>
            </div>
            <div className="btn btn-8">
                <button className="btn-calc">8</button>
            </div>
            <div className="btn btn-9">
                <button className="btn-calc">9</button>
            </div>

            <div className="btn btn-4">
                <button className="btn-calc">4</button>
            </div>
            <div className="btn btn-5">
                <button className="btn-calc">5</button>
            </div>
            <div className="btn btn-6">
                <button className="btn-calc">6</button>
            </div>

            <div className="btn btn-1">
                <button className="btn-calc">1</button>
            </div>
            <div className="btn btn-2">
                <button className="btn-calc">2</button>
            </div>
            <div className="btn btn-3">
                <button className="btn-calc">3</button>
            </div>


            <div className="btn btn-0">
                <button className="btn-zero" >0</button>
            </div>
            <div className="btn btn-equals">
                <button className="resolution btn-op">=</button>
            </div>
            
            </div>
            
        </div>
    )
}
