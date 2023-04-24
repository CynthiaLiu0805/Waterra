import * as React from 'react';
import { Line } from 'react-chartjs-3';
import { number } from 'prop-types';
import { ChartOptions } from 'chart.js';
import Chart from 'chart.js';

interface ChartProps {
    displayTitle: boolean,
    displayLegend: boolean,
    legendPosition: string,
    // [[[1,2],[2,2],[..]....],[],[]]
    chartData: Array<Array<[number, number]>>,
    Parameter: string,
}

interface ChartState {
    chartDataState: Array<Array<[number, number]>>
}

class Chart extends React.Component<ChartProps, ChartState>{
    constructor(props) {
        super(props);
        this.state = {
            chartDataState: props.chartData
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props != prevProps)) {
            this.setState({
                chartDataState: this.props.chartData
                // chartDataState: [[[1671387516000000000, 6], [1674604624000000000, 8.5]], [[1672453116000000000, 28], [1674608376000000000, 51]]]
            })
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        Parameter: 'Measured Parameter',
    }

    render () {

        //x-axis value
        // let EpochtimeData = this.state.chartDataState.map(e => 
        //     (e.map(
        //         (time: number[]) => 
        //         (new Date(time[0] / 1000000)).toLocaleString())))
        // var EpochtimeData = [["1111", "2222", "3333", "4444", "5555", "6666"], ["aaa", "bbb", "ccc", "ddd", "eee"]]
        var EpochtimeData = [["2022-10-12, 7:11:11 AM", "2022-11-24, 3:11:11 AM", "2022-12-30, 9:18:36 PM", "2023-01-05, 8:33:36 PM", "2023-01-20, 4:33:36 PM", "2023-01-24, 7:59:36 PM"], ["2022-08-01, 10:18:36 PM", "2022-08-06, 5:18:36 PM", "2022-08-27, 4:36:55 PM", "2022-10-16, 7:49:36 PM", "2022-12-18, 1:18:36 PM"]]
        console.log("EpochtimeData")
        console.log(EpochtimeData)

        var HumantimeData = []
        // for (var i = 0; i < EpochtimeData.length; i++) {
        //     // var num = EpochtimeData[i].length
        //     const singleArr = new Array(EpochtimeData[i].length)
        //         .fill('')
        //         .map((_, j) => EpochtimeData[i].slice(j * 1, (j + 1) * 1));
        //     HumantimeData.push(singleArr)
        // }

        if (EpochtimeData[0].length >= EpochtimeData[1].length) {
            for (var i = 0; i < EpochtimeData[0].length; i++) {
                if (i < EpochtimeData[1].length) {
                    HumantimeData.push(EpochtimeData[0][i].concat(";", EpochtimeData[1][i]))
                } else {
                    HumantimeData.push(EpochtimeData[0][i].concat(";", ""))
                }
            }
        } else {
            for (var i = 0; i < EpochtimeData[1].length; i++) {
                if (i < EpochtimeData[0].length) {
                    HumantimeData.push(EpochtimeData[0][i].concat(";", EpochtimeData[1][i]))
                } else {
                    HumantimeData.push("".concat(";", EpochtimeData[1][i]))
                }
            }
        }
        console.log("humantimedata")
        console.log(HumantimeData)

        //y-axis value
        const sensorValue = [[10, 70, 30, 40, 50, 60], [5, 10, 35, 20, 25]]
        // var sensorValue = [[4, 6, 8.5]]
        // let sensorValue: Number[][] = this.state.chartDataState.map(e => (e.map((value: number[]) => value[1])))
        // var sensorValue = [["4", "6", "8.5"], ["49", "28", "51"]]
        // console.log(test)
        // console.log("sensorValue")
        // console.log(sensorValue)

        if (this.props.Parameter === 'Temperature') {
            var yAxisLabel: string = '°C';
        }
        else if (this.props.Parameter === 'Dissolved_Oxygen') {
            var yAxisLabel: string = 'mg/L';
        }
        else if (this.props.Parameter === 'Turbidity') {
            var yAxisLabel: string = 'Units';
        }
        else if (this.props.Parameter === 'Conductivity') {
            var yAxisLabel: string = 'µS/cm';
        }
        else {
            var yAxisLabel: string = 'Units';
        }

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
          
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
            
                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
          
            return array;
        }

        const colors: string[] = ["rgb(150, 93, 123)", "orange", "green", "purple", "blue", "red", "pink", "yellow", "black", "brown"];
        const selectedColors = shuffle(colors).slice(0, 2)
        var dataS: any[] = [];
        for (var i = 0; i < sensorValue.length; i++) {
            dataS.push({
                label: this.props.Parameter + (i + 1).toString(),
                data: sensorValue[i],
                // data: test1[i],
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderColor: selectedColors[i],
                borderWidth: 1.5,
                pointRadius: 1,
                pointHoverRadius: 5
            })
        }

        const data = {
            labels: HumantimeData,
            datasets: dataS
        }
        
        let options: ChartOptions = {
            scales: {
                xAxes: [
                    {
                        id: 'x-axis-1', // Assign this x-axis to the first dataset
                        type: 'category',
                        position: 'bottom',
                        ticks: {
                            callback: (value) => value.split(";")[0]
                        },
                    },
                    {
                        id: 'x-axis-2', // Assign this x-axis to the second dataset
                        type: 'category',
                        position: 'top',
                        ticks: {
                            callback: (value) => value.split(";")[1]
                        },
                    },
                ],
                yAxes: [{
                    gridLines: {
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: yAxisLabel
                    }
                }],
            },
        }

        return (
            <div className="chart" style={{ backgroundColor: 'rgb(255,255,255)' }}>
                <Line data={data} options={options} />
            </div>           
        )
            
    }
}

export default Chart;