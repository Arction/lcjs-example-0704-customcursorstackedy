(self.webpackChunk=self.webpackChunk||[]).push([[143],{138:(e,t,s)=>{const o=s(809),{lightningChart:a,emptyFill:r,emptyLine:n,AxisTickStrategies:l,AutoCursorModes:i,SolidFill:u,ColorRGBA:c,translatePoint:d,UILayoutBuilders:g,UIElementBuilders:m,UIOrigins:h,synchronizeAxisIntervals:f,Themes:x}=o,{createProgressiveTraceGenerator:S}=s(27),y=["Ch 1","Ch 2","Ch 3"],T=y.length,p=a().Dashboard({numberOfRows:T,numberOfColumns:1}),k=y.map(((e,t)=>{const s=p.createChartXY({columnIndex:0,rowIndex:t,columnSpan:1,rowSpan:1});return s.setAutoCursorMode(i.disabled),0===t?s.setTitle("Stacked Y Dashboard with Custom Cursor"):s.setTitleFillStyle(r),t!==T-1&&s.getDefaultAxisX().setTickStrategy(l.Empty),s.getDefaultAxisY().setThickness(50),s})),E=k[k.length-1].getDefaultAxisX(),C=k.map(((e,t)=>e.addLineSeries({dataPattern:{pattern:"ProgressiveX"}})));C.forEach(((e,t)=>S().setNumberOfPoints(1e5).generate().toPromise().then((t=>{e.add(t)})))),f(...k.map((e=>e.getDefaultAxisX())));const A=p.addUIElement(g.Column,p.engine.scale).setMouseInteractions(!1).setOrigin(h.LeftBottom).setMargin(5).setBackground((e=>e.setFillStyle(p.getTheme().resultTableFillStyle).setStrokeStyle(p.getTheme().resultTableStrokeStyle))),D=m.TextBox.addStyler((e=>e.setTextFillStyle(p.getTheme().resultTableTextFillStyle))),b=A.addElement(g.Row).addElement(D),B=C.map(((e,t)=>A.addElement(g.Row).addElement(D))),I=k[T-1].getDefaultAxisX().addCustomTick(),X=[];k.forEach(((e,t)=>{t!==T-1&&X.push(e.getDefaultAxisX().addConstantLine().setValue(0).setMouseInteractions(!1).setStrokeStyle(e.getTheme().customTickGridStrokeStyle))}));const v=C.map(((e,t)=>k[t].getDefaultAxisY().addCustomTick())),M=e=>{e?(A.restore(),I.restore(),v.forEach((e=>e.restore())),X.forEach((e=>e.restore()))):(A.dispose(),I.dispose(),v.forEach((e=>e.dispose())),X.forEach((e=>e.dispose())))};M(!1),k.forEach(((e,t)=>{const s=e.getDefaultAxisX();e.onSeriesBackgroundMouseMove(((o,a)=>{const r={x:a.clientX,y:a.clientY},n=e.engine.clientLocation2Engine(r.x,r.y),l=C.map((e=>e.solveNearestFromScreen(n)));if(l.includes(void 0))return void M(!1);const i=l[t].location,u=d(i,C[t].scale,p.engine.scale);A.setPosition({x:u.x,y:n.y}),i.x>s.getInterval().end/1.5?A.setOrigin(h.RightBottom):A.setOrigin(h.LeftBottom),b.setText(`X: ${E.formatValue(l[t].location.x)}`),B.forEach(((e,t)=>{e.setText(`Y${t}: ${k[t].getDefaultAxisY().formatValue(l[t].location.y)}`)})),I.setValue(l[t].location.x),X.forEach(((e,t)=>{e.setValue(I.getValue())})),v.forEach(((e,t)=>{e.setValue(l[t].location.y)})),M(!0)})),e.onSeriesBackgroundMouseLeave(((e,t)=>{M(!1)})),e.onSeriesBackgroundMouseDragStart(((e,t)=>{M(!1)}))}))}},e=>{e.O(0,[736],(()=>(138,e(e.s=138)))),e.O()}]);