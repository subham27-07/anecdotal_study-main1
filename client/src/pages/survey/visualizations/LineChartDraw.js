import React, { Component } from 'react';
import * as d3 from 'd3';
import {Button } from "@mui/material";



const marginConvention = (selection, props) => {
  const {
    width, height, margin, className = 'margin-group',
  } = props;
  let svg = selection.attr('class', className)
    .data([null])
    .attr('width', width)
    .attr('height', height);
  svg = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  return { svg, innerWidth, innerHeight };
};


class LineChart extends Component {
  constructor(props) {
    super(props);
    this.svgReal = React.createRef();
    this.userDataLine = [];
    this.youDrawIt = null;
    this.clipElement = null;
    this.svg=null;
    this.clipAnimation = false;
    this.state = {
        // showText: false,
        userDataLine:[],
        isComplete: false
      };
  }

  componentDidMount() {
    this.createLineChart();
  }

  createLineChart = () => {
    const {
      data, type, idLine, startYear,
    } = this.props;
    const availableYears = data.map((d)=>d.year)
    this.userDataLine = this.transformData();
    this.setState({userDataLine:this.userDataLine})
    const userDrawnValue = this.userDataLine.filter(d => d.defined === true);

    const width = 1000;
    const height = 325;
    const margin = {
      top: 50,
      right: 50,
      bottom: 30,
      left: 50,
    };
    const svgContainer = d3.select(this.svgReal.current);
   
    const containerDiv = document.getElementById('line-chart');

    const { svg, innerWidth, innerHeight } = marginConvention(svgContainer, {
      width: containerDiv.offsetWidth,
   
      height,
      margin,
      className: 'lineChart',
    });
    this.svg=svg;

    const x = d3.scaleLinear().range([0, innerWidth]);
    this.setState({ x });
    const y = d3.scaleLinear().range([innerHeight, 0]);
    
    // 
    if (this.props.scaleType==="percentage"){

      y.domain([0, 10]);
    
  
    // const yFormat = d3.scaleLinear()
    //   .domain([0, 10])
    //   .range([0, 10]);

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

    // const dataYMax = d3.max(data, d => d[type]);
    // const dataYMin = d3.min(data, d => d[type]);

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

    this.clipElement = svg.append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', x(startYear))
      .attr('height', innerHeight + 20)
      .attr('transform', 'translate(0, -20)');

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

    // USER LINE
    this.youDrawIt = svg.append('path').attr('class', 'your-line');

    const firstDate = data[0]
    const fourthDate = data[3]

    let instructionText = svg.append('text')
      .attr('x',innerWidth/2)
      .attr('y',innerHeight/2)
      .attr('text-anchor',"middle")
      .attr('font-size','18px')
      .attr('class','instructionText')
      .style('fill','rgb(133, 3, 18)')
      .style('pointer-events','none')
      .text('Draw the line for the missing years.')

    

    svg.append('text')
      .attr('class', 'text-2015')
      .attr('x', x(firstDate.year))
      .attr('y', y(firstDate.value)-10)
      .attr('font-size','15px')
      .text(firstDate.value);

    svg.append('text')
      .attr('class', 'text-2016')
      .attr('x', x(fourthDate.year))
      .attr('y', y(fourthDate.value)-10)
      .attr('font-size','15px')
      .text(fourthDate.value);

    svg.append('circle')
      .attr('class', 'bubble-2015')
      .attr('cx', x(firstDate.year))
      .attr('cy', y(firstDate.value))
      .attr('r', 7)
      .style('fill', '#54EAEA')
      .style('opacity', 0.7);
  
    svg.append('circle')
      .attr('class', 'bubble-2016')
      .attr('cx', x(fourthDate.year))
      .attr('cy', y(fourthDate.value))
      .attr('r', 7)
      .style('fill', '#54EAEA')
      .style('opacity', 0.7); 
    

    // const availableYears = [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015, 2016, 2017, 2018, 2019];

    // const format = d3.format('.2f');

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
      .call(this.mouseDragLine(x, y, dataXMax, valueline,svg));
  };

  renderAnimation = () => {
    if (d3.mean(this.userDataLine, d => d.defined) === 1) {
      const { data, type, startYear } = this.props;
  
      const dataXMax = d3.max(data, d => d.year);
      this.clipElement.transition().duration(1000).attr('width', this.state.x(dataXMax));
    }
  };



  mouseDragLine = (x, y, dataXMax, line, svg) => d3.drag().on('drag', () => {
    const { type, startYear } = this.props;

    const overlay = d3.select('.overlay').node();
    const mousePos = d3.mouse(overlay);
    const year = this.clampFunc(startYear + 1, dataXMax, x.invert(mousePos[0]));
    const newVal = this.clampFunc(0, y.domain()[1], y.invert(mousePos[1]));

    this.userDataLine = this.userDataLine.map((d) => {
      // if (Math.abs(d.year - year) < 0.5) return { ...d, [type]: Math.round(newVal * 4) / 4, defined: true };
      if (Math.abs(d.year - year) < 0.5) return { ...d, [type]: newVal, defined: true };
      return d;
    });
    
    this.setState({ userDataLine : this.userDataLine});

    this.youDrawIt
      .data([this.userDataLine])
      .attr('d', line.defined(d => d.defined));

    // this.userDataLine.forEach((data) => {
    //   // console.log(`Year: ${data.year}, Y Value: ${data[type]}`);
    // });

    d3.select('.instructionText').style('display','none');

    const definedValues = this.userDataLine.filter(d => d.defined === true);
    if (definedValues.length === this.userDataLine.length) {
      // const svg = this.svg;

      const latestData = this.userDataLine[this.userDataLine.length - 1];
      console.log(typeof latestData)
      const text = svg.selectAll('.value-text').data([latestData]);

      text.exit().remove();

      text.enter().append('text')
        .merge(text)
        .attr('class', 'value-text')
        .attr('text-anchor','middle')
        .attr('x', d => x(d.year))
        .attr('y', d => y(d[type])-10)
        .text(d => `${d[type].toFixed(2)}`);
    }

  });

  clampFunc = (a, b, c) => Math.max(a, Math.min(b, c));

  transformData = () => {
    const { data, startYear } = this.props;
    return data
      .map((d) => {
        if (d.year === startYear) {
          return { ...d, defined: true };
        }
        return { ...d, defined: 0 };
      })
      .filter(d => d.year >= startYear);
  }

  handleClick = () => {
    const definedValues = this.userDataLine.filter(d => d.defined === true);
    if (definedValues.length === this.userDataLine.length) {
    
      // milad uncomment
      this.renderAnimation();
      // this.props.showText()
      this.props.showText();

    }
    // console.log(this.userDataLine)
  };



  render() {
    // const { showText } = this.state;
    const definedValues = this.userDataLine.filter(d => d.defined === true);
    const isComplete = definedValues.length === this.userDataLine.length;
    return (
      <div>
        <div id="line-chart">
          <svg ref={this.svgReal} />
        </div>
        {/* { !isComplete && (
          <Typography 
          // variant="subtitle1"
          // gutterBottom
          style={{ marginTop: '-100px', marginLeft: "200px",color: "#7f0000" }}
          >
            Draw the line for missing year on this chart.
          </Typography>
        ) } */}
        <div style={{marginTop:'5%',display:'flex',justifyContent: 'center', alignItems: 'center'}}>
          <Button
            variant="contained"
            color="primary"
            // disabled={!isComplete}
            disabled={!isComplete }
            onClick={this.handleClick}
            
            
          >
            Show me how I did.
          </Button>
        </div>
        {/* { showText && (
          // <Typography variant="subtitle1"
          // gutterBottom
          // style={{ marginTop: '30px' }}>
          <Typography variant="body1" gutterBottom className={`${styles.textBody} ${styles.paragraph} ${styles.txtNormal}`} style={{ marginTop: '30px' }}>
            Since 2002, the <strong> number </strong> of Americans who have died every year from Drug Overdose has increased by more than <strong>222.16 percent</strong>.  In 2015, more Americans died from drug
            overdoses than from car accidents
            and gun homicides combined. It’s the worst drug overdose epidemic in American history, spurred
            by rising drug abuse,
            increased availability of prescription opioids and an influx of Data Sharing potent
            synthetics like Fentanyl and Carfentanil.
            Drug overdoses are now the leading cause of death for Americans under 50.
          </Typography>
        ) } */}
      </div>
    );
  }
}
export default LineChart;
