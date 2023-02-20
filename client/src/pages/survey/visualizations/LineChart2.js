import React, { Component } from 'react';
import * as d3 from 'd3';



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
  }

  componentDidMount() {
    this.createLineChart();
  }

  createLineChart = () => {
    const {
      data, type, idLine, startYear,
    } = this.props;
    this.userDataLine = this.transformData();
    const userDrawnValue = this.userDataLine.filter(d => d.defined === true);

    const width = 500;
    const height = 500;
    const margin = {
      top: 100,
      right: 150,
      bottom: 50,
      left: 150,
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
    const y = d3.scaleLinear().range([innerHeight, 0]);
    y.domain([0, 80000]);
    
  
    const yFormat = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[type])])
      .range([0, 90000]);

    svg.append('g')
        .attr('class', 'axis-y-line')
        .call(d3.axisLeft(y));
        

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
    y.domain([0, dataYMax]);

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
      .attr('y', y(18849))
      .attr('font-size','20px')
      .text('16849');

    svg.append('text')
      .attr('class', 'text-2016')
      .attr('x', x(2002))
      .attr('y', y(25849))
      .attr('font-size','20px')
      .text('23518');

    svg.append('circle')
      .attr('class', 'bubble-2015')
      .attr('cx', x(2002))
      .attr('cy', y(23518))
      .attr('r', 7)
      .style('fill', '#54EAEA')
      .style('opacity', 0.7);
  
    svg.append('circle')
      .attr('class', 'bubble-2016')
      .attr('cx', x(1999))
      .attr('cy', y(16849))
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
        .tickFormat(d3.format('.4')));
        
    
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



  mouseDragLine = (x, y, dataXMax, line) => d3.drag().on('drag', () => {
    const { type, startYear } = this.props;

    const overlay = d3.select('.overlay').node();
    const mousePos = d3.mouse(overlay);
    const year = this.clampFunc(startYear + 1, dataXMax, x.invert(mousePos[0]));
    const newVal = this.clampFunc(0, y.domain()[1], y.invert(mousePos[1]));

    

    this.userDataLine = this.userDataLine.map((d) => {
      if (Math.abs(d.year - year) < 0.5) return { ...d, [type]: Math.round(newVal * 4) / 4, defined: true };
      return d;
    });
    this.youDrawIt
      .data([this.userDataLine])
      .attr('d', line.defined(d => d.defined));

    
    this.userDataLine.forEach((data) => {
      console.log(`Year: ${data.year}, Y Value: ${data[type]}`);
    });

    this.youDrawIt
    .data([this.userDataLine])
    .attr('d', line.defined(d => d.defined));

    const svg = d3.select('svg');

    const latestData = this.userDataLine[this.userDataLine.length - 1];
    const text = svg.selectAll('.value-text').data([latestData]);

    text.exit().remove();

    text.enter().append('text')
      .merge(text)
      .attr('class', 'value-text')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d[type]))
      .text(d => `${d[type]}`);
  

    
    if (this.clipAnimation) {
      this.userDataLine = this.userDataLine.filter(d => d.year <= year);
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

  


  render() {
    return (
      <div id="line-chart">
        <svg ref={this.svgReal} />
         
      </div>
    );
  }
}
export default LineChart;
