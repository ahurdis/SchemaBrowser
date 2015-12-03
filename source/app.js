
define(["source/canvas/CanvasManager", "source/graph/GraphFactory", "source/graph/GraphSerializer"],
function (CanvasManager, GraphFactory, GraphSerializer) {
	
	return function App(canvas, graph) {
		try {
			
            var self = this;

			self.graphFactory = new GraphFactory();
	
			self.graphFactory.CreateSimpleGraph();
	
			self.canvasManager = new CanvasManager(document.getElementById("canvasId"),
												self.graphFactory.GetGraph());
	
			self.graphSerializer = new GraphSerializer();
		
			self.SaveGraph = function() {
                try {
                    self.graphSerializer.saveGraph(self.canvasManager.GetGraph());
                }
                catch (e) {
                    alert("index.html: saveGraph " + e.name + " " + e.message);
                }
            };

            self.LoadGraph = function() {
                try {
                    self.canvasManager.SetGraph(self.graphSerializer.loadGraph());
                }
                catch (e) {
                    alert("index.html: loadGraph " + e.name + " " + e.message);
                }
            };
            
            self.SetMouseHandler = function(mouseHandler) {
                self.canvasManager.SetMouseHandler(mouseHandler);
            }
		}
		catch (e) {
			alert('index.html ' + e.name + " " + e.message);
		}

	}
});
