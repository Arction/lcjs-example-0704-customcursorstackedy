# JavaScript Custom Cursor with Stacked Y Dashboard

![JavaScript Custom Cursor with Stacked Y Dashboard](customCursorStackedY.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

- Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
- Open the project folder in a terminal:

        npm install              # fetches dependencies
        npm start                # builds an application and starts the development server

- The application is available at *http://localhost:8080* in your browser, webpack-dev-server provides hot reload functionality.


## Description

This example serves as an example for custom data cursor implementation in _stacked Y charts dashboard_, where there are several XY charts stacked vertically on each other.

Custom cursors can be required for different purposes - like major structural changes or very application specific styling requirements.

If lesser changes to default cursors are required then please see read about different methods of configuring cursor behavior - `ChartXY` API reference has good links and explanations to follow.

In this case, the X Axis of each chart are _synchronized_, and when user mouse is above the chart the data of all series `Y` coordinates is shown at the respective `X` coordinate.

Each `LineSeries` contains 100 000 unique data points, coming to a total of **300 000** data points. Regardless, the interaction with cursor is instantaneous.

Custom cursors are most importantly based on `LCJS` methods that allow solving nearest data points in series from any supplied location.
Custom user interactions and data point solving require solid understanding of different coordinate systems in web and `LCJS`, which is the primary reason this example exists;

```javascript
// Add custom action when user moves mouse over series area.
chart.onSeriesBackgroundMouseMove((_, event) => {
  // `event` is a native JavaScript event, which packs the active mouse location in `clientX` and `clientY` properties.
  const mouseLocationClient = { x: event.clientX, y: event.clientY };

  // Before using client coordinates with LCJS, the coordinates have to be translated relative to the LCJS engine.
  const mouseLocationEngine = chart.engine.clientLocation2Engine(
    mouseLocationClient.x,
    mouseLocationClient.y
  );

  // Now that the coordinates are in the correct coordinate system, they can be used
  // to solve data points, or further translated to any Axis.

  // (1) Translate mouse location an Axis.
  const mouseLocationAxis = translatePoint(
    mouseLocationEngine,
    // Source coordinate system.
    chart.engine.scale,
    // Target coordinate system.
    series[0].scale
  );

  // (2) Solve nearest data point from a series to the mouse.
  const nearestDataPoint = series.solveNearestFromScreen(mouseLocationEngine);
  // `nearestDataPoint` is either `undefined`, or an object 
  // which contains a collection of information about the solved data point.
});
```

The default cursor can only display data from one chart at a time, but using the `LCJS` methods, the cursor can be configured to display data from all independent charts at the same time.

More custom cursor examples can be found by looking for "cursor" tag in the _Interactive Examples_ gallery.


## API Links

* [Lightning Chart top reference]
* [Dashboard]
* [Coordinate system translation method]
* [Auto cursor modes]
* [UI element builders]
* [UI layout builders]
* [UI backgrounds]
* [UI position origin]
* [Color factory css]
* [Solid fill style]
* [Solid line style]
* [Chart XY]
* [Axis XY]
* [Custom tick]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [Arction][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact support@arction.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@arction.com.

[0]: https://github.com/Arction/
[1]: https://www.arction.com/lightningchart-js-api-documentation/
[2]: https://www.arction.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://www.arction.com/support-services/

© Arction Ltd 2009-2020. All rights reserved.


[Lightning Chart top reference]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/interfaces/lightningchart.html
[Dashboard]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/classes/dashboard.html
[Coordinate system translation method]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/globals.html#translatepoint
[Auto cursor modes]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/enums/autocursormodes.html
[UI element builders]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/globals.html#uielementbuilders
[UI layout builders]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/globals.html#uilayoutbuilders
[UI backgrounds]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/globals.html#uibackgrounds
[UI position origin]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/globals.html#uiorigins
[Color factory css]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/globals.html#colorcss
[Solid fill style]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/classes/solidfill.html
[Solid line style]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/classes/solidline.html
[Chart XY]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/classes/chartxy.html
[Axis XY]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/classes/axis.html
[Custom tick]: https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/classes/customtick.html

