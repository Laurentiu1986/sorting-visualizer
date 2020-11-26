import React, { Component } from 'react'
import {
    Paper,
    Grid,
    Button,
    Chip,
    Slider
} from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import bubbleSortAlgorithm from '../algorithms/bubbleSort';
import mergeSortAlgorithm from '../algorithms/mergeSort';

const styles = {
    root: {
        flexGrow: 1,
    },
    box: {
        backgroundColor: '#4da9da',
        marginTop: 150,
        paddingTop: 30,
        position: 'relative',
        minHeight: 600,
        width: 'calc(100%)'
    },
    paper: {
        backgroundColor: '#1976d2',
        // height: 140,
        width: 10,
        margin: 3
    }
}

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const DEFAULT_COLOR = '#1976d2';
const SUCCESS_COLOR = 'green';
const FAIL_COLOR = 'red';

class BubbleSort extends Component {

    state = {
        randoms: [],
        ANIMATION_TIMEOUT: 5,
        BAR_NUMBER: 50
    }

    constructor(props) {
        super(props);
        this.generateArray = this.generateArray.bind(this);
        // this.generateArray();
    }

    generateArray = () => {
        var values = Array.from({ length: this.state.BAR_NUMBER }, () => Math.floor(Math.random() * 200));
        this.resetArray();
        this.setState({ randoms: values }, function () {
            console.log(this.state.randoms);
        });
        this.forceUpdate();
    }

    resetArray = () => {
        console.log("reset");
        this.setState({ randoms: [] });
    }

    bubbleSort = async () => {
        var animations = bubbleSortAlgorithm(this.state.randoms);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [indexStart, indexEnd, swap, newHeight, oldHeight] = animations[i];
            const barOneStyle = arrayBars[indexStart].style;
            const barTwoStyle = arrayBars[indexEnd].style;

            if (!swap) {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, FAIL_COLOR);
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => {  })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            } else {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, SUCCESS_COLOR);
                    barOneStyle.height = `${newHeight * 3}px`;
                    barTwoStyle.height = `${oldHeight * 3}px`;
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => {  })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            }
        }
    }

    mergeSort = async () => {
        var animations = mergeSortAlgorithm(this.state.randoms);
        console.log(animations);
        console.log(animations.length);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [indexStart, indexEnd, swap, newHeight, oldHeight] = animations[i];
            console.log("=== ", animations[i]);
            const barOneStyle = arrayBars[indexStart].style;
            // const barTwoStyle = arrayBars[indexEnd].style;
            const barTwoStyle = null;

            if (!swap) {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, FAIL_COLOR);
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => {  })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            } else {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, SUCCESS_COLOR);
                    barOneStyle.height = `${newHeight * 3}px`;
                    // barTwoStyle.height = `${oldHeight * 3}px`;
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => {  })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            }
        }
    }

    setBarsColor = (barOne, barTwo, color) => {
        if(barOne) barOne.backgroundColor = color;
        if(barTwo) barTwo.backgroundColor = color;
    }

    resetBarsColor = (barOne, barTwo) => {
        if(barOne) barOne.backgroundColor = DEFAULT_COLOR;
        if(barTwo) barTwo.backgroundColor = DEFAULT_COLOR;
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (
            <Grid container style={styles.root} spacing={1}>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary" onClick={() => { this.generateArray() }}>
                        Initialize Array
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.bubbleSort}>
                        Bubble Sort
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.mergeSort}>
                        Merge Sort
                    </Button>
                    <br></br>
                    Bars: <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} style={{ width: 250 }} min={5} max={100} onChange={(e, value) => this.setState({ BAR_NUMBER: value })} />
                    <br></br>
                    Animation speed: <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} style={{ width: 250 }} min={1} max={2000} onChange={(e, value) => this.setState({ ANIMATION_TIMEOUT: value })} />
                    <Paper style={styles.box} >
                        <Grid container justify="center" spacing={2}>
                            {this.state.randoms.map((value, index) => (
                                <Grid key={index} item style={{ margin: 1 }}>
                                    <Paper style={{ height: value * 3, backgroundColor: '#1976d2', width: 10, margin: 3, position: 'absolute', bottom: 0 }} key={index} className="array-bar" />
                                    {/* <Chip variant="outlined" size="small" label={value} style={{ backgroundColor: '#1976d2' }} /> */}
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        )
    }
}

export default BubbleSort

