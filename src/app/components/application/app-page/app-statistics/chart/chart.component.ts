import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType} from "chart.js";
import {EndpointLog} from "../../../../../entity/EndpointLog";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import borderColor = _default.defaults.borderColor;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartData = {
      datasets: [
        {
          data: this.logData
            ?.sort((a, b) => new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime())
            .slice(-50)
            .map(log => [new Date(log.timestamp!).getTime(), log.responseTime]),
          label: 'Response Time',
        } as ChartDataset
      ],

    };
  }

  @Input({required:true}) logData?: EndpointLog[];

  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#d13537', '#b000b5', '#c0ffee']
    }
  ]

  // Chart options
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        // time: {
        //   tooltipFormat: 'dd MMM, yy',
        //   displayFormats: {
        //     quarter: 'MMM YYYY'
        //   }
        // }
      },
    }
  };

// Chart datasets
  public lineChartData: ChartData = {
    datasets: [
      {
        data: this.logData
          ?.sort((a, b) => new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime())
          .slice(-50)
          .map(log => [new Date(log.timestamp!).getTime(), log.responseTime]),
        label: 'Response Time',
        borderColor: 'rgb(120, 120, 120)',
        backgroundColor: 'rgba(200, 0, 0, 1)',
      } as ChartDataset
    ]
  };

  // Chart labels (empty in this case as we use time on x-axis)
  lineChartLabels: string[] = [];

  // Chart legend and chart type
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
}
