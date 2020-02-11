import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import bb from 'billboard.js'
import "billboard.js/dist/theme/insight.css"


const styles = theme => ({
  activityGraph: {
  }
})


class ActivityGraph extends React.Component {

  componentDidMount() {
    this._renderChart(this.props.graphEvents)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.graphEvents !== this.props.graphEvents) {
      if (this.props.graphEvents.length !== 0) this._renderChart(this.props.graphEvents)
    }
  }

  _renderChart(graphEvents) {

    const motion = graphEvents ? graphEvents.map(e => ({ zone: e.area, x: new Date(e.ts*1000), y: e.motion })) : []

    Array.from(new Set(motion.map(e => e.zone))).map((z, i) => {
      const zone = z.replace(/ /g,'')
      bb.generate({
        size: {
          height: 85
        },
        data: {
          color: function(color, d) { return '#54AAB3' },
          x: 'x',
          columns: [
            ['x', ...motion.filter(e => e.zone === z).map(e => e.x)],
            ['motion', ...motion.filter(e => e.zone === z).map(e => e.y)]
          ],
          type: 'area-step',
          xFormat: "yyyy-MM-dd'T'HH:mm:ssZ"
        },
        line: {
          "step": {
            "type": "step-after"
          }
        },
        zoom: {
          enabled: {
            type: "drag"
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            show: true,
            tick: {
              format: "%m/%d %H:%M",
              fit: false,
              culling: {
                max: 5
              },
            },
            //extent: [new Date(Date.now() - (86400000)), new Date(Date.now())]
          },
          y: {
            show: false
          }
        },
        legend: {
          show: false
        },
        tooltip: {
          show: true
        },
        bindto: "#" + zone,
      });
    })


  }

  render() {
    const { classes, graphEvents } = this.props

    const motion = graphEvents ? graphEvents.map(e => ({ zone: e.area, x: new Date(e.ts), y: e.motion })) : []

    return (
      <Fragment>
        {motion === [] ? <div style={{display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>No events to show</div> : Array.from(new Set(motion.map(e => e.zone))).map((z, i) =>
          <Paper key={z.replace(/ /g,'')} style={{ padding: '5px', marginBottom: '1%', overflow: 'hidden', width: '100%' }}>
            <div key={z.replace(/ /g,'')}>
              <div style={{ paddingLeft: '10px' }}>{z}</div>
              <div id={z.replace(/ /g,'')}></div>
            </div>
          </Paper>
        )}
      </Fragment>
    )
  }
}


function mapStateToProps(state) {
  const { motionData } = state.app;

  return {
    graphEvents: motionData
  };
}

const mapDispatchToProps = (dispatch) => ({

})

const connectedActivityGraph = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ActivityGraph));
export { connectedActivityGraph as ActivityGraph }; 