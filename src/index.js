/*
 * LightningChartJS example that showcases custom cursor implementation with stacked Y charts.
 */
// Import LightningChartJS
const lcjs = require("@arction/lcjs");

// Extract required parts from LightningChartJS.
const {
   lightningChart,
   emptyFill,
   emptyLine,
   AxisTickStrategies,
   AutoCursorModes,
   SolidFill,
   ColorRGBA,
   translatePoint,
   UILayoutBuilders,
   UIElementBuilders,
   UIOrigins,
   synchronizeAxisIntervals,
   Themes,
} = lcjs;

// Import data-generator from 'xydata'-library.
const {
   createProgressiveTraceGenerator
} = require("@arction/xydata");

const channels = ["Ch 1", "Ch 2", "Ch 3"];
const channelCount = channels.length;

// Create Dashboard.
const dashboard = lightningChart().Dashboard({
   // theme: Themes.darkGold
   numberOfRows: channelCount,
   numberOfColumns: 1,
});

// Map XY-charts to Dashboard for each channel.
const charts = channels.map((channelName, i) => {
   const chart = dashboard.createChartXY({
      columnIndex: 0,
      rowIndex: i,
      columnSpan: 1,
      rowSpan: 1,
   });

   // Disable default auto cursor.
   chart.setAutoCursorMode(AutoCursorModes.disabled);

   if (i === 0) {
      chart.setTitle("Stacked Y Dashboard with Custom Cursor");
   } else {
      chart.setTitleFillStyle(emptyFill);
   }

   // Only display X ticks for bottom chart.
   if (i !== channelCount - 1) {
      chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.Empty);
   }

   // Align Y axes of stacked charts.
   chart.getDefaultAxisY().setThickness(50)

   return chart;
});

// The bottom X Axis, which shows ticks for all stacked charts.
const axisX = charts[charts.length - 1].getDefaultAxisX();

// Add progressive line series to each chart.
const seriesList = charts.map((chart, i) =>
   chart.addLineSeries({
      dataPattern: {
          // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
          pattern: 'ProgressiveX'
      }
    })
);

// Generate and push data to each line series.
seriesList.forEach((series, i) =>
   createProgressiveTraceGenerator()
   .setNumberOfPoints(100 * 1000)
   .generate()
   .toPromise()
   .then((data) => {
      series.add(data);
   })
);

// Code for synchronizing all X Axis intervals in stacked XY charts.
const syncedAxes = charts.map(chart => chart.getDefaultAxisX())
synchronizeAxisIntervals(...syncedAxes)

// Create UI elements for custom cursor.
const resultTable = dashboard
   .addUIElement(
      UILayoutBuilders.Column,
      dashboard.engine.scale
   )
   .setMouseInteractions(false)
   .setOrigin(UIOrigins.LeftBottom)
   .setMargin(5)
   .setBackground((background) => background
      // Style same as Theme result table.
      .setFillStyle(dashboard.getTheme().resultTableFillStyle)
      .setStrokeStyle(dashboard.getTheme().resultTableStrokeStyle)
   );

const resultTableTextBuilder = UIElementBuilders.TextBox
   // Style same as Theme result table text.
   .addStyler(textBox => textBox
      .setTextFillStyle(dashboard.getTheme().resultTableTextFillStyle)
   )

const rowX = resultTable
   .addElement(UILayoutBuilders.Row)
   .addElement(resultTableTextBuilder)

const rowsY = seriesList.map((el, i) => {
   return resultTable
      .addElement(UILayoutBuilders.Row)
      .addElement(resultTableTextBuilder)
});

const tickX = charts[channelCount - 1]
   .getDefaultAxisX()
   .addCustomTick()
   .setAllocatesAxisSpace(false)

const ticksX = [];
charts.forEach((chart, i) => {
   if (i !== channelCount - 1) {
      ticksX.push(
         chart
         .getDefaultAxisX()
         .addConstantLine()
         .setValue(0)
         .setMouseInteractions(false)
         // Style according to Theme custom tick grid stroke.
         .setStrokeStyle(chart.getTheme().customTickGridStrokeStyle)
      );
   }
});

const ticksY = seriesList.map((el, i) => {
   return charts[i]
      .getDefaultAxisY()
      .addCustomTick()
      .setAllocatesAxisSpace(false)
});

const setCustomCursorVisible = (visible) => {
   if (!visible) {
      resultTable.dispose();
      tickX.dispose();
      ticksY.forEach((el) => el.dispose());
      ticksX.forEach((el) => el.dispose());
   } else {
      resultTable.restore();
      tickX.restore();
      ticksY.forEach((el) => el.restore());
      ticksX.forEach((el) => el.restore());
   }
}
// Hide custom cursor components initially.
setCustomCursorVisible(false)


// Implement custom cursor logic with events.
charts.forEach((chart, i) => {
   
   const AxisX =  chart.getDefaultAxisX()

   chart.onSeriesBackgroundMouseMove((_, event) => {
      // mouse location in web page
      const mouseLocationClient = {
         x: event.clientX,
         y: event.clientY,
      };
      // Translate mouse location to LCJS coordinate system for solving data points from series, and translating to Axes.
      const mouseLocationEngine = chart.engine.clientLocation2Engine(
         mouseLocationClient.x,
         mouseLocationClient.y
      );

      // Find the nearest data point to the mouse.
      const nearestDataPoints = seriesList.map((el) =>
         el.solveNearestFromScreen(mouseLocationEngine)
      );

      // Abort operation if any of solved data points is `undefined`.
      if (nearestDataPoints.includes(undefined)) {
         setCustomCursorVisible(false)
         return
      }

      // location of nearest point of current chart
      const nearestPointLocation =  nearestDataPoints[i].location

      // Translate mouse location to dashboard scale.
      const mouseLocationAxis = translatePoint(
         nearestPointLocation,
         // Source coordinate system.
         seriesList[i].scale,
         // Target coordinate system.
         dashboard.engine.scale
      );

      // Set custom cursor location. 
      resultTable.setPosition({
         x: mouseLocationAxis.x,
         y: mouseLocationEngine.y,
       });


      // Change origin of result table based on cursor location.
      if ( nearestPointLocation.x > AxisX.getInterval().end / 1.5 ) {
            resultTable.setOrigin(UIOrigins.RightBottom);
      } else {
         resultTable.setOrigin(UIOrigins.LeftBottom);
      }

      // Format result table text.
      rowX.setText(`X: ${axisX.formatValue(nearestDataPoints[i].location.x)}`);
      rowsY.forEach((rowY, i) => {
         rowY.setText(
            `Y${i}: ${charts[i]
            .getDefaultAxisY()
            .formatValue(nearestDataPoints[i].location.y)}`
         );
      });

      // Position custom ticks.
      tickX.setValue(nearestDataPoints[i].location.x);
      ticksX.forEach((tick, i) => {
         tick.setValue(tickX.getValue());
      });
      ticksY.forEach((tick, i) => {
         tick.setValue(nearestDataPoints[i].location.y);
      });

      // Display cursor.
      setCustomCursorVisible(true)
   });

   // hide custom cursor and ticks if mouse leaves chart area
   chart.onSeriesBackgroundMouseLeave((_, e) => {
      setCustomCursorVisible(false)
   });

   // hide custom cursor and ticks on Drag
   chart.onSeriesBackgroundMouseDragStart((_, e) => {
      setCustomCursorVisible(false)
   });
});