(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,s)=>{const o=s(89),{lightningChart:a,emptyFill:r,AxisTickStrategies:l,AutoCursorModes:i,UILayoutBuilders:n,UIElementBuilders:u,UIOrigins:c,synchronizeAxisIntervals:d,Themes:m}=o,{createProgressiveTraceGenerator:h}=s(863),g=["Ch 1","Ch 2","Ch 3"],S=g.length,f=a({resourcesBaseUrl:new URL(document.head.baseURI).origin+new URL(document.head.baseURI).pathname+"resources/"}).Dashboard({theme:m[new URLSearchParams(window.location.search).get("theme")||"darkGold"]||void 0,numberOfRows:S,numberOfColumns:1}),x=g.map(((e,t)=>{const s=f.createChartXY({columnIndex:0,rowIndex:t,columnSpan:1,rowSpan:1});return s.setAutoCursorMode(i.disabled),0===t?s.setTitle("Stacked Y Dashboard with Custom Cursor"):s.setTitleFillStyle(r),t!==S-1&&s.getDefaultAxisX().setTickStrategy(l.Empty),s.getDefaultAxisY().setThickness(50),s})),T=(x[x.length-1].getDefaultAxisX(),x.map(((e,t)=>e.addLineSeries({dataPattern:{pattern:"ProgressiveX"}}))));d(...x.map((e=>e.getDefaultAxisX())));const b=f.addUIElement(n.Column,f.coordsRelative).setMouseInteractions(!1).setOrigin(c.LeftBottom).setMargin(5).setBackground((e=>e.setFillStyle(f.getTheme().cursorResultTableFillStyle).setStrokeStyle(f.getTheme().cursorResultTableStrokeStyle))),k=u.TextBox.addStyler((e=>e.setTextFillStyle(f.getTheme().cursorResultTableTextFillStyle))),p=b.addElement(n.Row).addElement(k),y=T.map(((e,t)=>b.addElement(n.Row).addElement(k))),A=x[S-1].getDefaultAxisX().addCustomTick(u.PointableTextBox).setAllocatesAxisSpace(!1).setGridStrokeStyle(f.getTheme().cursorGridStrokeStyleX),E=[];x.forEach(((e,t)=>{t!==S-1&&E.push(e.getDefaultAxisX().addConstantLine().setValue(0).setMouseInteractions(!1).setStrokeStyle(f.getTheme().cursorGridStrokeStyleX))}));const C=T.map(((e,t)=>x[t].getDefaultAxisY().addCustomTick(u.PointableTextBox).setAllocatesAxisSpace(!1))),V=e=>{e?(b.setVisible(!0),A.setVisible(!0),C.forEach((e=>e.setVisible(!0))),E.forEach((e=>e.setVisible(!0)))):(b.setVisible(!1),A.setVisible(!1),C.forEach((e=>e.setVisible(!1))),E.forEach((e=>e.setVisible(!1))))};V(!1);const w=e=>{const t=T.map((t=>t.solveNearestFromScreen(e)));t.includes(void 0)?V(!1):(b.setPosition(f.translateCoordinate(e,f.coordsRelative)),p.setText(`X: ${x[0].getDefaultAxisX().formatValue(t[0].location.x)}`),y.forEach(((e,s)=>{e.setText(`Y${s}: ${x[s].getDefaultAxisY().formatValue(t[s].location.y)}`)})),A.setValue(t[0].location.x),E.forEach(((e,t)=>{e.setValue(A.getValue())})),C.forEach(((e,s)=>{e.setValue(t[s].location.y)})),V(!0))},R=(e,t)=>{w(t)};x.forEach(((e,t)=>{e.onSeriesBackgroundMouseMove(R),T[t].onMouseMove(R),T[t].onMouseLeave((()=>{V(!1)})),e.onSeriesBackgroundMouseLeave(((e,t)=>{V(!1)})),e.onSeriesBackgroundMouseDragStart(((e,t)=>{V(!1)}))})),Promise.all(T.map((e=>h().setNumberOfPoints(1e5).generate().toPromise().then((t=>{e.add(t)}))))).then((()=>{x.forEach((e=>e.forEachAxis((e=>e.fit(!1))))),requestAnimationFrame((()=>{w({clientX:500,clientY:500})}))}))}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);