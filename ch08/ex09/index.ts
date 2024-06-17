class Resource {
    ...
    /** リソース解放のため利用終了時に呼び出すこと */
    close() { ... }
  }
  
  const resource = new Resource(...);
  resource.doA();
  resource.doB();
  resource.close(); // これを忘れるとリソースがリークする
  