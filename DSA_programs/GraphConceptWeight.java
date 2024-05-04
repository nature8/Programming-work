import java.util.ArrayList;
class Edge{
  int src;
  int dest;
  int wt;
  Edge(int src, int dest, int wt){
    this.src = src;
    this.dest = dest;
    this.wt = wt;
  }
}

class GraphConceptWeight{
  public static void createGraph(ArrayList<Edge> graph[]){
    for(int i=0; i<graph.length; i++){
    graph[i] = new ArrayList<Edge>();
    }
    graph[0].add(new Edge(0,1,2));
    graph[1].add(new Edge(1,2,10));
    graph[1].add(new Edge(1,3,0));
    graph[2].add(new Edge(2,0,2));
    graph[2].add(new Edge(2,1,10));
    graph[2].add(new Edge(2,3,-1));
  }
  public static void main(String...ar){
    int V = 4;
    ArrayList<Edge> graph[] = new ArrayList[V]; 
    createGraph(graph);
    for(int i=0; i<graph[2].size(); i++){
      Edge e = graph[2].get(i);
      System.out.println(e.dest+" , "+e.wt);
    }  
  }
}