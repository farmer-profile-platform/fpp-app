<template>
  <div id="chart-container" style="height: 250px;"></div>
</template>

<script>
var CanvasJS = require('../../assets/canvasjs.min.js');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  name: 'DoughnutChart',
  props: {
    chartData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      chart: null,
      chartOptions: {
        exportFileName: 'Input Types Chart',
        exportEnabled: true,
        animationEnabled: true,
        legend: {
          cursor: 'pointer',
          itemclick: 'explodePie',
        },
        data: [
          {
            type: 'doughnut',
            showInLegend: true,
            innerRadius: 50,
            indexLabel: '{name} - #percent%',
            toolTipContent: '<b>{name}:</b> GH₵{y} (#percent%)',
            dataPoints: this.chartData,
          },
        ],
      },
    };
  },
  mounted() {
    this.chart = new CanvasJS.Chart('chart-container', this.chartOptions);
    this.chart.render();
  },
};
</script>
