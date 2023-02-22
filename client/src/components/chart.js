import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = () => {
  const [completed, setCompleted] = useState(false);
  const svgRef = useRef(null);
  const pymChild = null;

  const data = [
    { year: 1999, deaths: 16849 },
    { year: 2000, deaths: 17415 },
    { year: 2001, deaths: 19394 },
    { year: 2002, deaths: 23518 },
    { year: 2003, deaths: 25785 },
    { year: 2004, deaths: 27424 },
    { year: 2005, deaths: 29813 },
    { year: 2006, deaths: 34425 },
    { year: 2007, deaths: 36010 },
    { year: 2008, deaths: 36450 },
    { year: 2009, deaths: 37004 },
    { year: 2010, deaths: 38329 },
    { year: 2011, deaths: 41340 },
    { year: 2012, deaths: 41502 },
    { year: 2013, deaths: 43982 },
    { year: 2014, deaths: 47055 },
    { year: 2015, deaths: 52404 },
    { year: 2016, deaths: 63632 },
    { year: 2017, deaths: 70237 },
    { year: 2018, deaths: 67367 },
    { year: 2019, deaths: 70630 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const sel = d3.select(svgRef.current.parentNode);
    const winwidth = parseInt(sel.style('width'));
    const winheight = parseInt(sel.style('height'));

    const c = d3.conventions({
      parentSel: sel,
      totalWidth: winwidth,
      height: 250,
      margin: { left: 50, right: 50, top: 5, bottom: 30 },
    });

    c.svg.append('rect').at({ width: c.width, height: c.height, opacity: 0 });

    c.svg
      .append('circle')
      .attr('cx', c.totalWidth - winwidth + 275)
      .attr('cy', c.height * 0.62)
      .attr('r', 5)
      .attr('class', 'intro-dot');

    c.svg
      .append('text')
      .attr('x', c.totalWidth - winwidth + 280)
      .attr('y', c.height * 0.63)
      .text('Start dragging here')
      .attr('class', 'intro-text');

    c.x.domain([1999, 2019]);
    c.y.domain([0, 100000]);

    c.xAxis.ticks(20).tickFormat(d3.format());
    c.yAxis.ticks(10).tickFormat((d) => d3.format(',.3r')(d));

    const area = d3
      .area()
      .x((d) => c.x(d.year))
      .y0((d) => c.y(d.deaths))
      .y1(c.height);

    const line = d3
      .area()
      .x((d) => c.x(d.year))
      .y((d) => c.y(d.deaths))
      .curve(d3.curveCardinal);

      const line1 = d3
      .area()
      .x((d) => c.x(d.year))
      .y((d) => c.y(d.deaths))
      .curve(d3.curveCardinal);
      const drag = d3.drag().on('drag', () => {
        d3.selectAll('.intro-text').style('visibility', 'hidden');
        const pos = d3.mouse(this);
        const year = clamp(2010, 2019, c.x.invert(pos[0]));
        const deaths = clamp(0, c.y.domain()[1], c.y.invert(pos[1]));
  
        yourData.forEach((d) => {
          if (Math.abs(d.year - year) < 0.5) {
            d.deaths = deaths;
            d.defined = true;
          }
        });
  
        yourDataSel.at({ d: line.defined((d) => d.defined)(yourData) });
  
        if (!completed && d3.mean(yourData, (d) => d.defined) === 1) {
          setCompleted(true);
          clipRect.transition().duration(1000).attr('width', c.x(2019));
          pymChild.sendHeight();
        }
  
        // saving user drawn data
        const userData = [];
        yourData.forEach((d) => {
          userData.push({
            year: d.year,
            deaths: d.deaths,
          });
        });
        console.log(userData);
      });
  
      svg.call(drag);
  
      function clamp(a, b, c) {
        return Math.max(a, Math.min(b, c));
      }
    }, []);
  
    return (
      <div>
        <div id="chart-body-5">
          <svg ref={svgRef}></svg>
        </div>
        <div id="answer-5" style={{ visibility: 'hidden' }}></div>
        <div id="explain-5" style={{ visibility: 'hidden', opacity: 0 }}>
          <p>Explanation goes here.</p>
        </div>
        <button
          onClick={() => {
            if (!completed) {
              return;
            }
  
            correctSel
              .append('path.area')
              .attr('d', area(data))
              .style('fill', 'mediumgray');
  
            correctSel
              .append('path.line1')
              .attr('d', line1(data))
              .style('stroke', 'rgb(38, 15, 208)')
              .style('stroke-width', '2px')
              .style('display', 'block');
  
            d3.select('#answer-5')
              .style('visibility', 'visible')
              .html(
                `<div>You guessed <p class='your-pink'>${d3.format(',.3r')(
                  yourData[yourData.length - 1].deaths
                )}</p> for 2016.</div><div>The real value was <p class='your-pink'>${d3.format(
                  ',.3r'
                )(data[6].deaths)}</p>.</div>`
              );
  
            d3.select('#explain-5').style('visibility', 'visible').style('opacity', 1);
          }}
          style={{
            display: 'block',
            margin: '10px auto',
            padding: '10px 20px',
            backgroundColor: 'lightgray',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Show me the Result
        </button>
      </div>
    );
  };

  export default Chart;
