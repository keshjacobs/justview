app.config(['ChartJsProvider', function (ChartJsProvider) {
    ChartJsProvider.setOptions({
      chartColors: ['#FFA500', '#FFA500'],
      responsive: false
    });
    
    ChartJsProvider.setOptions('line', {
      showLines: true
    });
  }])