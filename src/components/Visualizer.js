import "../styles/Visualizer.css"

import React, { Component } from 'react'
import {
    Paper,
    Grid,
    Button,
    Chip,
    Slider,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import bubbleSortAlgorithm from '../algorithms/bubbleSort';
import mergeSortAlgorithm from '../algorithms/mergeSort';
import quickSortAlgorithm from '../algorithms/quickSort';

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Sidebar } from './Sidebar';

const styles = {
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: '#03324E',
        color: 'white',
        overflow: 'hidden'
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
        color: '#01263D',
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

const DEFAULT_COLOR = 'rgb(3, 50, 78)';
const SUCCESS_COLOR = 'green';
const FAIL_COLOR = 'red';
const MIN_RANGE = 10;
const MAX_RANGE = 10;

class BubbleSort extends Component {

    state = {
        randoms: [],
        ANIMATION_TIMEOUT: 5,
        BAR_NUMBER: 20,
        width: 10,
        ARRAY_SCENARIO: 'random'
    }

    constructor(props) {
        super(props);
        this.generateArray = this.generateArray.bind(this);
    }

    componentDidMount() {
        this.generateArray();
    }

    generateArray = () => {
        var values = Array.from({ length: this.state.BAR_NUMBER }, () => Math.floor(Math.random() * 200) + MIN_RANGE);
        this.resetArray();
        this.setState({ randoms: values }, function () {
            console.log(this.state.randoms);
        });
        // this.forceUpdate();
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
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => { })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            } else {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, SUCCESS_COLOR);
                    barOneStyle.height = `${newHeight * 2}px`;
                    barTwoStyle.height = `${oldHeight * 2}px`;
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => { })
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
            let barTwoStyle = null;

            if (!swap) {
                barTwoStyle = arrayBars[indexEnd].style;
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, FAIL_COLOR);
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => { })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            } else {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, SUCCESS_COLOR);
                    barOneStyle.height = `${newHeight * 2}px`;
                    // barTwoStyle.height = `${oldHeight * 3}px`;
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => { })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            }
        }
    }

    quickSort = async () => {
        var animations = quickSortAlgorithm(this.state.randoms);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [indexStart, indexEnd, swap, newHeight, oldHeight] = animations[i];
            const barOneStyle = arrayBars[indexStart].style;
            console.log("index", indexStart);
            // if(indexStart) {
                // barOneStyle = arrayBars[indexStart].style;
            // }
            const barTwoStyle = arrayBars[indexEnd].style;

            if (!swap) {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, FAIL_COLOR);
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => { })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            } else {
                setTimeout(() => {
                    this.setBarsColor(barOneStyle, barTwoStyle, SUCCESS_COLOR);
                    // if(indexStart) { 
                        barOneStyle.height = `${newHeight * 2}px`;
                    // }
                    barTwoStyle.height = `${oldHeight * 2}px`;
                }, this.state.ANIMATION_TIMEOUT);
                await this.sleep(this.state.ANIMATION_TIMEOUT * 2).then(() => { })
                this.resetBarsColor(barOneStyle, barTwoStyle);
            }
        }
    }

    setBarsColor = (barOne, barTwo, color) => {
        if (barOne) barOne.backgroundColor = color;
        if (barTwo) barTwo.backgroundColor = color;
    }

    resetBarsColor = (barOne, barTwo) => {
        if (barOne) barOne.backgroundColor = DEFAULT_COLOR;
        if (barTwo) barTwo.backgroundColor = DEFAULT_COLOR;
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (
            <Grid container style={styles.root}>
                <Grid item xs={2}>
                    <Grid container justify="left" spacing={2}>
                        <Sidebar width={300} height={"100vh"}>
                            <Paper className="paper-logo" variant="outlined" square />
                            <Button className="btn primary-color" variant="outlined" onClick={() => { this.generateArray() }}>
                                Initialize Array
                            </Button>
                            <Button className="btn primary-color" variant="outlined" onClick={this.bubbleSort}>
                                Bubble Sort
                            </Button>
                            <Button className="btn primary-color" variant="outlined" onClick={this.mergeSort}>
                                Merge Sort
                            </Button>
                            <Button className="btn primary-color" variant="outlined" onClick={this.quickSort}>
                                Quick Sort
                            </Button>
                        </Sidebar>
                    </Grid>
                </Grid>

                <Grid item xs={10}>
                    <Grid container justify="left" spacing={2}>
                        <Grid className="title first primary-color" item xs={2}
                            justify="left">
                        </Grid>
                        <Grid className="title primary-color" item xs={7}
                            justify="left">
                        </Grid>
                        <Grid className="title primary-color" item xs={2}
                            justify="left">
                        </Grid>
                        <Grid className="generated-arrays primary-color" item xs={7} >
                            <Grid container justify="center" spacing={2}>
                                {this.state.randoms.map((value, index) => (
                                    <Grid key={index} item style={{ margin: Math.floor(150 / this.state.BAR_NUMBER) }}>
                                        <Paper style={{ height: value * 2, backgroundColor: 'rgb(3, 50, 78)', width: 300 / this.state.BAR_NUMBER, margin: 1, position: 'absolute', bottom: 0 }} key={index} className="array-bar">
                                            {/* <Typography className="bar-value">{value}</Typography> */}
                                        </Paper>
                                        {/* <Chip variant="outlined" size="small" label={value} style={{ backgroundColor: '#1976d2' }} /> */}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid className="generated-arrays primary-color" item xs={4} >
                            <Grid container justify="center">

                            </Grid>
                        </Grid>
                        <Grid className="bottom-controls bottom-first" item xs={3}
                            justify="left">
                            <Typography className="label" gutterBottom>Bars number: {this.state.BAR_NUMBER}</Typography>
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} style={{ width: 'calc(60%)' }} min={5} max={40} onChange={(e, value) => {
                                this.setState({ BAR_NUMBER: value });
                                this.generateArray();
                            }} />
                        </Grid>
                        <Grid className="bottom-controls" item xs={3}
                            justify="left">
                            <Typography className="label" gutterBottom>Animation speed: {this.state.ANIMATION_TIMEOUT}</Typography>
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} style={{ width: 'calc(60%)' }} min={10} max={1000} onChange={(e, value) => this.setState({ ANIMATION_TIMEOUT: value })} />
                        </Grid>
                        <Grid className="bottom-controls" item xs={3}
                            justify="left">
                            {/* <FormControl className="case-container" component="fieldset">
                                <FormLabel className="case-scenario label" component="legend">Array Case Scenario</FormLabel>
                                <RadioGroup aria-label="best" name="gender1" value={this.state.ARRAY_SCENARIO} onChange={(e, value) => this.setState({ ARRAY_SCENARIO: value })}>
                                    <FormControlLabel  value="best" control={<Radio className="label"/>} label="Best Case" />
                                    <FormControlLabel className="label" value="random" control={<Radio />} label="Random" />
                                    <FormControlLabel className="label" value="worst" control={<Radio />} label="Worst Case" />
                                </RadioGroup>
                            </FormControl> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        )
    }
}

export default BubbleSort

