import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType} from "chart.js";
import {EndpointLog} from "../../../../../entity/EndpointLog";

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
          data: this.logData?.map(log => [new Date(log.timestamp!).getTime(), log.responseTime]),
          label: 'Response Time',
          borderColor: 'rgba(94, 53, 177, 1)',
        } as ChartDataset
      ],
    };
  }

  @Input({required:true}) logData?: EndpointLog[];

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
      }
    }
  };

  public chartColors: any[] = [
    {
      backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }];

  // Chart datasets
  public lineChartData: ChartData = {
    datasets: [
      {
        data: this.logData?.map(log => [new Date(log.timestamp!).getTime(), log.responseTime]),
        label: 'Response Time',
      } as ChartDataset
    ],
  };

  // Chart labels (empty in this case as we use time on x-axis)
  lineChartLabels: string[] = [];

  // Chart legend and chart type
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
}
