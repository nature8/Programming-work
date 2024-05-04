import java.util.*;
class Edge{
  int src;
  int dest;
  Edge(int src, int dest){
    this.src = src;
    this.dest = dest;
  }
}

class DirectedGraph{
  public static void createGraph(ArrayList<Edge> graph[]){
    for(int i=0; i<graph.length; i++){
      graph[i] = new ArrayList<Edge>();
    }
    graph[0].add(new Edge(0,2));

    graph[1].add(new Edge(1,0));

    graph[2].add(new Edge(2,3));

    graph[3].add(new Edge(3,0));
    
  }

  public static boolean isCyclicGraph(ArrayList<Edge> graph[], boolean vis[], int curr, boolean rec[]){
    vis[curr]=true;
    rec[curr]=true;
    for(int i=0; i<graph[curr].size(); i++){
      Edge e = graph[curr].get(i);
      if(rec[e.dest]){
        return true;
      }
      else if(!vis[e.dest]){
        if(isCyclicGraph(graph, vis, e.dest, rec))
          return true;
      }
    }
    rec[curr] = false;
    return false;
  }
  public static void dfs(ArrayList<Edge> graph[], int curr, boolean vis[]){
    System.out.print(curr+" ");
    vis[curr]=true;
    for(int i=0; i<graph[curr].size(); i++){ // to visit neighbour
      Edge e = graph[curr].get(i);
      if(vis[e.dest]==false)
        dfs(graph, e.dest, vis);
    }
  }
  public static void main(String...ar){
    int V = 4;
    ArrayList<Edge> graph[] = new ArrayList[V];
    createGraph(graph);
    boolean vis[] = new boolean[V];
    boolean rec[] = new boolean[V];
    for(int i=0; i<V; i++){
      if(!vis[i]){
        boolean isCycle = isCyclicGraph(graph, vis, 0, rec);
        if(isCycle){
          System.out.print(isCycle);
          break;
        }
      }
    }
    //System.out.println(isCyclicGraph(graph, new boolean[V], 0, new boolean[V]));
  }
}