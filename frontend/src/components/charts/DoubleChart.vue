<template>
  <div
    id="chart-container"
    style="width: 100%; height: 280px; margin: auto"
  ></div>
</template>

<script>
var CanvasJS = require('../../assets/canvasjs.min.js');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  name: 'DoubleChart',
  props: {
    chartData: Object,
  },
  data() {
    return {
      chart: null,
      chartOptions: {
        axisY: {
          title: 'Support and Income',
          titleFontColor: '#4F81BC',
          lineColor: '#4F81BC',
          labelFontColor: '#4F81BC',
          tickColor: '#4F81BC',
          prefix: 'GH₵',
        },
        axisY2: {
          title: 'Number of bags harvested',
          titleFontColor: '#9BBB58',
          lineColor: '#9BBB58',
          labelFontColor: '#9BBB58',
          tickColor: '#9BBB58',
        },
        toolTip: {
          shared: true,
        },
        legend: {
          cursor: 'pointer',
        },
        data: [
          {
            type: 'column',
            name: 'Inputs Amount',
            legendText: 'Inputs amount supports',
            showInLegend: true,
            dataPoints: this.chartData.inputInfo,
          },
          {
            type: 'column',
            name: 'Harvest Yield Income',
            legendText: 'Income from harvest',
            showInLegend: true,
            dataPoints: this.chartData.harvestIncome,
          },
          {
            type: 'spline',
            name: 'No. of Harvested bags',
            legendText: 'Harvest yield bags',
            axisYType: 'secondary',
            showInLegend: true,
            dataPoints: this.chartData.harvestedBags,
          },
        ],
      },
    };
  },
  mounted() {
    console.log(this.chartData);
    this.chart = new CanvasJS.Chart('chart-container', this.chartOptions);
    this.chart.render();
  },
};
</script>
