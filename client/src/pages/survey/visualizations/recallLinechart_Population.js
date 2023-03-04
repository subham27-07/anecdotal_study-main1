import React, { Component } from 'react';
import * as d3 from 'd3';
import { Divider, Typography, Container, Button } from "@mui/material";
import styles from "../articles.module.css";




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
    this.clipAnimation = false;
    this.state = {
        showText: false,
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
    this.userDataLine = this.transformData();
    this.setState({userDataLine:this.userDataLine})
    const userDrawnValue = this.userDataLine.filter(d => d.defined === true);

    const width = 1000;
    const height = 325;
    const margin = {
      top: 50,
      right: 30,
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

   
    const x = d3.scaleLinear().range([0, innerWidth]);
    this.setState({ x });
    const y = d3.scaleLinear().range([innerHeight, 0]);
    y.domain([0, 10]);
    
  
    const yFormat = d3.scaleLinear()
      .domain([0, 10])
      .range([0, 10]);

    svg.append('g')
      .attr('class', 'axis-y-line')
      .call(d3.axisLeft(y)
        .tickFormat(d => `${yFormat(d)}%`));

    const valueline = d3.line()
      .x(d => x(d.year))
      .y(d => y(d[type]))
      .curve(d3.curveCardinal);


    const valueArea = d3.area()
      .x(d => x(d.year))
      .y0(d => y(d[type]))
      .y1(innerHeight);

    const dataYMax = d3.max(data, d => d[type]);
    const dataYMin = d3.min(data, d => d[type]);

    const dataXMax = d3.max(data, d => d.year);

    x.domain(d3.extent(data, d => d.year));
    y.domain([0, 10]);

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

    svg.append('text')
      .attr('class', 'text-2015')
      .attr('x', x(1999))
      .attr('y', y(3.00))
      .attr('font-size','15px')
      .text('2.75');

    svg.append('text')
      .attr('class', 'text-2016')
      .attr('x', x(2002))
      .attr('y', y(3.25))
      .attr('font-size','15px')
      .text('3.25');

    svg.append('circle')
      .attr('class', 'bubble-2015')
      .attr('cx', x(2002))
      .attr('cy', y(2.75))
      .attr('r', 7)
      .style('fill', '#54EAEA')
      .style('opacity', 0.7);
  
    svg.append('circle')
      .attr('class', 'bubble-2016')
      .attr('cx', x(1999))
      .attr('cy', y(2.5))
      .attr('r', 7)
      .style('fill', '#54EAEA')
      .style('opacity', 0.7); 
    

    const availableYears = [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015, 2016, 2017, 2018, 2019];

    // Add the X Axis
    svg.append('g')
      .attr('class', 'axis-x-line')
      .attr('transform', `translate(0,${innerHeight})`)
      
      .call(d3.axisBottom(x)
        .tickValues(availableYears)
        // .tickFormat(d3.format('.4')));
        .tickFormat(d => (d % 100 < 10 ? `0${d % 100}` : `${d % 100}`)));
        
    // 
    // // Rotate x-axis labels
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
      .call(this.mouseDragLine(x, y, dataXMax, valueline));
  };
  renderAnimation = () => {
    if (d3.mean(this.userDataLine, d => d.defined) === 1) {
      const { data, type, startYear } = this.props;
  
      const dataXMax = d3.max(data, d => d.year);
      this.clipElement.transition().duration(1000).attr('width', this.state.x(dataXMax));
    }
  };



  mouseDragLine = (x, y, dataXMax, line) => d3.drag().on('drag', () => {
    const { type, startYear } = this.props;

    const overlay = d3.select('.overlay').node();
    const mousePos = d3.mouse(overlay);
    const year = this.clampFunc(startYear + 1, dataXMax, x.invert(mousePos[0]));
    const newVal = this.clampFunc(0, y.domain()[1], y.invert(mousePos[1]));

    

    this.userDataLine = this.userDataLine.map((d) => {
      // if (Math.abs(d.year - year) < 0.5) return { ...d, [type]: Math.round(newVal * 4) / 4, defined: true };
      if (Math.abs(d.year - year) < 0.5) return { ...d, [type]: Math.floor(newVal), defined: true };
      return d;
    });

    this.setState({ userDataLine : this.userDataLine});

    this.youDrawIt
      .data([this.userDataLine])
      .attr('d', line.defined(d => d.defined));

    
    this.userDataLine.forEach((data) => {
      console.log(`Year: ${data.year}, Y Value: ${data[type]}`);
    });

    const definedValues = this.userDataLine.filter(d => d.defined === true);
    if (definedValues.length === this.userDataLine.length) {
      const svg = d3.select('svg');

      const latestData = this.userDataLine[this.userDataLine.length - 1];
      const text = svg.selectAll('.value-text').data([latestData]);

      text.exit().remove();

      text.enter().append('text')
        .merge(text)
        .attr('class', 'value-text')
        .attr('x', d => x(d.year)+ 60)
        .attr('y', d => y(d[type]))
        .text(d => `${d[type]}`);
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
      this.setState({ showText: true });
      this.renderAnimation();
      this.props.stateHandler();
    }
    console.log(this.userDataLine)
  };
  


  render() {
    const { showText } = this.state;
    const definedValues = this.userDataLine.filter(d => d.defined === true);
    const isComplete = definedValues.length === this.userDataLine.length;
    return (
      <div>
        <div id="line-chart">
          <svg ref={this.svgReal} />
        </div>
        { !isComplete && (
          <Typography 
          // variant="subtitle1"
          // gutterBottom
          style={{ marginTop: '-100px', marginLeft: "170px",color: "#7f0000" }}
          >
            Please recreate the trend 
about death from drug use disorders as accurately as possible
          </Typography>
        ) }
        <div style={{marginTop: '20px'}}>
          <Button
            variant="contained"
            color="primary"
            // disabled={!isComplete}
            disabled={!isComplete || showText}
            onClick={this.handleClick}
            style={{marginTop: '80px',marginLeft: '140px', marginRight: '20px'}}
            
          >
            Show me how I did.
          </Button>
        </div>
        { showText && (
          <Typography variant="body1" gutterBottom className={`${styles.textBody} ${styles.paragraph} ${styles.txtNormal}`}>
          Since 2002, <span style={{ fontWeight: "bold" }}> percentage </span> of American population with drug use disorders
          has increased by more than <span style={{ fontWeight: "bold" }}> 137 percent </span> The United States is currently in the
               grips of a powerful drug epidemic,
               with the share of population with drug use disorders steadily climbing every year. A drug use disorder
               is a mental disorder that affects a person’s brain and behavior, leading to a person’s
               inability to control their use of drugs including legal or illegal drugs. Drug use disorders occur when
               an individual
               compulsively misuses drugs or alcohol and continues abusing the substance despite knowing the negative
               impact it has on their life.
         </Typography>
        ) }
      </div>
      );
  }
}
export default LineChart;


// { this.state.showText && (
//   <p className={`${styles.textBody} ${styles.paragraph} ${styles.txtNormal}`}>...has increased by more than <span style={{ fontWeight: "bold" }}>137 percent</span>.  The United States is currently in the grips of a powerful drug epidemic,
//   with the share of population with drug use disorders steadily climbing every year. A drug use disorder is a mental disorder that affects a person’s brain and behavior, leading to a person’s 
//   inability to control their use of drugs including legal or illegal drugs. Drug use disorders occur when an individual 
//   compulsively misuses drugs or alcohol and continues abusing the substance despite knowing the negative impact it has on their life.
  
//   </p>
// ) }