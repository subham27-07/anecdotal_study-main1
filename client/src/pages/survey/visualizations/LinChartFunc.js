import {Button} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";


// const transformData = (data, startYear) => {
//     // const { data, startYear } = props;
//     return data
//         .map((d) => {
//             if (d.year === startYear) {
//                 return { ...d, defined: true };
//             }
//             return { ...d, defined: 0 };
//         })
//         .filter(d => d.year >= startYear);
// }


const marginConvention = (selection, props) => {
    const {
              width,
              height,
              margin,
              className = 'margin-group',
          } = props;
    let svg = selection.attr('class', className)
                       .data([null])
                       .attr('width', width)
                       .attr('height', height);
    svg = svg.append('g')
             .attr('transform', `translate(${margin.left}, ${margin.top})`);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    return {
        svg,
        innerWidth,
        innerHeight
    };
};

export default function LinChartFunc(props) {

    const data = props.data
        .map((d) => {
            if (d.year === props.startYear) {
                return {
                    ...d,
                    defined: true
                };
            }
            return {
                ...d,
                defined: 0
            };
        })
        .filter(d => d.year >= props.startYear);

    const svgRef = useRef(null);
    const userDataLine= useRef(data);
    const xRef = useRef(null);
    const youDrawIt = useRef(null);
    const clipElement = useRef(null);
    const [isCompleted, setIsCompleted] = useState(false);

//USE EFFECTS
//     useEffect(()=>{
//         if(isCompleted && props.visStep > 0){
//             setDisabled(()=>false);
//         }else{
//             setDisabled(()=> !(isCompleted && props.visStep === 1))
//         }
//     },[props.visStep])

    useEffect(() => {
        d3.selectAll("svg > *").remove();
        userDataLine.current = data;
        xRef.current = null;
        youDrawIt.current = null;
        clipElement.current = null;
        createLineChart()
    }, [props.article])

    useEffect(()=>{
        if(props.visStep > 0){
            d3.select(".overlay").style('pointer-events','none')
        }
    },[props.visStep])

    const transformData = (data, startYear) => {
        return data
            .map((d) => {
                if (d.year === startYear) {
                    return {
                        ...d,
                        defined: true
                    };
                }
                return {
                    ...d,
                    defined: 0
                };
            })
            .filter(d => d.year >= startYear);
    }

    const renderAnimation = () => {
        if (d3.mean(userDataLine.current, d => d.defined) === 1) {
            const {
                      data,
                      type,
                      startYear
                  } = props;

            const dataXMax = d3.max(data, d => d.year);
            clipElement.current.transition().duration(1000).attr('width', xRef.current(dataXMax)+10);
        }
    };
    const clampFunc = (a, b, c) => Math.max(a, Math.min(b, c));

    const handleClick = () => {
        setIsCompleted((prev)=>!prev);
        const definedValues = userDataLine.current.filter(d => d.defined === true);
        if (definedValues.length === userDataLine.current.length) {
            switch (props.visStep){
                case 0:
                    window.scrollTo(0,0);
                    renderAnimation();
                    d3.select(svgRef.current).style('pointer-events','none');
                    props.responses.current.responses[`${props.alias}`] = {
                        time: Date.now(),
                        choice: userDataLine.current,
                    }
                    props.handleVisState();
                    setIsCompleted(()=> false);
                    break;
                case 1:
                    props.handleVisState();
                    break;
                default:
                    props.handleVisState();
                    break;

            }
        }

    };


    const createLineChart = () => {
        const {
                  data,
                  type,
                  idLine,
                  startYear,
              } = props;
        const availableYears = props.data.map((d) => d.year)
        // this.setState({userDataLine:this.userDataLine})
        // const userDrawnValue = userDataLine.filter(d => d.defined === true);
        const width = 1000;
        const height = 325;
        const margin = {
            top: 10,
            right: 50,
            bottom: 30,
            left: 50,
        };
        const svgContainer = d3.select(svgRef.current);

        const containerDiv = document.getElementById('line-chart');

        const {
                  svg,
                  innerWidth,
                  innerHeight
              } = marginConvention(svgContainer, {
            width: containerDiv.offsetWidth,

            height,
            margin,
            className: 'lineChart',
        });
        // svg= svg;

        const x = d3.scaleLinear().range([0, innerWidth]);
        xRef.current = x;
        const y = d3.scaleLinear().range([innerHeight, 0]);

        //
        if (props.scaleType === "percentage") {

            y.domain([0, 10]);

            svg.append('g')
               .attr('class', 'axis-y-line')
               .call(d3.axisLeft(y)
                       .tickFormat(d => `${d}%`));

        } else {
            y.domain([0, 80000]);
            svg.append('g')
               .attr('class', 'axis-y-line')
               .call(d3.axisLeft(y));

        }


        // const yFormat = d3.scaleLinear()
        //   .domain([0, d3.max(data, d => d[type])])
        //   .range([0, 80000]);


        const valueline = d3.line()
                            .x(d => x(d.year))
                            .y(d => y(d[type]))
                            .curve(d3.curveCardinal);


        const valueArea = d3.area()
                            .x(d => x(d.year))
                            .y0(d => y(d[type]))
                            .y1(innerHeight);


        const dataXMax = d3.max(data, d => d.year);

        x.domain(d3.extent(data, d => d.year));
        // y.domain([0, 80000]);

        let mainLine;
        if (idLine) {
            mainLine = data.filter((element) => {
                if (element[type]) {
                    return element.id === idLine;
                }
                return null;
            });
        }

        clipElement.current = svg.append('clipPath')
                                 .attr('id', 'clip')
                                 .append('rect')
                                 .attr('width', x(startYear))
                                 .attr('height', innerHeight + 20)
                                 .attr('transform', 'translate(0, -20)');
        const lastDate = data[data.length-1]
        const clipPath = svg.append('g').attr('clip-path', 'url(#clip)');
        // MAIN AREA
        clipPath.append('path')
                .data([mainLine])
                .attr('class', 'area')
                .attr('d', valueArea);
        // MAIN LINE
        clipPath.append('path')
                .data([mainLine])
                .attr('class', 'line')
                .attr('d', valueline);

        clipPath.append('text')
           .attr('class', 'text-2022')
           .attr('x', x(lastDate.year) - 40)
           .attr('y', y(lastDate.value) - 10)
           .attr('font-size', '15px')
           .text(lastDate.value)
           .style('font-weight','bold');

        clipPath.append('circle')
           .attr('class', 'bubble-2022')
           .attr('cx', x(lastDate.year))
           .attr('cy', y(lastDate.value))
           .attr('r', 7)
           .style('fill', 'teal')
           .style('opacity', 0.7);


        // USER LINE
        youDrawIt.current = svg.append('path').attr('class', 'your-line');

        const firstDate = data[0]
        const fourthDate = data[3]


        const onChartMessage = {
            recall: `Please recreate the line you saw for ${props.articleName}.`,
            other: `Draw the line for the missing years.`
        }

        let instructionText = svg.append('text')
                                 .attr('x', innerWidth / 2)
                                 .attr('y', innerHeight / 2)
                                 .attr('text-anchor', "middle")
                                 .attr('font-size', '18px')
                                 .attr('class', 'instructionText')
                                 .style('fill', 'rgb(133, 3, 18)')
                                 .style('pointer-events', 'none')
                                 .text(props.elicitationType?onChartMessage[props.elicitationType]:onChartMessage['other'])
                                 .style('font-weight','bold');


        svg.append('text')
           .attr('class', 'text-2015')
           .attr('x', x(firstDate.year))
           .attr('y', y(firstDate.value) - 10)
           .attr('font-size', '15px')
           .text(firstDate.value)
           .style('font-weight','bold');

        svg.append('text')
           .attr('class', 'text-2016')
           .attr('x', x(fourthDate.year))
           .attr('y', y(fourthDate.value) - 10)
           .attr('font-size', '15px')
           .text(fourthDate.value)
           .style('font-weight','bold');

        svg.append('circle')
           .attr('class', 'bubble-2015')
           .attr('cx', x(firstDate.year))
           .attr('cy', y(firstDate.value))
           .attr('r', 7)
           .style('fill', 'teal')
           .style('opacity', 0.7);

        svg.append('circle')
           .attr('class', 'bubble-2016')
           .attr('cx', x(fourthDate.year))
           .attr('cy', y(fourthDate.value))
           .attr('r', 7)
           .style('fill', 'teal')
           .style('opacity', 0.7);


        // Add the X Axis
        svg.append('g')
           .attr('class', 'axis-x-line')
           .attr('transform', `translate(0,${innerHeight})`)

           .call(d3.axisBottom(x)
                   .tickValues(availableYears)

               // .tickFormat(d3.format('.4')));
                   .tickFormat(d => (d % 100 < 10 ? `0${d % 100}` : `${d % 100}`)));


        //
        // Rotate x-axis labels
        // svg.selectAll(".axis-x-line text")
        // .attr("transform", "rotate(-45)")
        // .style("text-anchor", "end");
        //
        svg.append('g')
           .attr('class', 'grid')
           .call(d3.axisLeft(y)
                   .tickSize(-innerWidth)
                   .tickFormat('')
           )
           .style('stroke-dasharray', ('3, 3'))
           .style('opacity', 0.1);

        // Add x-axis gridlines
        svg.append('g')
           .attr('class', 'grid')
           .attr('transform', `translate(0,${innerHeight})`)
           .call(d3.axisBottom(x)
                   .tickValues(availableYears)
                   .tickFormat('')
                   .tickSize(-innerHeight)
           )
           .style('stroke-dasharray', ('3, 3'))
           .style('opacity', 0.1);
        //

        //
        svg.append('g')
           .attr('class', 'grid')
           .call(d3.axisLeft(y)
                   .tickSize(-innerWidth)
                   .tickFormat('')
           )
           .style('stroke-dasharray', ('3, 3'))
           .style('opacity', 0.1);

        // Add x-axis gridlines
        svg.append('g')
           .attr('class', 'grid')
           .attr('transform', `translate(0,${innerHeight})`)
           .call(d3.axisBottom(x)
                   .tickValues(availableYears)
                   .tickFormat('')
                   .tickSize(-innerHeight)
           )
           .style('stroke-dasharray', ('3, 3'))
           .style('opacity', 0.5);


        // Overlay to handle mouse events
        svg.append('rect')
           .attr('class', 'overlay')
           .attr('width', innerWidth)
           .attr('height', innerHeight)
           .call(mouseDragLine(x, y, dataXMax, valueline, svg));
    };

    const mouseDragLine = (x, y, dataXMax, line, svg) => d3.drag().on('drag', () => {

        const {
                  type,
                  startYear
              } = props;
        const overlay = d3.select('.overlay').node();
        const mousePos = d3.mouse(overlay);
        const year = clampFunc(startYear + 1, dataXMax, x.invert(mousePos[0]));
        const newVal = clampFunc(0, y.domain()[1], y.invert(mousePos[1]));

        userDataLine.current = userDataLine.current.map((d) => {
                // if (Math.abs(d.year - year) < 0.5) return { ...d, [type]: Math.round(newVal * 4) / 4, defined: true
                // };
                if (Math.abs(d.year - year) < 0.5) return {
                    ...d,
                    [type]: newVal,
                    defined: true
                };
                return d;
            });

        youDrawIt.current
                 .data([userDataLine.current])
                 .attr('d', line.defined(d => d.defined));


        d3.select('.instructionText').style('display', 'none');

        const definedValues = userDataLine.current.filter(d => d.defined === true);
        if (definedValues.length === userDataLine.current.length) {

            setIsCompleted(()=>true);
            const latestData = userDataLine.current[userDataLine.current.length - 1];
            const text = svg.selectAll('.value-text').data([latestData]);
            const svgOverlay = svg.selectAll('.endPoint').data([latestData]);

            text.exit().remove();
            text.enter().append('text')
                .merge(text)
                .attr('class', 'value-text')
                .attr('text-anchor','middle')
                .attr('x', d => x(d['year'])-10)
                .attr('y', d => y(d[type])-20)
                .text(d => `${d[type].toFixed(2)}`)
                .style('font-weight','bold')
                .style('fill','hwb(17 6% 2%)')
                .style('opacity',0.7);

            svgOverlay.exit().remove();
            svgOverlay.enter()
               .append('circle')
                      .merge(svgOverlay)
               .attr('class', 'endPoint')
               .attr('cx', d => x(d['year']))
               .attr('cy',d => y(d[type]))
               .attr('r', 7)
               .style('fill', 'hwb(17 6% 2%)')
               .style('opacity', 0.7);

        }

    });
    return (
        <div>
            <div id="line-chart">
                <svg ref={svgRef}/>
            </div>
            <div style={{
                marginTop: '5%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    // disabled={!isComplete}
                    disabled={!isCompleted}
                    onClick={handleClick}
                >
                    Show Me the Article
                </Button>
            </div>
        </div>)
};